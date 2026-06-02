import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const UserDashboardWrapper = () => {
  return (
    <>
      <div className="font-sans text-gray-800 antialiased overflow-x-hidden">
        <Sidebar />

        <div className="sm:ms-64 p-4">
          <Navbar />

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserDashboardWrapper;
