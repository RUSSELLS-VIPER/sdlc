
import pvi1 from '../../assets/images/userDashboardImages/pvi1.png'
import pvi2 from '../../assets/images/userDashboardImages/pvi2.png'
import pvi3 from '../../assets/images/userDashboardImages/pvi3.png'
import userDashboardImage from '../../assets/images/userDashboardImages/userDashboard.svg'
import userMyInquiriesCR1 from '../../assets/images/userDashboardImages/userMyInquiriesCR1.png'
import userMyInquiriesCR2 from '../../assets/images/userDashboardImages/userMyInquiriesCR2.png'
import userMyInquiriesCR3 from '../../assets/images/userDashboardImages/userMyInquiriesCR3.png'
import send from '../../assets/images/userDashboardImages/send.svg'
import UserVisitIndicatorCard from "../../components/Dashboard/userDashboard/UserVisitIndicatorCard";
import type { AgentListData, VisitIndicatorData } from "../../type/interface/userDashboard/userDashboard.interface";
import UserAgentListData from "../../components/Dashboard/userDashboard/UserAgentListData";


const MyInquiries = () => {
    const agentListData:AgentListData[] = [
    {
      id: 1,
      name: "Arijit",
      location: "Kolkata",
      visitStatus: "Done",
      statusColor: "text-emerald-400",
      date: "01.12.2025",
      bhk: "2 BHK",
      downloadLink: "#",
    },
    {
      id: 2,
      name: "Amrit",
      location: "Barasat",
      visitStatus: "Pending",
      statusColor: "text-amber-500",
      date: "06.12.2025",
      bhk: "4 BHK",
      downloadLink: "#",
    },
    {
      id: 3,
      name: "Akshay",
      location: "Kolkata",
      visitStatus: "Done",
      statusColor: "text-emerald-400",
      date: "15.12.2025",
      bhk: "4 BHK",
      downloadLink: "#",
    },
    {
      id: 4,
      name: "Rahul",
      location: "Newtown",
      visitStatus: "Pending",
      statusColor: "text-amber-500",
      date: "18.12.2025",
      bhk: "3 BHK",
      downloadLink: "#",
    },
  ];

  // Array of Objects for the Property Visit Indicator Slider Section
  const visitIndicatorData: VisitIndicatorData[]= [
    {
      id: 1,
      slideClassName: "slide-1 absolute inset-0 flex flex-col xl:flex-row xl:items-center justify-between bg-[#f1f5f9] gap-4 xl:gap-10",
      imageSrc: pvi1,
      title: "Duplex House",
      location: "Tamluk, GT Road",
      bhk: "3BHK",
      agentName: "Akshay Dutta",
      visitText: "Visit Done",
    },
    {
      id: 2,
      slideClassName: "slide-2 absolute inset-0 flex flex-col xl:flex-row xl:items-center justify-between bg-[#f1f5f9] opacity-0 gap-4 xl:gap-10",
      imageSrc: pvi2,
      title: "Premium Villa",
      location: "New Town, Action Area II",
      bhk: "4BHK",
      agentName: "Amrit Sen",
      visitText: "Visit Done",
    },
    {
      id: 3,
      slideClassName: "slide-3 absolute inset-0 flex flex-col xl:flex-row xl:items-center justify-between bg-[#f1f5f9] opacity-0 gap-4 xl:gap-10",
      imageSrc: pvi3,
      title: "Skyline Residency",
      location: "Kavi Subhas, Bypass",
      bhk: "2BHK",
      agentName: "Arijit Das",
      visitText: "Visit Done",
    },
  ];
  return (
    <>
    

      {/* section 2 start */}
      <section>
        <div className="w-full mx-auto mb-6 space-y-12">
          {/* agent list */}
          <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div
              style={{
                backgroundImage: "linear-gradient(to bottom, #14213D, #3558A3)",
              }}
              className="rounded-xl border border-white/10 overflow-hidden min-w-[700px] m-1"
            >
              <div className="grid grid-cols-6 gap-2 p-4 text-xs md:text-sm font-semibold tracking-wider text-slate-300 border-b border-white/10 bg-black/10">
                <div>Agent Name</div>
                <div>Location</div>
                <div>Visit</div>
                <div>Date</div>
                <div>BHK</div>
                <div className="text-right">Quotations</div>
              </div>

              <div className="max-h-50 overflow-y-auto divide-y divide-white/5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {agentListData.map((agent) => (
                    <UserAgentListData agent={agent} key={agent.id} />
                  
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* queries */}
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #14213D, #4E638F, #14213D)",
                }}
                className="flex-1 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <h2 className="text-xl font-bold text-white tracking-wide">
                    My Queries
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Track your submitted queries and Responses
                  </p>

                  <div className="mt-4 w-full h-60 bg-[#D9D9D9] border border-[#D9D9D9] rounded-xl backdrop-blur-sm relative pb-4">
                    <div className="absolute bottom-4 left-0 right-0 w-[95%] mx-auto flex items-center">
                      <span className="absolute left-4 text-slate-400 text-lg cursor-pointer hover:text-slate-200 z-10">
                        <i className="fa-regular fa-face-smile"></i>
                      </span>

                      <input
                        type="text"
                        placeholder="Message...."
                        className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm pl-11 pr-12 py-3 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <button className="absolute right-4 text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center group">
                        <img
                          src={userDashboardImage}
                          alt="send"
                          className="w-5 h-5 transition-colors duration-200 fill-current text-slate-500 group-hover:text-blue-600"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Visit Indicator */}
              <div className="rounded-xl border border-slate-300 bg-[#f1f5f9] p-5">
                <h2 className="text-2xl font-bold text-[#0f172a] tracking-wide mb-4">
                  Property Visit Indicator
                </h2>

                <div className="relative h-[180px] w-full overflow-hidden">
                  {visitIndicatorData.map((slide) => (
                    <UserVisitIndicatorCard slide={slide} key={slide.id} />
                    
                  ))}
                </div>
              </div>
            </div>

            {/* chatbox */}
            <div
              style={{
                backgroundImage: "linear-gradient(to right, #3558A3, #14213D)",
              }}
              className="lg:col-span-5 rounded-2xl border border-[#1b2a4a]/30 flex flex-col justify-between min-h-[460px]"
            >
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #14213D, #4E638F, #14213D)",
                }}
                className="text-xl p-5 rounded-t-2xl font-bold text-white tracking-wide border-b border-white"
              >
                <h2> Chat Room</h2>
              </div>
              <div className="text-xl p-5 rounded-b-2xl font-bold text-white tracking-wide">
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <img
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                      src={userMyInquiriesCR1}
                      alt="userMyInquiriesCR1"
                    />
                    <div className="flex flex-col gap-1 w-full max-w-[260px]">
                      <span className="text-xs font-semibold">User</span>
                      <div className="bg-emerald-100 text-slate-800 p-3 rounded-2xl rounded-tl-none font-medium leading-relaxed">
                        Hello, I am Arijit looking for a flat
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex flex-col gap-1 w-full max-w-[260px] text-right items-end">
                      <span className="text-xs font-semibold">Agent</span>
                      <div className="bg-cyan-100 text-slate-800 p-3 rounded-2xl rounded-tr-none font-medium leading-relaxed flex items-center gap-1">
                        What's ur budget?
                      </div>
                    </div>
                    <img
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                      src={userMyInquiriesCR2}
                      alt="userMyInquiriesCR2"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <img
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                      src={userMyInquiriesCR3}
                      alt="userMyInquiriesCR3"
                    />
                    <div className="flex flex-col gap-1 w-full max-w-[280px]">
                      <span className="text-xs font-semibold">User</span>
                      <div className="bg-emerald-100 text-slate-800 p-3 rounded-2xl rounded-tl-none font-medium leading-relaxed">
                        My budget is under 50 Lakh and I looking near Kavi Subhas
                        Metro Station...
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 relative flex items-center">
                  <span className="absolute left-4 text-slate-400 text-lg cursor-pointer hover:text-slate-200">
                    <i className="fa-regular fa-face-smile"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Message...."
                    className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm pl-11 pr-12 py-3 rounded-full outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-4 text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center">
                    <img
                      src={send}
                      alt="send"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* recent activity */}
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
    </>
  )
}

export default MyInquiries