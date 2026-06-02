import { NavLink } from "react-router-dom";
import userDashboardImageLogo from "../../assets/images/userDashboardImages/logo.png";
import { logout } from "../../store/slices/auth.slice";
import { useAppDispatch } from "../../services/helper/reduxstore";
import userImage from "../../assets/images/userDashboardImages/userImage.png";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  return (
    <aside
      id="separator-sidebar"
      className="bg-[#14213D] text-white fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    >
      <div className="flex flex-col justify-between h-full px-5 py-4 overflow-y-auto">
        <ul className="space-y-5 font-medium">
          <li>
            <NavLink
              to="/"
              className="flex justify-center items-center px-2 py-1.5 text-white rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
            >
              <img
                src={userDashboardImageLogo}
                alt="logo"
                className="w-24 h-26"
              />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              end /* <--- ADD THIS PROP HERE */
              className={({ isActive }) =>
                `flex items-center p-4 rounded-xl group ${isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"}`
              }
            >
              <div
                className="ms-3 w-6 h-6 bg-current"
                style={{
                  mask: "url('./assets/userDashboardImages/userDashboard.svg') no-repeat center",
                  WebkitMask:
                    "url('./assets/userDashboardImages/userDashboard.svg') no-repeat center",
                }}
              />
              <span className="ms-3">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/savedProperties"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-xl group ${isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"}`
              }
            >
              <div
                className="ms-3 w-6 h-6 bg-current"
                style={{
                  mask: "url('../../assets/userDashboardImages/userSavedProperties.svg') no-repeat center",
                  WebkitMask:
                    "url('../../assets/userDashboardImages/userSavedProperties.svg') no-repeat center",
                }}
              />
              <span className="ms-3">Saved Properties</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myInquiries"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-xl group ${isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"}`
              }
            >
              <div
                className="ms-3 w-6 h-6 bg-current"
                style={{
                  mask: "url('../../assets/userDashboardImages/userMyInquiries.svg') no-repeat center",
                  WebkitMask:
                    "url('../../assets/userDashboardImages/userMyInquiries.svg') no-repeat center",
                }}
              />
              <span className="ms-3">My Inquiries</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myBookings"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-xl group ${isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"}`
              }
            >
              <div
                className="ms-3 w-6 h-6 bg-current"
                style={{
                  mask: "url('../../assets/userDashboardImages/userMyBookings.svg') no-repeat center",
                  WebkitMask:
                    "url('../../assets/userDashboardImages/userMyBookings.svg') no-repeat center",
                }}
              />
              <span className="ms-3">My Bookings</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/notifications"
              className={({ isActive }) =>
                `flex items-center p-4 rounded-xl group ${isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"}`
              }
            >
              <div
                className="ms-3 w-6 h-6 bg-current"
                style={{
                  mask: "url('../../assets/userDashboardImages/userNotifications.svg') no-repeat center",
                  WebkitMask:
                    "url('../../assets/userDashboardImages/userNotifications.svg') no-repeat center",
                }}
              />
              <span className="ms-3">Notifications</span>
            </NavLink>
          </li>
        </ul>

        <ul className="space-y-5 font-medium border-t border-default pt-4 mt-4">
          <li>
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="w-full flex justify-evenly items-center p-2 bg-[#EEEEEE] text-[#1E1E1E] rounded-xl hover:bg-[#FCA311] hover:text-[#F8FEFF] group"
            >
              <img src={userImage} alt="userImage" />
              <span>John Carter</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </li>

          <div
            id="dropdown"
            className="hidden w-[220px] bg-[#EEEEEE] text-[#1E1E1E] rounded-xl"
          >
            <ul
              className="w-full text-sm font-medium"
              aria-labelledby="dropdown-button"
            >
              <li>
                <NavLink
                  to="#"
                  className="flex items-center w-full p-2 rounded-xl transition-colors duration-150 hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                >
                  1
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="flex items-center w-full p-2 rounded-xl transition-colors duration-150 hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                >
                  2
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="flex items-center w-full p-2 rounded-xl transition-colors duration-150 hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                >
                  3
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="flex items-center w-full p-2 rounded-xl transition-colors duration-150 hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                >
                  4
                </NavLink>
              </li>
            </ul>
          </div>

          <li>
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center p-4 bg-[#EEEEEE] text-[#1E1E1E] rounded-xl hover:bg-[#FCA311] hover:text-[#F8FEFF] group"
            >
              <div
                className="ms-3 w-6 h-6 bg-current"
                style={{
                  mask: "url('../../assets/userDashboardImages/userLogout.svg') no-repeat center",
                  WebkitMask:
                    "url('../../assets/userDashboardImages/userLogout.svg') no-repeat center",
                }}
              />
              <span className="ms-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
