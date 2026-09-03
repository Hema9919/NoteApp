import { MdLogout } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../../contexts/auth-context";

const Navbar = () => {
  const { token, handleRemoveToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    handleRemoveToken();
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 text-white fixed top-0 left-0 w-full">
      <div className="container flex justify-between items-center h-14">
        <h1 className="text-3xl font-bold">Note App</h1>

        <nav>
          <ul className="flex space-x-4">
            {!token ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            ) : (
              <li
                onClick={handleLogout}
                className="flex gap-2 items-center cursor-pointer"
              >
                Logout <MdLogout />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;