import { IoMdClose } from "react-icons/io";


const Modal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="modal bg-white w-sm p-5 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">add Note</h1>
          <IoMdClose
            size={30}
            className="cursor-pointer"
          />
        </div>

        <form>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              id="title"
              placeholder="Enter note title"
              className="outline-none border border-gray-300 focus:border-blue-500 rounded px-3 py-1"
            />
            <input
              type="text"
              id="content"
              placeholder="Enter note content"
              className="outline-none border border-gray-300 focus:border-blue-500 rounded px-3 py-1"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-8 rounded self-end cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
