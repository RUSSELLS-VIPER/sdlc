import React, { useState, useEffect, useRef } from "react";
import { useAppSeletor } from "../../services/helper/reduxstore";
import { apiService } from "../../services/api.service";
import agent1 from "../../assets/images/agent-dashboard-images/agent-1.jpg";

interface AgentHeaderProps {
  title: string;
}

const AgentHeader: React.FC<AgentHeaderProps> = ({ title }) => {
  const currentUser = useAppSeletor((state) => state.auth.user);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const res = await apiService.users.getMyNotifications();
      if (res.data?.success) {
        setNotifications(res.data.notifications || []);
      }
    } catch (e) {
      console.error("Error fetching notifications in AgentHeader:", e);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      await apiService.users.markAllNotificationsAsRead();
      await fetchNotifications();
    } catch (e) {
      console.error("Error marking all as read:", e);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiService.users.markNotificationAsRead(id);
      await fetchNotifications();
    } catch (e) {
      console.error("Error marking notification as read:", e);
    }
  };

  const arrayBufferToBase64 = (arr: number[]): string => {
    let binary = "";
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(arr[i]);
    }
    return btoa(binary);
  };

  const getProfileImage = () => {
    const profilePic = currentUser?.profilePic;
    if (!profilePic) return agent1;
    if (typeof profilePic === "string") return profilePic;

    const contentType = profilePic.contentType;
    const imageData = profilePic.data;

    if (imageData && typeof imageData === "object" && "$binary" in imageData) {
      const embeddedBase64 = (imageData as any).$binary?.base64;
      if (embeddedBase64) {
        return `data:${contentType};base64,${embeddedBase64}`;
      }
    } else if (
      imageData &&
      typeof imageData === "object" &&
      "type" in imageData &&
      (imageData as any).type === "Buffer" &&
      Array.isArray((imageData as any).data)
    ) {
      try {
        const base64String = arrayBufferToBase64((imageData as any).data);
        return `data:${contentType};base64,${base64String}`;
      } catch (error) {
        console.error("Error processing buffer-shaped profile picture in header:", error);
      }
    } else if (Array.isArray(imageData)) {
      try {
        const base64String = arrayBufferToBase64(imageData);
        return `data:${contentType};base64,${base64String}`;
      } catch (error) {
        console.error("Error processing profile picture buffer in header:", error);
      }
    }
    return agent1;
  };

  const formatNotificationTime = (createdAtString: string): string => {
    const createdDate = new Date(createdAtString);
    const diffMs = Date.now() - createdDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return "Just Now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${diffDay}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "ROLE_CHANGED":
        return { iconClass: "fa-solid fa-user-gear", bgClass: "bg-blue-100 text-blue-500" };
      case "USER_ROLE_CHANGED":
        return { iconClass: "fa-solid fa-users-cog", bgClass: "bg-purple-100 text-purple-500" };
      case "BUY_REQUEST_PENDING":
        return { iconClass: "fa-regular fa-clock", bgClass: "bg-amber-100 text-amber-500" };
      case "BUY_REQUEST_RECEIVED":
        return { iconClass: "fa-regular fa-envelope-open", bgClass: "bg-purple-100 text-purple-500" };
      case "PROPERTY_APPROVED":
        return { iconClass: "fa-solid fa-house-circle-check", bgClass: "bg-emerald-100 text-emerald-500" };
      default:
        return { iconClass: "fa-regular fa-bell", bgClass: "bg-gray-100 text-gray-500" };
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 bg-[#f4f7f6] py-2 mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#161a2b] truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4 bg-white/50 backdrop-blur-sm p-1.5 rounded-full shadow-sm shrink-0 relative">
        <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
          <i className="fas fa-search"></i>
        </button>

        {/* Bell Button and Dropdown Anchor */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition relative focus:outline-none"
          >
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#f4f7f6]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 flex flex-col max-h-[400px]">
              <div className="px-4 pb-2 border-b border-gray-100 flex justify-between items-center shrink-0">
                <span className="font-bold text-gray-900 text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Scrollable Notifications list */}
              <div className="overflow-y-auto flex-1 custom-scrollbar min-h-0">
                {notifications.length === 0 ? (
                  <div className="py-8 px-4 text-center flex flex-col items-center">
                    <i className="far fa-bell-slash text-gray-300 text-3xl mb-2"></i>
                    <span className="text-xs font-medium text-gray-400">No notifications yet</span>
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const iconStyle = getNotificationIcon(notif.type);
                    return (
                      <div
                        key={notif._id}
                        onClick={() => handleMarkAsRead(notif._id)}
                        className={`px-4 py-3 flex gap-3 cursor-pointer hover:bg-gray-50 border-b border-gray-50/50 last:border-0 transition-colors ${
                          !notif.isRead ? "bg-blue-50/20" : ""
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${iconStyle.bgClass}`}>
                          <i className={`text-xs ${iconStyle.iconClass}`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-1">
                            <h4 className={`text-xs font-bold truncate ${!notif.isRead ? "text-gray-950" : "text-gray-800"}`}>
                              {notif.title || "Notification"}
                            </h4>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap">
                              {formatNotificationTime(notif.createdAt)}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                            {notif.messageText || ""}
                          </p>
                        </div>
                        {!notif.isRead && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <img
          src={getProfileImage()}
          alt="User Profile"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-gray-200 cursor-pointer ml-1"
        />
      </div>
    </header>
  );
};

export default AgentHeader;
