import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NoteCard = () => {
  return (
    <div className="card border border-gray-300 rounded-2xl p-6 flex flex-col gap-4 h-full justify-between">
      <h3 className="text-xl font-bold">Note Title</h3>
      <p className="text-gray-600 line-clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam tempora
        quia officia maxime quidem sed sunt ex illo ut ad incidunt dolorum
        reprehenderit, hic ullam aperiam voluptatibus iste, assumenda pariatur?
      </p>
      <div className="flex items-center gap-2 ">
        <FaEdit size={20} className="text-gray-500 cursor-pointer" />
        <MdDelete size={20} className="text-red-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default NoteCard;
