import type { CalendarDay } from "../../../type/interface/AdminDashboard/AdminDashboard.interface";

interface Props {
  dayData: CalendarDay;
}

const CalendarDayCell = ({ dayData }: Props) => {
  return (
    <div className="relative h-[100px] border-b border-r border-[#a7a7a7]">
      <span
        className={`absolute right-3 top-2 text-[18px] ${
          !dayData.isCurrentMonth ? "text-[#adadad]" : ""
        }`}
      >
        {dayData.day}
      </span>

      {dayData.event && (
        <div
          className={`absolute left-1 top-[38px] flex h-[42px] w-[90%] items-center rounded-md pl-4 text-[16px] font-medium ${
            dayData.event.type === "event"
              ? "bg-[#c4e9ad] text-[#65bc24]"
              : "bg-[#f5a0ce] text-[#ef2f99]"
          }`}
        >
          <span
            className={`absolute left-1 top-2 h-7 w-1 rounded-full ${
              dayData.event.type === "event"
                ? "bg-[#65bc24]"
                : "bg-[#ef2f99]"
            }`}
          />
          {dayData.event.title}
        </div>
      )}
    </div>
  );
};

export default CalendarDayCell;