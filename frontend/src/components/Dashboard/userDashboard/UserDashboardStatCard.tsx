import { NavLink } from "react-router-dom";
import type { UserDashboardStatCardProps } from "../../../type/interface/userDashboard/userDashboard.interface";



const UserDashboardStatCard: React.FC<UserDashboardStatCardProps> = ({
  stat,
}) => {
  return (
    <>
      <div
        key={stat.id}
        className="rounded-2xl p-4 flex justify-between items-center text-white min-h-[150px]"
        style={{
          background: "linear-gradient(180deg, #14213D 0%, #3558A3 100%)",
        }}
      >
        <div>
          <p className="text-sm font-semibold text-white">{stat.title}</p>
          <h3 className="text-4xl md:text-5xl font-semibold mt-3 font-sans tracking-tight">
            {stat.value}
          </h3>
          <NavLink
            to={stat.linkTo}
            className="text-sm underline underline-offset-4 tracking-wide text-blue-100 hover:text-white transition-colors"
          >
            {stat.linkText}
          </NavLink>
        </div>
        <div className="flex justify-between items-end mt-4">
          <img
            src={stat.imgSrc}
            alt={stat.imgAlt}
            className="w-14 h-14 text-white"
          />
        </div>
      </div>
    </>
  );
};

export default UserDashboardStatCard;
