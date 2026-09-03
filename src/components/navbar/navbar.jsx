import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-blue-500 text-white fixed top-0 left-0 w-full">
      <div className="container flex justify-between items-center h-14">
        <h1 className="text-3xl font-bold">Note App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
            <li className="flex gap-2 items-center cursor-pointer">
              logout <MdLogout />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
