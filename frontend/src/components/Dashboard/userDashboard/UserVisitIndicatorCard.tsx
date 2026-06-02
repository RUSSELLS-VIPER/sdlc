import type React from "react";
import mapPin from "../../../assets/images/userDashboardImages/map-pin.svg";
import type { UserVisitIndicatorCardProps } from "../../../type/interface/userDashboard/userDashboard.interface";
const UserVisitIndicatorCard: React.FC<UserVisitIndicatorCardProps> = ({ slide }) => {
  return (
    <>
      <div key={slide.id} className={slide.slideClassName}>
        <div className="flex items-center gap-6 xl:gap-10">
          <img
            src={slide.imageSrc}
            alt={`pvi${slide.id}`}
            className="w-28 h-20 xl:w-32 xl:h-24 object-cover rounded-xl border border-slate-200"
          />
          <div className="space-y-1">
            <h3 className="text-base xl:text-lg font-bold text-slate-900">
              {slide.title}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <img
                src={mapPin}
                alt="map-pin"
                className="w-3.5 h-3.5 text-slate-400"
              />
              {slide.location}
            </p>
            <div className="text-xs font-semibold text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded w-max">
              {slide.bhk}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between xl:justify-end gap-6 xl:gap-10">
          <div className="text-xs">
            <p className="text-slate-400 font-medium">Agent Details</p>
            <p className="font-bold text-slate-800">{slide.agentName}</p>
          </div>
          <button className="px-4 py-1.5 border border-slate-400 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white hover:border-slate-600 transition-all">
            Contact
          </button>
          <div className="relative w-14 h-14 xl:w-16 xl:h-16 flex items-center justify-center rounded-full border-[6px] border-green-500 shrink-0">
            <span className="text-[10px] text-center leading-3 text-slate-800 max-w-[50px] block">
              {slide.visitText}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserVisitIndicatorCard;
