import { useLocation } from "react-router-dom";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { pathname } = useLocation();
  let navarItem = "";
  if (pathname === "/dashboard") {
    navarItem = "Dashboard Overview";
  } else if (pathname === "/dashboard/savedProperties") {
    navarItem = "Saved Properties";
  } else if (pathname === "/dashboard/myInquiries") {
    navarItem = "My Inquiries";
  } else if (pathname === "/dashboard/myBookings") {
    navarItem = "My Bookings";
  } else if (pathname === "/dashboard/notifications") {
    navarItem = "Notifications";
  }

  return (
    <section>
      <div className="w-full mx-auto font-sans select-none mb-6">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 min-w-0">
            {/* Added onClick handler to trigger the state toggle */}
            <button
              onClick={onToggleSidebar}
              type="button"
              className="inline-flex sm:hidden items-center justify-center p-2 text-neutral-700 bg-transparent hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-300 rounded-md focus:outline-none shrink-0"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>

            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-serif font-semibold text-[#14213D] truncate">
              {navarItem}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="relative w-28 xs:w-36 sm:w-40 md:w-48">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass w-3 h-3 text-neutral-500"></i>
              </span>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-8 pr-2 py-2 border border-[#14213D] rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all text-xs"
              />
            </div>

            <button className="bg-[#14213D] text-white px-3 sm:px-5 py-2 rounded-lg font-medium text-xs sm:text-sm border border-[#14213D] hover:bg-white hover:text-[#14213D] transition-all whitespace-nowrap">
              <span className="hidden md:inline">Book Schedules</span>
              <span className="md:hidden">Book</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}