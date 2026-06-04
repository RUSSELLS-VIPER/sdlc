import React from "react";
import type { UserNotificationProps } from "../../../type/interface/userDashboard/userDashboard.interface";

interface ExtendedProps extends UserNotificationProps {
  onClick?: () => void;
}

const UserNotificationsData:React.FC<ExtendedProps> = ({ notification, onClick }) => {
  return (
    <>
      <div
        key={notification.id}
        onClick={onClick}
        className={`flex items-center justify-between gap-6 p-6 bg-white border-2 border-slate-500/80 rounded-2xl shadow-sm hover:border-slate-500 transition-colors ${
          onClick ? "cursor-pointer hover:bg-slate-50/50" : ""
        }`}
      >
        <div className="flex items-center gap-5">
          <div
            className={`p-2 rounded-lg shrink-0 scale-110 shadow-sm ${notification.iconBgClass}`}
          >
            <i className={notification.iconClass}></i>
          </div>
          <div>
            <p className="font-[#14213D] text-slate-800 font-semibold md:text-xl capitalize">
              {notification.title}
            </p>
            <p className="text-sm md:text-base text-slate-400 mt-1.5 capitalize font-medium">
              {notification.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs md:text-sm font-bold text-slate-400 tabular-nums capitalize">
            {notification.time}
          </span>
          {notification.isUnread && (
            <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></span>
          )}
        </div>
      </div>
    </>
  );
};

export default UserNotificationsData;
