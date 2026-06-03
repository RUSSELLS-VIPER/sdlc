import React from "react";
import { NavLink } from "react-router-dom";
import type { UserAgentListDataProps } from "../../../type/interface/userDashboard/userDashboard.interface";

const UserAgentListData:React.FC<UserAgentListDataProps> = ({ agent }) => {
  return (
    <>
      <div
        key={agent.id}
        className="grid grid-cols-6 gap-2 p-4 text-xs md:text-sm items-center hover:bg-white/5 transition-colors"
      >
        <div className="text-slate-300">
          {agent.id}. {agent.name}
        </div>
        <div className="text-slate-400">{agent.location}</div>
        <div className={`${agent.statusColor} font-medium`}>
          {agent.visitStatus}
        </div>
        <div className="text-slate-400 tabular-nums">{agent.date}</div>
        <div
          className={
            agent.visitStatus === "Done" ? "text-emerald-400" : "text-amber-500"
          }
        >
          {agent.bhk}
        </div>
        <div className="text-right">
          <NavLink
            to={agent.downloadLink}
            className={`${agent.statusColor} hover:underline`}
          >
            Download
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserAgentListData;
