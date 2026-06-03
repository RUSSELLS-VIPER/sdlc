import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const UserDashboardWrapper = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="font-sans text-gray-800 antialiased overflow-x-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="sm:ms-64 p-4">
          <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserDashboardWrapper;