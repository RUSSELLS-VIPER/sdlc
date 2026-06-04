import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AgentWrapper() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-gray-50 font-sans antialiased h-screen flex flex-col lg:flex-row overflow-hidden relative w-full">
      <Navbar onMenuToggle={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onMenuClose={closeSidebar} />
      <Outlet />
      
    </div>
  );
}