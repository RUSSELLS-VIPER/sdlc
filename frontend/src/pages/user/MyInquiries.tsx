
import React, { useState, useEffect, useRef } from "react";
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
import { useAppSeletor } from "../../services/helper/reduxstore";
import { apiService } from "../../services/api.service";

const MyInquiries = () => {
    const authState = useAppSeletor((state) => state.auth);
    const currentUserId = authState.user?.id;
    const getProfilePicUrl = (pic: any) => {
        if (!pic) return "https://randomuser.me/api/portraits/thumb/neutral.jpg";
        if (typeof pic === "string") return pic;
        return `data:${pic.contentType};base64,${pic.data}`;
    };
    const currentUserPic = getProfilePicUrl(authState.user?.profilePic);

    const [contacts, setContacts] = useState<any[]>([]);
    const [selectedContactId, setSelectedContactId] = useState<string>("");
    const [searchContactQuery, setSearchContactQuery] = useState<string>("");
    const [timeline, setTimeline] = useState<Record<string, any[]>>({});
    const [messageText, setMessageText] = useState<string>("");
    const [chattingUser, setChattingUser] = useState<any | null>(null);

    const chatBottomRef = useRef<HTMLDivElement | null>(null);

    const fetchContacts = async (query = "") => {
        try {
            const res = await apiService.chat.search(query);
            setContacts(res.data || []);
        } catch (e) {
            console.error("Error fetching contacts:", e);
        }
    };

    const fetchChatHistory = async (userId: string) => {
        if (!userId) return;
        try {
            const res = await apiService.chat.history(userId);
            setTimeline(res.data?.timeline || {});
            setChattingUser(res.data?.userContext || null);
        } catch (e) {
            console.error("Error fetching history:", e);
        }
    };

    useEffect(() => {
        fetchContacts(searchContactQuery);
    }, [searchContactQuery]);

    useEffect(() => {
        if (!selectedContactId) {
            setTimeline({});
            setChattingUser(null);
            return;
        }
        fetchChatHistory(selectedContactId);

        const interval = setInterval(() => {
            fetchChatHistory(selectedContactId);
        }, 3000);

        return () => clearInterval(interval);
    }, [selectedContactId]);

    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [timeline]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedContactId || !messageText.trim()) return;
        try {
            const text = messageText.trim();
            setMessageText("");
            await apiService.chat.send(selectedContactId, text);
            await fetchChatHistory(selectedContactId);
        } catch (e) {
            console.error("Error sending message:", e);
        }
    };
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
              className="lg:col-span-5 rounded-2xl border border-[#1b2a4a]/30 flex flex-col justify-between min-h-[500px]"
            >
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #14213D, #4E638F, #14213D)",
                }}
                className="text-xl p-4 rounded-t-2xl font-bold text-white tracking-wide border-b border-white/20 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h2>Chat Room</h2>
                  {chattingUser && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-normal">
                      Active
                    </span>
                  )}
                </div>

                {/* Live Search & Selector for Agents/Admins */}
                <div className="flex flex-col gap-1.5 text-xs font-normal text-slate-300">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Agent / Admin..."
                      value={searchContactQuery}
                      onChange={(e) => setSearchContactQuery(e.target.value)}
                      className="w-full bg-slate-950/40 text-white placeholder-slate-400 border border-white/10 rounded-lg py-2 pl-8 pr-3 outline-none focus:border-white/30"
                    />
                    <span className="absolute left-2.5 top-2.5 text-slate-400">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>

                  <select
                    value={selectedContactId}
                    onChange={(e) => setSelectedContactId(e.target.value)}
                    className="w-full bg-[#1b2a4a] text-white border border-white/10 rounded-lg p-2 outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">-- Select Agent / Admin to Chat --</option>
                    {contacts.map((contact) => (
                      <option key={contact._id} value={contact._id}>
                        {contact.name} ({contact.role === "admin" ? "Admin" : "Agent"})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Scrollable Conversation Stream */}
              <div className="flex-1 flex flex-col p-4 overflow-hidden relative">
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 h-[280px] text-white">
                  {!selectedContactId ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-300 text-xs sm:text-sm p-4 font-normal leading-relaxed">
                      <i className="far fa-comments text-3xl mb-2 text-slate-400"></i>
                      Select an Agent or Admin from the list above to view conversation history.
                    </div>
                  ) : Object.keys(timeline).length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs p-4 font-normal">
                      No message history found. Start the conversation below!
                    </div>
                  ) : (
                    Object.keys(timeline).map((dateKey) => (
                      <div key={dateKey} className="space-y-3">
                        <div className="text-center my-2">
                          <span className="bg-slate-950/40 text-slate-300 text-[10px] px-2.5 py-0.5 rounded-full font-semibold border border-white/5">
                            {dateKey}
                          </span>
                        </div>
                        {timeline[dateKey].map((msg: any) => {
                          const isMe = msg.senderId === currentUserId;
                          return (
                            <div
                              key={msg._id}
                              className={`flex items-start gap-2.5 ${isMe ? "justify-end" : ""}`}
                            >
                              {!isMe && (
                                <img
                                  className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
                                  src={getProfilePicUrl(chattingUser?.profilePic)}
                                  alt="Avatar"
                                />
                              )}
                              <div
                                className={`flex flex-col gap-0.5 w-full max-w-[240px] ${
                                  isMe ? "text-right items-end" : ""
                                }`}
                              >
                                <span className="text-[10px] text-slate-400 font-semibold px-1">
                                  {isMe ? "Me" : chattingUser?.name}
                                </span>
                                <div
                                  className={`p-3 rounded-2xl text-slate-800 font-medium text-xs sm:text-sm leading-relaxed shadow-sm ${
                                    isMe
                                      ? "bg-cyan-100 rounded-tr-none"
                                      : "bg-emerald-100 rounded-tl-none"
                                  }`}
                                >
                                  {msg.messageText}
                                  <div className="text-[9px] text-slate-500 mt-1 font-normal text-right">
                                    {msg.timeLabel}
                                  </div>
                                </div>
                              </div>
                              {isMe && (
                                <img
                                  className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
                                  src={currentUserPic || "https://randomuser.me/api/portraits/thumb/neutral.jpg"}
                                  alt="Avatar"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Bottom Input Area */}
                <form onSubmit={handleSendMessage} className="mt-4 relative flex items-center shrink-0">
                  <span className="absolute left-4 text-slate-400 text-lg cursor-pointer hover:text-slate-200">
                    <i className="fa-regular fa-face-smile"></i>
                  </span>
                  <input
                    type="text"
                    placeholder={selectedContactId ? "Message...." : "Select a contact first"}
                    disabled={!selectedContactId}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm pl-11 pr-12 py-3 rounded-full outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100/50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={!selectedContactId || !messageText.trim()}
                    className="absolute right-4 text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img src={send} alt="send" className="w-5 h-5" />
                  </button>
                </form>
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