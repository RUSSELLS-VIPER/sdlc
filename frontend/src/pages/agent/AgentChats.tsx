import React, { useState, useEffect, useRef } from 'react';
import { useAppSeletor } from "../../services/helper/reduxstore";
import { apiService } from "../../services/api.service";

const AgentChats: React.FC = () => {
  const authState = useAppSeletor((state) => state.auth);
  const currentUserId = authState.user?.id;
  const getProfilePicUrl = (pic: any) => {
    if (!pic) return "https://randomuser.me/api/portraits/thumb/neutral.jpg";
    if (typeof pic === "string") return pic;
    return `data:${pic.contentType};base64,${pic.data}`;
  };
  const currentUserPic = getProfilePicUrl(authState.user?.profilePic);

  const [contacts, setContacts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedContactId, setSelectedContactId] = useState<string>('');
  const [timeline, setTimeline] = useState<Record<string, any[]>>({});
  const [chattingUser, setChattingUser] = useState<any | null>(null);
  const [messageInputValue, setMessageInputValue] = useState<string>('');

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
    fetchContacts(searchQuery);
  }, [searchQuery]);

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
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [timeline]);

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInputValue(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContactId || !messageInputValue.trim()) return;
    try {
      const text = messageInputValue.trim();
      setMessageInputValue('');
      await apiService.chat.send(selectedContactId, text);
      await fetchChatHistory(selectedContactId);
    } catch (e) {
      console.error("Error sending message:", e);
    }
  };

  return (
    <div className="mx-auto max-w-[1320px] flex flex-col p-4 md:p-6 lg:p-8 min-h-full">
      <h2 className="text-xl font-bold text-[#161a2b] mb-4 shrink-0">Chats</h2>

      <div className="flex-1 flex flex-col-reverse lg:flex-row gap-6 pb-6 overflow-visible lg:overflow-hidden">
        
        {/* Left Side: Threads List Column */}
        <div className="w-full lg:w-[350px] h-[350px] lg:h-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex flex-col shrink-0">
          <div className="relative mb-4 shrink-0">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#161a2b] focus:border-[#161a2b] outline-none transition"
            />
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto pr-1">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => setSelectedContactId(contact._id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer relative transition-colors ${
                  selectedContactId === contact._id ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={getProfilePicUrl(contact.profilePic)}
                    alt={contact.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-gray-800 text-sm flex justify-between items-center">
                    <span>{contact.name}</span>
                    <span className="text-[9px] bg-[#161a2b]/10 text-[#161a2b] px-1.5 py-0.5 rounded font-normal capitalize">
                      {contact.role}
                    </span>
                  </p>
                  <p className="text-xs truncate text-gray-400">
                    {contact.latestMessageText || "No chats yet"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Primary Active Workspace Window Grid */}
        <div className="w-full lg:flex-1 h-[570px] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
          
          {selectedContactId && chattingUser ? (
            <>
              {/* Header Action Row inside Window pane */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={getProfilePicUrl(chattingUser.profilePic)}
                      alt={chattingUser.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      <span>{chattingUser.name}</span>
                      <span className="text-[10px] bg-[#161a2b]/10 text-[#161a2b] px-1.5 py-0.5 rounded capitalize">
                        {chattingUser.role}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {chattingUser.locality || "No locality"}, {chattingUser.district || "No district"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <button className="hover:text-[#161a2b] transition text-lg">
                    <i className="fas fa-phone-alt"></i>
                  </button>
                  <button className="hover:text-[#161a2b] transition text-lg">
                    <i className="fas fa-video"></i>
                  </button>
                </div>
              </div>

              {/* Active Conversational Feed Area Layout */}
              <div className="flex-1 p-4 overflow-y-auto bg-white space-y-6">
                {Object.keys(timeline).length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 text-sm">
                    No message history yet. Start the conversation!
                  </div>
                ) : (
                  Object.keys(timeline).map((dateKey) => (
                    <div key={dateKey} className="space-y-4">
                      <div className="text-center my-2">
                        <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full font-semibold border border-gray-200">
                          {dateKey}
                        </span>
                      </div>
                      {timeline[dateKey].map((message) => {
                        const isMe = message.senderId === currentUserId;
                        
                        if (!isMe) {
                          return (
                            <div key={message._id} className="flex flex-col items-start gap-1">
                              <div className="w-full max-w-[90%] md:max-w-xl bg-gray-100 text-gray-800 p-4 rounded-xl rounded-tl-sm text-sm border border-gray-200/50">
                                {message.messageText}
                              </div>
                              <div className="w-full max-w-[90%] md:max-w-xl flex justify-start items-center gap-2 mt-1">
                                <span className="text-[10px] text-gray-400 font-semibold">{chattingUser.name}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-400">{message.timeLabel}</span>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={message._id} className="flex flex-col items-end gap-1">
                              <div className="w-full max-w-[90%] md:max-w-xl bg-[#161a2b] text-white p-4 rounded-xl rounded-tr-sm text-sm">
                                {message.messageText}
                              </div>
                              <div className="w-full max-w-[90%] md:max-w-xl flex justify-end items-center gap-2 mt-1">
                                <span className="text-xs text-gray-400">{message.timeLabel}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-[10px] text-gray-400 font-semibold">Me</span>
                                <div className="relative shrink-0">
                                  <img
                                    src={currentUserPic || "https://randomuser.me/api/portraits/thumb/neutral.jpg"}
                                    alt="My Avatar"
                                    className="w-5 h-5 rounded-md object-cover"
                                  />
                                  <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  ))
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Form Control Actions Input Field Area */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 shrink-0">
                <div className="border border-gray-300 rounded-xl p-1.5 md:p-2 flex items-center gap-2 bg-white">
                  <button type="button" className="p-2 text-gray-400 hover:text-indigo-600 transition">
                    <i className="fas fa-chart-bar"></i>
                  </button>
                  <input
                    type="text"
                    value={messageInputValue}
                    onChange={handleMessageInputChange}
                    placeholder="Type something..."
                    className="flex-1 bg-transparent text-sm text-gray-800 outline-none px-2 min-w-0"
                  />
                  <div className="flex items-center gap-1 md:gap-2">
                    <button type="submit" disabled={!messageInputValue.trim()} className="p-2 text-[#161a2b] hover:text-blue-600 transition disabled:opacity-50">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                    <button type="button" className="p-2 text-gray-500 hover:text-gray-700 transition hidden sm:block">
                      <i className="far fa-image"></i>
                    </button>
                    <button type="button" className="p-2 text-gray-500 hover:text-gray-700 transition hidden sm:block">
                      <i className="far fa-smile"></i>
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <i className="far fa-comments text-5xl mb-3"></i>
              <p className="text-base font-semibold text-gray-700">No active conversation</p>
              <p className="text-sm mt-1">Select a contact from the left list to start chatting.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AgentChats;