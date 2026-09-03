import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteSchema } from "../../schema/noteshema";
import { addNote, updateNote } from "../../api/notesAPI";

const Modal = ({ isOpen, onClose, noteToEdit = null }) => {
  const queryClient = useQueryClient();
  const isUpdate = Boolean(noteToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Sync form values when modal opens or noteToEdit changes
  useEffect(() => {
    if (noteToEdit) {
      reset({
        title: noteToEdit.title || "",
        content: noteToEdit.content || "",
      });
    } else {
      reset({
        title: "",
        content: "",
      });
    }
  }, [noteToEdit, isOpen, reset]);

  const addMutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userNotes"] });
      reset();
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userNotes"] });
      reset();
      onClose();
    },
  });

  const isPending = addMutation.isPending || updateMutation.isPending;
  const currentError = addMutation.error || updateMutation.error;

  const onSubmit = (formData) => {
    if (isUpdate) {
      updateMutation.mutate({
        id: noteToEdit._id,
        title: formData.title,
        content: formData.content,
      });
    } else {
      addMutation.mutate(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal bg-white w-full max-w-md p-6 rounded-2xl shadow-xl"
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isUpdate ? "Update Note" : "Add Note"}
          </h1>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <IoMdClose size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter note title"
                className="w-full outline-none border border-gray-300 focus:border-blue-500 rounded px-3 py-2"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="content" className="text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                rows={4}
                placeholder="Enter note content"
                className="w-full outline-none border border-gray-300 focus:border-blue-500 rounded px-3 py-2 resize-none"
                {...register("content")}
              />
              {errors.content && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Error from backend */}
            {currentError && (
              <p className="text-red-500 text-sm font-bold">
                {currentError.response?.data?.msg ||
                  currentError.response?.data?.message ||
                  "Something went wrong"}
              </p>
            )}

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isPending
                  ? "Saving..."
                  : isUpdate
                  ? "Update Note"
                  : "Add Note"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
