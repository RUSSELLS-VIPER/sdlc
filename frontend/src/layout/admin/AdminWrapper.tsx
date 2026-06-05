import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

import {
  Bell,
  MessageCircle,
  Menu,
  Search,
} from "lucide-react";

import profileImg from "../../assets/images/image/Ellipse 3 (1).png";

const AdminWrapper = () => {
  const location = useLocation();

 const getTitle = () => {
  const path = location.pathname;
   console.log("Current Path:", location.pathname);

  if (path.includes("/dashboard")) return "Dashboard";
  if (path.includes("/chat")) return "Chat";
  if (path.includes("/calender")) return "Calendar";
  if (path.includes("/customer")) return "Customer";
  if (path.includes("/revenue")) return "Revenue";

  return "Dashboard";
};
  return (
    <div className="bg-[#eef4fb] min-h-screen">

      <Sidebar />

      <div className="lg:pl-[245px] transition-all duration-300">

        {/* Topbar */}
        <div className="sticky top-0 bg-[#eef4fb]/95 backdrop-blur-md z-40 px-4 md:px-[17px] pt-4 pb-2">
          <div className="w-full max-w-[1580px] mx-auto flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 text-[#070b2d] bg-white rounded-full shadow-sm text-lg">
                <Menu size={20} />
              </button>

              <h1 className="text-xl md:text-[29px] leading-none font-bold text-[#070b2d]">
                {getTitle()}
              </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-3">

              <button className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-slate-50 transition">
                <Search size={18} className="text-[#64748b]" />
              </button>

              <button className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-slate-50 transition">
                <MessageCircle
                  size={18}
                  className="text-[#64748b]"
                />
              </button>

              <button className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center shadow-sm relative hover:bg-slate-50 transition">
                <Bell size={18} className="text-[#64748b]" />

                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>

              <img
                src={profileImg}
                alt="Profile"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover cursor-pointer border border-white shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="px-4 md:px-[17px] pb-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminWrapper;