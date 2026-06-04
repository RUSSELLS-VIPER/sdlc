
import { NavLink } from 'react-router-dom';
import type { AgentSidebarProps } from '../../type/interface/agent/agent-dashboard.interface';
import logo from '../../assets/images/agent-dashboard-images/logo.png';
import agent1 from '../../assets/images/agent-dashboard-images/agent-1.jpg'



const Sidebar:React.FC<AgentSidebarProps> = ({ isOpen, onMenuClose })=> {
  return (
    <>
      <aside
        id="sidebar"
        className={`bg-[#161a2b] text-gray-300 w-64 h-full fixed inset-y-0 left-0 lg:relative lg:translate-x-0 z-50 flex flex-col p-6 shadow-xl shrink-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center w-full justify-center">
            <NavLink to="/" className="w-[74px] h-[92px]">
              <img
                src={logo}
                alt="Infinity Horizon Logo"
                className="object-cover"
              />
            </NavLink>
          </div>
          <button
            onClick={onMenuClose}
            id="menu-close"
            className="text-2xl lg:hidden focus:outline-none text-gray-400 hover:text-white absolute right-4 top-6"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
          <NavLink
            to="/agent/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors font-bold ${
                isActive ? "bg-white text-[#161a2b] shadow-sm" : "hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <i className="fas fa-th-large text-lg w-5 text-center"></i>
            <span className="text-sm">Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/agent/inquiry"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors ${
                isActive ? "bg-white text-[#161a2b] shadow-sm font-bold" : "hover:bg-white/10 hover:text-white font-medium text-sm"
              }`
            }
          >
            <i className="fas fa-headset text-lg w-5 text-center"></i>
            <span className="text-sm">Customer Inquiry</span>
          </NavLink>
          
          <NavLink
            to="/agent/manage-properties"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors ${
                isActive ? "bg-white text-[#161a2b] shadow-sm font-bold" : "hover:bg-white/10 hover:text-white font-medium text-sm"
              }`
            }
          >
            <i className="fas fa-building text-lg w-5 text-center"></i>
            <span className="text-sm">Manage Properties</span>
          </NavLink>
          
          <NavLink
            to="/agent/chats"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors ${
                isActive ? "bg-white text-[#161a2b] shadow-sm font-bold" : "hover:bg-white/10 hover:text-white font-medium text-sm"
              }`
            }
          >
            <i className="fas fa-comments text-lg w-5 text-center"></i>
            <span className="text-sm">Chats</span>
          </NavLink>
        </nav>

        <div className="mt-6 space-y-4">
          <div className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-md">
            <img
              src={agent1}
              alt="Sneha Paul"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="overflow-hidden">
              <p className="font-bold text-[#161a2b] text-sm truncate">Sneha Paul</p>
              <p className="text-xs text-[#161a2b] font-medium opacity-80 truncate">Agent</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-white/10 text-gray-300 py-3 rounded-xl hover:bg-white/20 hover:text-white transition-colors font-medium text-sm">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile background backdrop overlay */}
      <div
        onClick={onMenuClose}
        id="mobile-overlay"
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${isOpen ? "" : "hidden"}`}
      ></div>
    </>
  );
}

export default Sidebar