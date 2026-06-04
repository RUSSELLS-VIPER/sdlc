import React, { useState } from 'react';
import chatPerson1 from '../../assets/images/agent-dashboard-images/chat-person-1.jpg';
import chatPerson2 from '../../assets/images/agent-dashboard-images/chat-person-2.jpg';
import chatPerson3 from '../../assets/images/agent-dashboard-images/chat-person-3.jpg';
import chatPerson4 from '../../assets/images/agent-dashboard-images/chat-person-4.jpg';
import chatPerson5 from '../../assets/images/agent-dashboard-images/chat-person-5.png';


// --- Type Definitions & Contracts ---
export interface ActiveUserStatus {
  isOnline: boolean;
  lastSeenText: string;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatarUrl: string;
  status: ActiveUserStatus;
  latestMessageSnippet: string;
}

export interface MessageNode {
  id: string;
  senderId: 'current-agent' | string; 
  text: string;
  timestamp: string;
  senderAvatarUrl?: string;
  showSenderStatusRing?: boolean;
}

const AgentChats: React.FC = () => {
  const [chatThreads] = useState<ChatParticipant[]>([
    {
      id: 'user-sabuj',
      name: 'Sabuj Bera',
      avatarUrl: chatPerson1,
      status: { isOnline: true, lastSeenText: 'Last seen 2hr' },
      latestMessageSnippet: 'Hello, how are you?',
    },
    {
      id: 'user-snehas',
      name: 'Snehas Roy',
      avatarUrl: chatPerson2,
      status: { isOnline: true, lastSeenText: 'Online' },
      latestMessageSnippet: 'No further questions.',
    },
    {
      id: 'user-suraj',
      name: 'Suraj Sing',
      avatarUrl: chatPerson3,
      status: { isOnline: false, lastSeenText: 'Last seen 5hr' },
      latestMessageSnippet: 'I will share the meeting minutes...',
    },
    {
      id: 'user-anu',
      name: 'Anu Paul',
      avatarUrl: chatPerson4,
      status: { isOnline: false, lastSeenText: 'Last seen 1d' },
      latestMessageSnippet: 'Sure I can help with ...',
    },
    {
      id: 'user-sabuj-dup-1',
      name: 'Sabuj Bera',
      avatarUrl: chatPerson5,
      status: { isOnline: true, lastSeenText: 'Last seen 2hr' },
      latestMessageSnippet: 'Hello, how are you?',
    },
    {
      id: 'user-snehas-dup-1',
      name: 'Snehas Roy',
      avatarUrl: chatPerson3,
      status: { isOnline: true, lastSeenText: 'Online' },
      latestMessageSnippet: 'No further questions.',
    },
    {
      id: 'user-suraj-dup-1',
      name: 'Suraj Sing',
      avatarUrl: chatPerson5,
      status: { isOnline: false, lastSeenText: 'Last seen 5hr' },
      latestMessageSnippet: 'I will share the meeting minutes...',
    },
    {
      id: 'user-anu-dup-1',
      name: 'Anu Paul',
      avatarUrl: chatPerson4,
      status: { isOnline: false, lastSeenText: 'Last seen 1d' },
      latestMessageSnippet: 'Sure I can help with ...',
    },
  ]);

  const [activeConversation] = useState<MessageNode[]>(
    [
      {
        id: 'msg-rec-1',
        senderId: 'user-sabuj',
        text: "We need a new website that allows users to create accounts, browse products, and make purchases. Can you provide a rough timeline and cost estimate?",
        timestamp: 'Today, 9:59 AM',
        senderAvatarUrl: chatPerson1
      },
      {
        id: 'msg-sent-1',
        senderId: 'current-agent',
        text: "Sure, we can help with that. To provide an accurate estimate, we'll need more details on the features you want. Let's schedule a call this week to discuss the specifics, such as the types of products, payment methods, and any design preferences",
        timestamp: 'Today, 9:59 AM',
        senderAvatarUrl: chatPerson5,
        showSenderStatusRing: true
      }
    ]
  );

  const [messageInputValue, setMessageInputValue] = useState<string>('');

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInputValue(e.target.value);
  };

  return (
    <div className="mx-auto max-w-[1320px] flex flex-col p-4 md:p-6 lg:p-8 min-h-full">
      <h2 className="text-xl font-bold text-[#161a2b] mb-4 shrink-0">Default</h2>

      <div className="flex-1 flex flex-col-reverse lg:flex-row gap-6 pb-6 overflow-visible lg:overflow-hidden">
        
        {/* Left Side: Threads List Column */}
        <div className="w-full lg:w-[350px] h-[350px] lg:h-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex flex-col shrink-0">
          <div className="relative mb-4 shrink-0">
            <input
              type="text"
              placeholder="Search for..."
              className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#161a2b] focus:border-[#161a2b] outline-none transition"
            />
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto pr-1">
            {chatThreads.map((thread, index) => (
              <div
                key={thread.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer relative ${
                  index !== 0 ? 'hover:bg-gray-50 transition-colors' : ''
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={thread.avatarUrl}
                    alt={thread.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  {thread.status.isOnline && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-gray-800 text-sm">{thread.name}</p>
                  <p className={`text-xs truncate ${index === 0 ? 'text-gray-500' : 'text-gray-400'}`}>
                    {thread.latestMessageSnippet}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Primary Active Workspace Window Grid */}
        <div className="w-full lg:flex-1 h-[570px] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
          
          {/* Header Action Row inside Window pane */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={chatPerson1}
                  alt="Sabuj Bera"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Sabuj Bera</p>
                <p className="text-xs text-gray-500">Last seen 2hr</p>
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
            {activeConversation.map((message) => {
              const isAgent = message.senderId === 'current-agent';
              
              if (!isAgent) {
                return (
                  <React.Fragment key={message.id}>
                    <div className="flex flex-col items-end gap-1">
                      <div className="w-full max-w-[90%] md:max-w-xl bg-[#dcdfe3] text-gray-800 p-4 rounded-xl rounded-tr-sm text-sm">
                        {message.text}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {message.senderAvatarUrl && (
                        <img
                          src={message.senderAvatarUrl}
                          alt="Sender Avatar"
                          className="w-6 h-6 rounded-md object-cover shrink-0"
                        />
                      )}
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                  </React.Fragment>
                );
              } else {
                return (
                  <div key={message.id} className="flex flex-col items-start gap-1">
                    <div className="w-full max-w-[90%] md:max-w-xl bg-[#dcdfe3] text-gray-800 p-4 rounded-xl rounded-tl-sm text-sm">
                      {message.text}
                    </div>
                    <div className="w-full max-w-[90%] md:max-w-xl flex justify-end items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      <div className="relative shrink-0">
                        {message.senderAvatarUrl && (
                          <img
                            src={message.senderAvatarUrl}
                            alt="Agent Avatar"
                            className="w-5 h-5 rounded-md object-cover"
                          />
                        )}
                        {message.showSenderStatusRing && (
                          <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Chat Form Control Actions Input Field Area */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="border border-gray-300 rounded-xl p-1.5 md:p-2 flex items-center gap-2 bg-white">
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition">
                <i className="fas fa-chart-bar"></i>
              </button>
              <input
                type="text"
                value={messageInputValue}
                onChange={handleMessageInputChange}
                placeholder="Type something"
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none px-2 min-w-0"
              />
              <div className="flex items-center gap-1 md:gap-2">
                <button className="p-2 text-green-500 hover:text-green-600 transition">
                  <i className="fas fa-paper-plane"></i>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition hidden sm:block">
                  <i className="far fa-image"></i>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition hidden sm:block">
                  <i className="far fa-smile"></i>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgentChats;