import { IoAddOutline } from "react-icons/io5";
import NoteCard from "../../components/note/note-card";
// import Modal from "../../components/modal/modal";

const Home = () => {
  
  return (
    <>
      <section className="py-10">
        <div className="container">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold mb-6">Notes App</h2>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-5 rounded flex items-center gap-2 cursor-pointer"
            >
              <IoAddOutline size={20} />
              Add Note
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <NoteCard />
          </div>
        </div>
      </section>

      {/* <Modal /> */}
    </>
  );
};

export default Home;
