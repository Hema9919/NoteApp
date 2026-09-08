import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NoteCard from "../../components/note/note-card";
import Modal from "../../components/modal/modal";
import { getUserNotes, getAllNotes, deleteNote } from "../../api/notesAPI";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [viewMode, setViewMode] = useState("myNotes"); // "myNotes" | "allNotes"

  const queryClient = useQueryClient();

  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userNotes", viewMode],
    queryFn: viewMode === "allNotes" ? getAllNotes : getUserNotes,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      setDeleteError("");
      queryClient.invalidateQueries({ queryKey: ["userNotes"] });
    },
    onError: (err) => {
      const msg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Failed to delete note";
      setDeleteError(msg);
    },
  });

  const handleOpenAddModal = () => {
    setSelectedNote(null);
    setDeleteError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (note) => {
    setSelectedNote(note);
    setDeleteError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(id);
    }
  };

  // Reverse so newest notes appear first
  const displayNotes = Array.isArray(notes) ? [...notes].reverse() : [];

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {viewMode === "myNotes" ? "My Notes" : "All Public Notes"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {viewMode === "myNotes"
                  ? "Manage, edit, and delete your own personal notes"
                  : "Explore public notes created by all users"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Tab Toggle */}
              <div className="bg-gray-100 p-1 rounded-xl flex">
                {/* <button
                  type="button"
                  onClick={() => setViewMode("myNotes")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer transition ${
                    viewMode === "myNotes"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My Notes
                </button> */}
                {/* <button
                  type="button"
                  onClick={() => setViewMode("allNotes")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer transition ${
                    viewMode === "allNotes"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  All Notes
                </button> */}
              </div>

              {/* Add Note Button */}
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs hover:shadow transition"
              >
                <IoAddOutline size={20} />
                <span className="font-medium text-sm">Add Note</span>
              </button>
            </div>
          </div>

          {/* Delete Error Notification */}
          {deleteError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex justify-between items-center">
              <span>{deleteError}</span>
              <button
                type="button"
                onClick={() => setDeleteError("")}
                className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
              >
                ×
              </button>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex flex-col justify-center items-center py-20 gap-3">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm">Loading notes...</p>
            </div>
          )}

          {/* Error Indicator */}
          {isError && (
            <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-200">
              <p className="text-red-500 font-medium">
                {error?.message || "Failed to load notes"}
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && displayNotes.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-600 text-lg font-medium">
                {viewMode === "myNotes"
                  ? "You don't have any notes yet."
                  : "No notes found in the database."}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Click &quot;Add Note&quot; above to create your first note!
              </p>
            </div>
          )}

          {/* Notes Grid */}
          {!isLoading && !isError && displayNotes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Unified Add & Update Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        noteToEdit={selectedNote}
      />
    </>
  );
};

export default Home;
