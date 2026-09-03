import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NoteCard = ({ note, onEdit, onDelete }) => {
  if (!note) return null;

  return (
    <div className="card bg-white border border-gray-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition">
      <div>
        <h3 className="text-xl font-bold text-gray-800 break-words mb-2">
          {note.title}
        </h3>
        <p className="text-gray-600 line-clamp-4 break-words whitespace-pre-line text-sm">
          {note.content}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEdit(note)}
            title="Edit Note"
            className="text-gray-500 hover:text-blue-500 cursor-pointer transition p-1"
          >
            <FaEdit size={18} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(note._id)}
            title="Delete Note"
            className="text-red-500 hover:text-red-700 cursor-pointer transition p-1"
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
