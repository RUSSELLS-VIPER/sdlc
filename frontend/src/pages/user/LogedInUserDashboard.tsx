import { NavLink } from "react-router-dom";
import userCalenderClock from "../../assets/images/userDashboardImages/userCalendarClock.png";
import userView from "../../assets/images/userDashboardImages/userView.png";
import userLikedProperties from "../../assets/images/userDashboardImages/userLikedProperties.png";
import userHouse from "../../assets/images/userDashboardImages/userHouse.svg";
import userImage from "../../assets/images/userDashboardImages/userImage-1.png";
import UserDashboardPropertyCrad from "../../components/Dashboard/userDashboard/UserDashboardPropertyCrad";
import { useAppDispatch, useAppSeletor } from "../../services/helper/reduxstore";
import { useEffect } from "react";
import { getWishList } from "../../store/slices/user.slice";
import UserDashboardStatCard from "../../components/Dashboard/userDashboard/UserDashboardStatCard";
import type { StatType } from "../../type/interface/userDashboard/userDashboard.interface";

const LogedInUserDashboard = () => {
  const {wishList} = useAppSeletor((state)=> state.users)
  const {token, role} = useAppSeletor((state)=> state.auth)
  const dispatch = useAppDispatch()

  const savedPropertiesLength = wishList?.length || 0

  useEffect(()=> {
    if(token && role === "user"){
      dispatch(getWishList())

    }
    

  }, [dispatch, token, role])
  const statsData:StatType[] = [
    {
      id: 1,
      title: "Upcoming Visits",
      value: 12,
      linkText: "Contact",
      linkTo: "/contact",
      imgSrc: userCalenderClock,
      imgAlt: "userCalendarClock",
    },
    {
      id: 2,
      title: "Recently Viewed",
      value: 85,
      linkText: "View",
      linkTo: "/recently-viewed",
      imgSrc: userView,
      imgAlt: "userView",
    },
    {
      id: 3,
      title: "Saved Properties",
      value: savedPropertiesLength,
      linkText: "View",
      linkTo: "/dashboard/saved-properties",
      imgSrc: userLikedProperties,
      imgAlt: "userLikedProperties",
    },
  ];
  return (
    <>
      {/* section 2 start */}
      <section>
        <div className="w-full mx-auto mb-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Greeting Hero Card */}
            <div
              className="lg:col-span-5 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative shadow-md overflow-visible min-h-[150px]"
              style={{
                background:
                  "linear-gradient(90deg, #14213D 0%, #4E638F 50%, #14213D 100%)",
              }}
            >
              <div className="z-10 max-w-[full]">
                <h2 className="text-2xl md:text-4xl font-serif text-white font-medium leading-tight tracking-wide mb-2">
                  Welcome Back, John!
                </h2>
                <p className="text-sm md:text-base font-semibold text-white tracking-wide">
                  Welcome to your dashboard John,
                </p>
              </div>

              <div className="absolute right-0 bottom-0 top-0 w-[42%] md:w-[38%] flex items-end justify-end pointer-events-none overflow-visible">
                <img
                  src={userHouse}
                  alt="House Model"
                  className="object-contain object-bottom max-h-[140%] -mt-14 drop-shadow-2xl transform translate-y-0.5"
                />
              </div>
            </div>

            {/* Render Stat Cards Array dynamically */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {statsData.map((stat) => (
               <UserDashboardStatCard stat={stat} key={stat.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* section 2 end */}

      {/* section 3 start */}
      <section>
        <div className="w-full mx-auto mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              {/* Analytics Graph Mockup */}
              <div className="bg-white rounded-2xl border border-[#14213D] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-serif font-bold text-[#1E1E1E]">
                    Market Trends
                  </h2>
                  <div className="relative  text-left text-sm font-medium text-[#1E1E1E] cursor-pointer flex items-center space-x-1.5">
                    <span>Monthly</span>
                    <i className="fa-solid fa-sort-down w-2 h-6"></i>
                  </div>
                </div>

                <div className="relative w-full h-48 mt-4">
                  <div className="absolute inset-0 flex flex-col justify-between text-[#1E1E1E] pointer-events-none pb-6 font-medium text-[16px] w-full">
                    <div className="border-b border-dashed border-slate-400">
                      2 cr
                    </div>
                    <div className="border-b border-dashed border-slate-400">
                      1.6 cr
                    </div>
                    <div className="border-b border-dashed border-slate-400">
                      1.2 cr
                    </div>
                    <div className="border-b border-dashed border-slate-400">
                      80L
                    </div>
                    <div className="border-b border-dashed border-slate-400">
                      40L
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-6 top-4 left-8">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 40"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="chartGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#f59e0b"
                            stopOpacity="0.8"
                          />
                          <stop
                            offset="50%"
                            stopColor="#fbbf24"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="100%"
                            stopColor="#fff"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 35 Q 10 20, 20 18 T 40 22 T 60 10 T 80 5 T 100 30 L 100 40 L 0 40 Z"
                        fill="url(#chartGradient)"
                      />
                      <path
                        d="M 0 35 Q 10 20, 20 18 T 40 22 T 60 10 T 80 5 T 100 30"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="0.75"
                      />
                    </svg>

                    <div className="absolute left-[2%] bottom-[19%] group">
                      <div className="w-2 h-2 bg-[#0f172a] rounded-full cursor-pointer"></div>
                      <div className="absolute bottom-full left-9 transform -translate-x-1/2 bg-transparent text-[#0f172a] text-[10px] px-3 py-0.5 font-sans whitespace-nowrap">
                        78 Lakhs
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 left-8 flex justify-between text-[#14213D] font-medium">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>April</span>
                    <span>Jun</span>
                    <span>July</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Property Listing Container */}
              <div className="w-full overflow-x-auto scrollbar-hide py-2">
                <div className="flex flex-row gap-4 sm:gap-6 min-w-full pb-2 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {wishList?.map((item) => (
                    <UserDashboardPropertyCrad item={item}  key={item._id} />
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar panel & static user note structure */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4 text-[#1E1E1E]">
              <div className="bg-white rounded-2xl border border-[#1E1E1E] p-6 flex flex-col justify-between h-[70%]">
                <div>
                  <h2 className="text-3xl font-serif mb-4">Schedules</h2>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">May, 2026</span>
                    <div className="flex space-x-4 text-slate-600">
                      <button className="hover:text-slate-900">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button className="hover:text-slate-900">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <hr className="border-dotted border-[#1E1E1E] mb-4" />

                  <div className="grid grid-cols-7 gap-y-3 text-center text-base font-medium text-slate-700 mb-4">
                    <div className="font-base">Sun</div>
                    <div className="font-base">Mon</div>
                    <div className="font-base">Tue</div>
                    <div className="font-base">Wed</div>
                    <div className="font-base">Thu</div>
                    <div className="font-base">Fri</div>
                    <div className="font-base">Sat</div>

                    <div className="col-span-5 font-base"></div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div className="text-pink-500 font-bold relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-pink-500 after:rounded-full">
                      12
                    </div>
                    <div>13</div>
                    <div>14</div>
                    <div>15</div>
                    <div>16</div>
                    <div>17</div>
                    <div>18</div>
                    <div>19</div>
                    <div>20</div>
                    <div>21</div>
                    <div>22</div>
                    <div>23</div>
                    <div>24</div>
                    <div>25</div>
                    <div>26</div>
                    <div>27</div>
                    <div>28</div>
                    <div>29</div>
                    <div>30</div>
                    <div>31</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center ">
                    <h4 className="text-3xl font-bold">Upcoming</h4>
                    <NavLink
                      to="#"
                      className="text-base underline underline-offset-2 hover:text-slate-600 font-medium"
                    >
                      View All
                    </NavLink>
                  </div>
                  <div
                    className="rounded-xl p-3 flex items-center space-x-4"
                    style={{background: "linear-gradient(90deg, #FCA311 0%, #fae6bd 60%, #fff 100%)"}}
                  >
                    <img
                      src={userImage}
                      alt="userImage-1"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-[#1E1E1E] leading-tight">
                        Property Visit
                      </h5>
                      <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                        15 Feb,2026 - 11:00AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-sky-50/40 rounded-2xl border border-[#1E1E1E] p-6 shadow-sm flex justify-between items-start min-h-[170px]">
                <h3 className="text-xl font-semibold text-slate-800">Notes</h3>
                <button className="bg-white border border-[#1E1E1E] hover:bg-slate-50 text-slate-700 text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm transition-colors flex items-center space-x-1">
                  <span>+ Add new notes</span>
                </button>
              </div>
            </div>
          </div>

          {/* Activity timeline layout ticker footer */}
          <div className="mt-4 flex items-center text-sm font-medium text-slate-800">
            <span>Recent Activity :</span>
            <div className="relative h-7 w-56 overflow-hidden">
              <div className="activity-line-1 absolute inset-0 flex items-center px-3 whitespace-nowrap">
                You viewed 2BHK in Newtown
              </div>
              <div className="activity-line-2 absolute inset-0 flex items-center px-3 whitespace-nowrap opacity-0">
                Agent replied to your inquiry
              </div>
              <div className="activity-line-3 absolute inset-0 flex items-center px-3 whitespace-nowrap opacity-0">
                Visit scheduled for Sunday
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section 3 end */}
    </>
  );
};

export default LogedInUserDashboard;
