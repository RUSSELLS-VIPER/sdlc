import { useState } from "react";
import ChatSidebar from "../../components/Dashboard/AdminDashboard/ChatSidebar";
import MessageBubble from "../../components/Dashboard/AdminDashboard/MessageBubble";
import ChatInput from "../../components/Dashboard/AdminDashboard/ChatInput";
import img1 from "../../assets/images/image/Rectangle 82.png";
import img2 from "../../assets/images/image/Rectangle 79 (1).png";
import img3 from "../../assets/images/image/Rectangle 80 (1).png";
import img4 from "../../assets/images/image/Rectangle 82 (6).png";
import img5 from "../../assets/images/image/Rectangle 82.png";
import img6 from "../../assets/images/image/logo_us.png";
import img7 from "../../assets/images/image/logo_us.png";
import img8 from "../../assets/images/image/Ellipse 3 (1).png";
const Chat = () => {
  const users = [
    {
      id: 1,
      name: "Sabuj Bera",
      image: img1,
      lastMessage: "Hello, how are you ?",
      online: true,
      lastSeen: "Last seen 2hr",
    },
    {
      id: 2,
      name: "Snehas Roy",
      image: img2,
      lastMessage: "No further questions.",
      online: true,
      lastSeen: "Last seen 1hr",
    },
    {
      id: 3,
      name: "Anu Paul",
      image:img3,
      lastMessage: "Sure I can help with ...",
      online: true,
      lastSeen: "Last seen 30min",
    },
    {
      id: 4,
      name: "Suraj Sing",
      image: img4,
      lastMessage: "I will share the meeting minutes...",
      online: true,
      lastSeen: "Last seen 10min",
    },
  ];

  const [selectedUser, setSelectedUser] = useState(users[0]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user" as const,
      text: "We need a new website that allows users to create accounts, browse products, and make purchases. Can you provide a rough timeline and cost estimate?",
      time: "Today, 9:59 AM",
      image: img5,
    },
    {
      id: 2,
      sender: "admin" as const,
      text: "Sure, we can help with that. To provide an accurate estimate, we'll need more details on the features you want. Let's schedule a call this week to discuss the specifics, such as the types of products, payment methods, and any design preferences.",
      time: "Today, 9:59 AM",
      image: img6,
    },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now(),
      sender: "admin" as const,
      text,
      time: "Now",
      image: img7,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <main className="app-main lg:ml-[237px] h-screen overflow-y-auto lg:overflow-hidden pb-6 pt-0 hide-scrollbar">
      <section className="mx-auto flex h-full max-w-[1580px] flex-col">
        <div className="sticky top-0 bg-[#eef4fb]/95 backdrop-blur-md z-40 px-4 md:px-[17px] pt-4 pb-2">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                id="toggleSidebar"
                className="lg:hidden p-2 text-[#070b2d] bg-white rounded-full shadow-sm text-lg focus:outline-none cursor-pointer"
              >
                <i className="fa-solid fa-bars"></i>
              </button>

              <h1 className="text-[24px] sm:text-[29px] font-bold leading-none tracking-normal text-ink">
                Chats
              </h1>
            </div>

            <div className="flex items-center gap-3 pr-1">
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8d92a5] text-white cursor-pointer">
                <i className="fa-solid fa-magnifying-glass text-[17px]"></i>
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8d92a5] text-white cursor-pointer">
                <i className="fa-solid fa-comment-dots text-[17px]"></i>
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8d92a5] text-white cursor-pointer">
                <i className="fa-solid fa-bell text-[17px]"></i>
              </button>

              <img
                src={img8}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 px-4 md:px-[17px] mt-4">
          <h2 className="mb-4 text-xl font-bold text-ink">
            Default
          </h2>

          <div className="grid min-h-0 flex-1 gap-[22px] pr-1 grid-cols-1 lg:grid-cols-[275px_minmax(0,1fr)] pb-6 lg:pb-0">

            <ChatSidebar
              users={users}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />

            <section className="flex flex-col overflow-hidden rounded-2xl bg-white h-[450px] lg:h-full min-h-0 shadow-xs">
              <div className="flex h-[61px] shrink-0 items-center justify-between border-b border-[#d0d0d0] px-4 sm:px-6 shadow-[0_3px_4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3">
                  <div className="relative h-[34px] w-[34px]">
                    <img
                      src={selectedUser.image}
                      alt={selectedUser.name}
                      className="h-full w-full rounded-md object-cover"
                    />

                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white bg-[#82d020]"></span>
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-[#1b1b1b]">
                      {selectedUser.name}
                    </p>

                    <p className="text-[12px] text-[#747474]">
                      {selectedUser.lastSeen}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 text-black">
                  <button
                    aria-label="Call"
                    className="hover:text-sidebar transition cursor-pointer"
                  >
                    <i className="fa-solid fa-phone text-[18px] sm:text-[20px]"></i>
                  </button>

                  <button
                    aria-label="Video"
                    className="hover:text-sidebar transition cursor-pointer"
                  >
                    <i className="fa-solid fa-video text-[19px] sm:text-[21px]"></i>
                  </button>
                </div>
              </div>

              <div className="hide-scrollbar flex-1 overflow-y-auto px-4 sm:px-8 py-6 flex flex-col gap-4">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                  />
                ))}
              </div>

              <ChatInput onSend={handleSendMessage} />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Chat;