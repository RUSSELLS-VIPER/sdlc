import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  CalendarDays,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

import logo from "../../assets/images/image/infinity horizon logo finale 1.png";
import userImage from "../../assets/images/image/logo_us.png";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 bottom-0 left-0 lg:top-6 lg:left-[34px] w-[240px] lg:w-[203px] h-screen lg:h-[calc(100vh-40px)] lg:rounded-xl bg-[#171f5c] flex flex-col py-8 px-4 lg:px-3 z-50">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={logo}
          alt="Infinity Horizon Logo"
          className="w-[90px] h-[72px] object-contain"
        />
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 overflow-y-auto flex-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-[13px] font-bold transition ${
              isActive
                ? "bg-white text-[#171f5c]"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/chat"
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-[13px] font-bold transition ${
              isActive
                ? "bg-white text-[#171f5c]"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <MessageCircle size={18} />
          <span>Chat</span>
        </NavLink>

        <NavLink
          to="/admin/calender"
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-[13px] font-bold transition ${
              isActive
                ? "bg-white text-[#171f5c]"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <CalendarDays size={18} />
          <span>Calendar</span>
        </NavLink>

        <NavLink
          to="/admin/customer"
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-[13px] font-bold transition ${
              isActive
                ? "bg-white text-[#171f5c]"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <Users size={18} />
          <span>Customer</span>
        </NavLink>

        <NavLink
          to="/admin/revenue"
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-[13px] font-bold transition ${
              isActive
                ? "bg-white text-[#171f5c]"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <BarChart3 size={18} />
          <span>Revenue</span>
        </NavLink>
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-white px-3 py-3">
          <img
            src={userImage}
            alt="Sneha Paul"
            className="h-10 w-10 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-[#26306a]">
              Sneha Paul
            </p>

            <p className="truncate text-[11px] font-bold text-[#26306a]">
              dcdh@gmail.com
            </p>
          </div>
        </div>

        <button className="flex h-7 w-full items-center justify-center gap-2 rounded-full bg-white/30 text-xs font-bold text-white transition hover:bg-white/40">
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;