import React, { useState, useEffect } from "react";
import UserNotificationsData from "../../components/Dashboard/userDashboard/UserNotificationsData";
import type { NotificationsData } from "../../type/interface/userDashboard/userDashboard.interface";
import { apiService } from "../../services/api.service";

const Notification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeTabId, setActiveTabId] = useState<number>(1);

  const filterTabs = [
    { id: 1, label: "All Notifications", iconClass: "fa-regular fa-bell" },
    { id: 2, label: "Unread", iconClass: "fa-regular fa-comment" },
    { id: 3, label: "New Leads", iconClass: "fa-solid fa-user-plus" },
    { id: 4, label: "Messages", iconClass: "fa-regular fa-envelope" },
    { id: 5, label: "Appointments", iconClass: "fa-regular fa-calendar" },
    { id: 6, label: "Property Alerts", iconClass: "fa-regular fa-house" },
  ];

  const fetchNotifications = async () => {
    try {
      const res = await apiService.users.getMyNotifications();
      if (res.data?.success) {
        setNotifications(res.data.notifications || []);
      }
    } catch (e) {
      console.error("Error fetching notifications:", e);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiService.users.markNotificationAsRead(id);
      await fetchNotifications();
    } catch (e) {
      console.error("Error marking notification as read:", e);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await apiService.users.markAllNotificationsAsRead();
      await fetchNotifications();
    } catch (e) {
      console.error("Error marking all notifications as read:", e);
    }
  };

  const formatNotificationTime = (createdAtString: string): string => {
    const createdDate = new Date(createdAtString);
    const diffMs = Date.now() - createdDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return "Just Now";
    if (diffMin < 60) return `${diffMin} Min Ago`;
    if (diffHr < 24) return `${diffHr} Hr${diffHr > 1 ? 's' : ''} Ago`;
    return `${diffDay} Day${diffDay > 1 ? 's' : ''} Ago`;
  };

  const mapDbNotification = (dbNotif: any): NotificationsData => {
    let iconClass = "fa-regular fa-bell";
    let iconBgClass = "bg-blue-100 text-blue-500";

    switch (dbNotif.type) {
      case "ROLE_CHANGED":
        iconClass = "fa-solid fa-user-gear";
        iconBgClass = "bg-blue-100 text-blue-500";
        break;
      case "USER_ROLE_CHANGED":
        iconClass = "fa-solid fa-users-cog";
        iconBgClass = "bg-purple-100 text-purple-500";
        break;
      case "BUY_REQUEST_PENDING":
        iconClass = "fa-regular fa-clock";
        iconBgClass = "bg-amber-100 text-amber-500";
        break;
      case "BUY_REQUEST_RECEIVED":
        iconClass = "fa-regular fa-envelope-open";
        iconBgClass = "bg-purple-100 text-purple-500";
        break;
      case "PROPERTY_APPROVED":
        iconClass = "fa-solid fa-house-circle-check";
        iconBgClass = "bg-emerald-100 text-emerald-500";
        break;
    }

    return {
      id: dbNotif._id,
      title: dbNotif.title || "Notification",
      description: dbNotif.messageText || "",
      time: formatNotificationTime(dbNotif.createdAt),
      isUnread: !dbNotif.isRead,
      iconClass,
      iconBgClass
    };
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTabId === 1) return true;
    if (activeTabId === 2) return !notif.isRead;
    if (activeTabId === 3) return notif.type === "BUY_REQUEST_RECEIVED";
    if (activeTabId === 4) return notif.type === "ROLE_CHANGED" || notif.type === "USER_ROLE_CHANGED";
    if (activeTabId === 5) return false;
    if (activeTabId === 6) return notif.type === "PROPERTY_APPROVED" || notif.type === "BUY_REQUEST_PENDING";
    return true;
  });

  return (
    <>
      <section>
        <div className="w-full mx-auto antialiased">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Filter Actions Sidebar Container */}
            <div className="lg:col-span-4 flex overflow-x-auto lg:overflow-x-visible lg:flex-col gap-4 pb-4 lg:pb-0 scrollbar-none lg:sticky lg:top-8">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex justify-start items-center gap-4 shrink-0 px-6 py-4 rounded-2xl text-base md:text-lg font-bold tracking-wide lg:w-full transition-all duration-300 border ${
                    activeTabId === tab.id
                      ? "bg-[#fca311] border-[#fca311] text-slate-900 shadow-md"
                      : "bg-white border-[#fca311]/80 text-[#14213D] hover:bg-[#fca311]/10"
                  }`}
                >
                  <i className={`${tab.iconClass} text-xl w-6 text-center`}></i>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right Notifications Cards List Scroller */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h3 className="font-bold text-gray-800 text-lg">
                  {filterTabs.find(t => t.id === activeTabId)?.label || "Notifications"}
                </h3>
                {notifications.some(n => !n.isRead) && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs bg-[#fca311] hover:bg-[#e0920f] text-slate-900 font-bold px-4 py-2 rounded-xl transition shadow-sm"
                  >
                    <i className="fa-solid fa-check-double mr-1.5"></i>
                    Mark All as Read
                  </button>
                )}
              </div>

              <div className="max-h-[680px] overflow-y-auto pr-3 space-y-4 overflow-auto scrollbar-thin">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm bg-white border border-slate-200 rounded-2xl">
                    <i className="far fa-bell-slash text-4xl mb-2"></i>
                    <p>No notifications found in this category.</p>
                  </div>
                ) : (
                  filteredNotifications.map((notif) => {
                    const mapped = mapDbNotification(notif);
                    return (
                      <UserNotificationsData
                        key={mapped.id}
                        notification={mapped}
                        onClick={notif.isRead ? undefined : () => handleMarkAsRead(mapped.id)}
                      />
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Notification;