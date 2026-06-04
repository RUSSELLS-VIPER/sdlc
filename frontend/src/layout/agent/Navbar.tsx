import { NavLink } from 'react-router-dom';
import type { AgentNavbarProps } from '../../type/interface/agent/agent-dashboard.interface';



const Navbar:React.FC<AgentNavbarProps>= ({ onMenuToggle })=> {
  return (
    <header className="bg-[#161a2b] p-4 flex items-center justify-between lg:hidden shadow-md z-40 shrink-0 w-full">
      <button
        onClick={onMenuToggle}
        id="menu-toggle"
        className="text-2xl focus:outline-none text-white hover:text-[#DAA520] transition-colors"
      >
        <i className="fas fa-bars"></i>
      </button>
      <NavLink to="/index">
        <img
          src="assets/images/logo.png"
          alt="Logo"
          className="h-8 object-contain"
        />
      </NavLink>
    </header>
  );
}
export default Navbar