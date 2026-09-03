import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-12">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
