import { useEffect, useRef, useState } from "react";
import Logo from "../../assets/images/services/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";
import { logout } from "../../store/slices/auth.slice";
const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [mobileDropdown, setMobileDropdown] = useState<boolean>(false);
  const { role, token, user } = useAppSeletor((state) => state.auth);
  const [desktopUserDropdown, setDesktopUserDropdown] = useState(false);

  const [mobileUserDropdown, setMobileUserDropdown] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      // desktop dropdown
      if (desktopRef.current && !desktopRef.current.contains(target)) {
        setDesktopUserDropdown(false);
      }

      // mobile dropdown
      if (mobileRef.current && !mobileRef.current.contains(target)) {
        setMobileUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const propertiesItem = [
    { name: "All Properties", path: "/property" },
    { name: "Buy Properties", path: "/property" },
    { name: "Rent Properties", path: "/property" },
    { name: "Sell Properties", path: "/property" },
  ];

  return (
    <div className="relative z-50">
      <header className="absolute top-0 left-0 w-full z-50 pt-4 md:pt-6 pb-2">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6">
          <div className="relative z-40 w-full pb-2">
            <nav className="flex items-center justify-between w-full h-16">
              {/* Logo */}
              <div className="flex-1 flex justify-start">
                <NavLink to="/" className="inline-block">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-[74px] h-[92px] object-contain"
                    loading="lazy"
                  />
                </NavLink>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex flex-none items-center gap-6 backdrop-blur-xl border-2 border-white/50 rounded-full px-6 py-1">
                <NavLink
                  className="nav-link text-white text-sm font-semibold hover:text-[#facc15] transition-colors"
                  to="/"
                >
                  Home
                </NavLink>

                <NavLink
                  className="nav-link text-white text-sm font-semibold hover:text-[#facc15] transition-colors"
                  to="/about"
                >
                  About US
                </NavLink>

                {/* Dropdown */}
                <div className="relative group cursor-pointer">
                  <div className="flex items-center py-2.5 text-sm text-white transition">
                    <NavLink
                      to="/property"
                      className="nav-link text-white group-hover:text-[#facc15] text-sm font-semibold transition-colors"
                    >
                      Properties
                    </NavLink>
                    <span className="ml-1.5 text-white group-hover:text-[#facc15] inline-block transition-transform duration-300 group-hover:-rotate-180">
                      <ChevronDown size={14} strokeWidth={2.5} />
                    </span>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-gray-50 backdrop-blur-md rounded-t-sm rounded-b-2xl border border-[#facc15] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                    <ul className="py-2 font-sans">
                      {propertiesItem.map((item) => (
                        <li key={item.name}>
                          <NavLink
                            to={item.path}
                            className="block px-5 py-2.5 text-sm text-black hover:bg-[#facc15] hover:text-[#0F172a] transition"
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <NavLink
                  className="nav-link text-white text-sm font-semibold hover:text-[#facc15] transition-colors"
                  to="/service"
                >
                  Services
                </NavLink>

                <NavLink
                  className="nav-link text-white text-sm font-semibold hover:text-[#facc15] transition-colors"
                  to="/blog"
                >
                  Blogs
                </NavLink>
              </div>

              {/* Right Side (Desktop) */}

              <div className="hidden lg:flex flex-1 items-center justify-end gap-3">
                <button
                  aria-label="Favorite"
                  className="group inline-flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 border-2 border-transparent transition-all duration-300 ease-in-out hover:border-red-500 hover:bg-white"
                >
                  <Heart
                    size={20}
                    strokeWidth={2.3}
                    className="text-amber-500 transition-colors duration-300 ease-in-out group-hover:text-red-500"
                  />
                </button>
                {role && token ? (
                  <div className="relative" ref={desktopRef}>
                    <button
                      onClick={() => setDesktopUserDropdown(!desktopUserDropdown)}
                      aria-label="Account"
                      className="group inline-flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 border-2 border-transparent transition-all duration-300 ease-in-out hover:border-[#0F172A] hover:bg-white"
                    >
                      <User
                        size={20}
                        strokeWidth={2.3}
                        className="text-amber-500 transition-colors duration-300 ease-in-out group-hover:text-[#0F172A]"
                      />
                    </button>

                    {/* Dropdown */}
                    {desktopUserDropdown && (
                      <div className="absolute left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                        {/* User Info */}
                        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-bold text-gray-900">
                              {user?.name || "User"}
                            </h3>
                            <button
                              className="text-black"
                              onClick={() => setDesktopUserDropdown(!desktopUserDropdown)}
                            >
                              {<X size={20} className="text-bold" />}
                            </button>
                          </div>

                          <p className="text-xs text-gray-500 mt-1 break-all">
                            {user?.email || "user@gmail.com"}
                          </p>
                        </div>

                        {/* Menu */}
                        <div className="p-2 flex flex-col gap-1">
                          <button
                            onClick={() => {
                              if (role === "user") {
                                navigate("/userDashboard");
                              } else {
                                navigate("/admin/dashboard");
                              }
                              setDesktopUserDropdown(false);
                               
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#0F172A] hover:text-white transition"
                          >
                            <LayoutDashboard size={18} />
                            My Dashboard
                          </button>

                          <button
                            onClick={() => {
                              setDesktopUserDropdown(false);
                              dispatch(logout());
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition"
                          >
                            <LogOut size={18} />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className={
                      "bg-[#0F172A]  text-amber-500 px-4 text-bold rounded-xl hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500 py-2"
                    }
                  >
                    Login
                  </button>
                )}

                <button
                  onClick={() => navigate("/contact")}
                  className="text-sm font-medium whitespace-nowrap group flex items-center gap-4 px-4 py-2 sm:pr-2 pr-2 sm:gap-3 sm:px-4 sm:py-2 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A] border border-transparent hover:border-[#0F172A]"
                >
                  Contact Us
                  <div className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]">
                    <ArrowUpRight
                      size={20}
                      strokeWidth={2.4}
                      className="text-slate-900 transition-transform duration-300 ease-in-out -rotate-45 group-hover:text-amber-400 group-hover:rotate-0"
                    />
                  </div>
                </button>
              </div>

              {/* Mobile Button */}
              <button
                className="lg:hidden text-white ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X size={28} strokeWidth={2.5} />
                ) : (
                  <Menu size={28} strokeWidth={2.5} />
                )}
              </button>
            </nav>
          </div>

          {/* Overlay */}
          {mobileOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[#111827]/75 backdrop-blur-md border-l border-white/40 shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ${
              mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <span className="text-white font-bold tracking-wider">MENU</span>

              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-white transition p-1  leading-none"
                aria-label="Close menu"
              >
                <X size={32} strokeWidth={2.5} />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex flex-col px-6 py-6 space-y-6 font-sans">
              {/* Home */}
              <div>
                <NavLink
                  to="/"
                  className="nav-link text-white text-lg font-medium hover:text-yellow-400 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </NavLink>
              </div>

              {/* About */}
              <div>
                <NavLink
                  to="/about"
                  className="nav-link text-white text-lg font-medium hover:text-yellow-400 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  About US
                </NavLink>
              </div>

              {/* Properties Dropdown */}
              <div className="flex flex-col group">
                <button
                  onClick={() => setMobileDropdown(!mobileDropdown)}
                  className="text-white hover:text-yellow-400 text-lg font-semibold flex justify-between items-center w-full focus:outline-none transition"
                >
                  <span className="nav-link">Properties</span>
                  <span className="inline-block transition-transform duration-300 text-sm">
                    {mobileDropdown ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>

                {mobileDropdown && (
                  <div className="flex flex-col pl-4 mt-3 space-y-4">
                    <NavLink
                      to="/properties/apartments"
                      className="text-gray-300 hover:text-yellow-400 transition block"
                      onClick={() => setMobileOpen(false)}
                    >
                      Apartments
                    </NavLink>

                    <NavLink
                      to="/properties/villas"
                      className="text-gray-300 hover:text-yellow-400 transition block"
                      onClick={() => setMobileOpen(false)}
                    >
                      Villas
                    </NavLink>

                    <NavLink
                      to="/properties/commercial"
                      className="text-gray-300 hover:text-yellow-400 transition block"
                      onClick={() => setMobileOpen(false)}
                    >
                      Commercial Spaces
                    </NavLink>

                    <NavLink
                      to="/properties/plots"
                      className="text-gray-300 hover:text-yellow-400 transition block pb-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      Land & Plots
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Services */}
              <div>
                <NavLink
                  to="/service"
                  className="nav-link text-white text-lg font-medium hover:text-yellow-400 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Services
                </NavLink>
              </div>

              {/* Blogs */}
              <div>
                <NavLink
                  to="/blog"
                  className="nav-link text-white text-lg font-medium hover:text-yellow-400 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Blogs
                </NavLink>
              </div>

              <hr className="border-gray-800 my-4" />

              {/* Icons */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex gap-4">
                  <button className="group inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 border-2 border-white transition-all duration-300 ease-in-out hover:border-red-500 hover:bg-white">
                    <Heart
                      size={20}
                      className="text-amber-500 group-hover:text-red-500"
                    />
                  </button>

                  {token && role ? (
                    <div className="relative" ref={mobileRef}>
                      <button
                        onClick={() => setMobileUserDropdown(!mobileUserDropdown)}
                        className="group inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 border-2 border-white transition-all duration-300 ease-in-out hover:border-red-500 hover:bg-white"
                      >
                        <User
                          size={20}
                          className="text-amber-500 group-hover:text-red-500"
                        />
                      </button>

                      {/* Mobile Dropdown */}
                      {mobileUserDropdown && (
                        <div className="absolute left-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                          {/* User Info */}
                          <div className="px-4 py-4 border-b border-gray-100 bg-gray-50">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-bold text-gray-900">
                                {user?.name || "User"}
                              </h3>
                              <button
                                className="text-black"
                                onClick={() => setMobileUserDropdown(false)}
                              >
                                {<X size={20} className="text-bold" />}
                              </button>
                            </div>

                            <p className="text-xs text-gray-500 mt-1 break-all">
                              {user?.email || "user@gmail.com"}
                            </p>
                          </div>

                          {/* Menu */}
                          <div className="p-2 flex flex-col gap-1">
                            <button
                              onClick={() => {
                                if (role === "user") {
                                  navigate("/userDashboard");
                                } else {
                                  navigate("/admin/dashboard");
                                }
                                setMobileDropdown(false);
                                setMobileOpen(false);
                                setMobileUserDropdown(false);
                              }}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#0F172A] hover:text-white transition"
                            >
                              <LayoutDashboard size={18} />
                              My Dashboard
                            </button>

                            <button
                              onClick={() => {
                                dispatch(logout());
                                setMobileDropdown(false);
                                setMobileOpen(false);
                                setMobileUserDropdown(false);
                              }}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition"
                            >
                              <LogOut size={18} />
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className={
                        "bg-[#0F172A] border-white border-2 text-amber-500 px-3  text-bold rounded-xl hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500 py-1"
                      }
                    >
                      Login
                    </button>
                  )}
                </div>

                {/* Contact Button */}
                <NavLink
                  to="/contact"
                  className={`group flex items-center ${mobileUserDropdown && "mt-52"} justify-center gap-4 px-4 py-2 rounded-2xl transition-all duration-500 ease-in-out bg-[#0F172A] text-white hover:bg-white hover:text-[#0F172A] border-2 border-white hover:border-[#0F172A]`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-sm font-medium whitespace-nowrap">
                    Contact Us
                  </span>

                  <div className="flex items-center justify-center w-7 h-7 rounded-xl transition-colors duration-300 ease-in-out bg-white group-hover:bg-[#0F172A]">
                    <ArrowUpRight
                      size={20}
                      className="text-slate-900 transition-transform duration-300 ease-in-out -rotate-45 group-hover:text-amber-400 group-hover:rotate-0"
                    />
                  </div>
                </NavLink>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
