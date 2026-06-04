import React from 'react'
import type { CalendarDay } from '../../type/interface/AdminDashboard/AdminDashboard.interface';
import CalendarDayCell from '../../components/Dashboard/AdminDashboard/CalendarDaycell';

const Calender = () => {

  

const calendarDays: CalendarDay[] = [
  { day: 1, isCurrentMonth: true },
  { day: 2, isCurrentMonth: true },
  { day: 3, isCurrentMonth: true },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true },
  { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true },

  { day: 8, isCurrentMonth: true },
  { day: 9, isCurrentMonth: true },
  { day: 10, isCurrentMonth: true },
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true },
  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },

  { day: 15, isCurrentMonth: true },
  { day: 16, isCurrentMonth: true },
  { day: 17, isCurrentMonth: true },
  { day: 18, isCurrentMonth: true },

  {
    day: 19,
    isCurrentMonth: true,
    event: {
      title: "Events",
      type: "event",
    },
  },

  { day: 20, isCurrentMonth: true },
  { day: 21, isCurrentMonth: true },

  { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true },
  { day: 24, isCurrentMonth: true },

  {
    day: 25,
    isCurrentMonth: true,
    event: {
      title: "Meeting",
      type: "meeting",
    },
  },

  { day: 26, isCurrentMonth: true },
  { day: 27, isCurrentMonth: true },
  { day: 28, isCurrentMonth: true },

  { day: 29, isCurrentMonth: true },
  { day: 30, isCurrentMonth: true },
  { day: 31, isCurrentMonth: true },

  { day: 1, isCurrentMonth: false },
  { day: 2, isCurrentMonth: false },
  { day: 3, isCurrentMonth: false },
  { day: 4, isCurrentMonth: false },

  { day: 5, isCurrentMonth: false },
  { day: 6, isCurrentMonth: false },
  { day: 7, isCurrentMonth: false },
  { day: 8, isCurrentMonth: false },
  { day: 9, isCurrentMonth: false },
  { day: 10, isCurrentMonth: false },
  { day: 11, isCurrentMonth: false },


];
  const weekDays = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];
 return (
    <section className="mx-auto max-w-[1580px] px-4 md:px-[17px] mt-4">
      <h2 className="mb-3 text-xl font-bold text-ink">Default</h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2.5">
        <button className="rounded-lg bg-[#5cc42a] px-3.5 py-2 text-[14px] sm:text-[16px] font-medium text-white">
          Events
        </button>

        <button className="rounded-lg bg-[#7c82ee] px-3.5 py-2 text-[14px] sm:text-[16px] font-medium text-white">
          Personal
        </button>

        <button className="rounded-lg bg-[#ef2f99] px-3.5 py-2 text-[14px] sm:text-[16px] font-medium text-white">
          Meeting
        </button>

        <button className="rounded-lg bg-[#a821a8] px-3.5 py-2 text-[14px] sm:text-[16px] font-medium text-white">
          Festival Function
        </button>
      </div>

      <section className="rounded-2xl bg-white px-4 sm:px-7 pb-5 pt-[18px]">

        {/* Header */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between sm:grid sm:grid-cols-3 sm:w-full">

            <div>
              <button className="rounded-lg bg-sidebar px-3.5 py-2 text-[16px] sm:text-[18px] font-medium lowercase text-white">
                today
              </button>
            </div>

            <h3 className="text-center text-[16px] sm:text-[18px] font-bold text-[#111] my-2 sm:my-0">
              March 2026
            </h3>

            <div className="flex items-center justify-end gap-4 sm:gap-6">

              <div className="flex h-[34px] overflow-hidden rounded-lg bg-sidebar text-white">
                <button
                  className="flex w-8 items-center justify-center px-3"
                  aria-label="Previous month"
                >
                  <i className="fa-solid fa-chevron-left" />
                </button>

                <button
                  className="flex w-8 items-center justify-center px-3"
                  aria-label="Next month"
                >
                  <i className="fa-solid fa-chevron-right" />
                </button>
              </div>

              <button className="rounded-lg bg-sidebar px-3.5 py-2 text-[16px] sm:text-[18px] font-medium lowercase text-white">
                month
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto hide-scrollbar">
          <div className="min-w-[930px] border-l border-t border-[#a7a7a7]">

            {/* Week Header */}
            <div className="grid grid-cols-7">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="flex h-11 items-center justify-center border-b border-r border-[#a7a7a7] text-[14px] font-bold"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((item, index) => (
                <CalendarDayCell
                  key={`${item.day}-${index}`}
                  dayData={item}
                />
              ))}
            </div>

          </div>
        </div>

      </section>
    </section>
  );
};
export default Calender;