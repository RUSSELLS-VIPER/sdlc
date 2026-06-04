import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
}

const StatCard = ({ title, value, Icon }: StatCardProps) => {
  return (
    <div className="bg-white rounded-2xl px-5 py-5 flex items-center justify-between shadow-sm">
      <div className="min-w-0">
        <p className="text-xl md:text-[22px] font-semibold text-[#161E54] leading-tight truncate">
          {value}
        </p>

        <p className="text-xs text-slate-400 mt-1 truncate">
          {title}
        </p>
      </div>

      <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 ml-2">
        <Icon size={20} className="text-[#161E54]" />
      </div>
    </div>
  );
};

export default StatCard;