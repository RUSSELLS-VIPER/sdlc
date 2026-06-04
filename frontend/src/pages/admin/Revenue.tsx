import React from 'react'
import type { Transaction } from '../../type/interface/AdminDashboard/AdminDashboard.interface';
import financial from "../../assets/images/image/finance_img.png";
import agent from "../../assets/images/image/Frame 427318246.png"
import revenuetrend from "../../assets/images/image/revenu_img1.png"
import commissiontrend from "../../assets/images/image/revenu_img2.png"
import Commercial from"../../assets/images/image/Rectangle 82 (1).png"
import  house from "../../assets/images/image/Rectangle 80 (1).png"
import villa  from "../../assets/images/image/Rectangle 79 (1).png"
import office from "../../assets/images/image/Rectangle 81 (1).png"
const Revenue=()=>{
const transactions: Transaction[] = [
  {
    id: "CUS 2009",
    name: "Sabuj Bera",
    image: house,
    property: "House",
    amount: "Rs.39,7860",
    status: "Lost",
    date: "Aug 8,2024",
  },
  {
    id: "CUS 2016",
    name: "Snehas Roy",
    image: office,
    property: "Office Space",
    amount: "Rs 78,7668",
    status: "Completed",
    date: "Aug 9,2026",
  },
  {
    id: "CUS 2018",
    name: "Suraj Sing",
    image: villa,
    property: "Villa",
    amount: "Rs.54,7860",
    status: "Failed",
    date: "Sep 7,2020",
  },
  {
    id: "CUS 2020",
    name: "Anu Paul",
    image: Commercial,
    property: "Commercial",
    amount: "Rs.44,7860",
    status: "Completed",
    date: "Jan 9,2018",
  },
];
  return (
    <section className="mx-auto max-w-[1580px] px-4 md:px-[17px] mt-4">
    <div>
       <section className="mb-[18px] rounded-[14px] bg-white px-5 py-6 lg:px-7">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-[22px] font-bold leading-tight text-[#333]">Revenue Analytics</h2>
            <p className="mt-1 text-[14px] font-medium text-[#777]">Overview of monthly revenue performance and commission
              trends.</p>
          </div>
          <div className="relative h-[31px] w-[139px]">
            <select
              className="h-full w-full appearance-none rounded-full border border-ink bg-white pl-8 pr-8 text-[12px] font-medium text-ink outline-none">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-[11px] text-ink"
              aria-hidden="true"></i>
          </div>
        </div>
        <p className="mb-3 text-[14px] font-bold text-ink">Total Enquiries</p>
        <div className="relative h-[274px] overflow-x-auto overflow-y-hidden bg-white hide-scrollbar">
          <div className="min-w-[650px] h-full relative">
            <div
              className="absolute left-0 top-[15px] flex h-[210px] flex-col justify-between text-[15px] font-medium text-ink">
              <span>50</span><span>40</span><span>30</span><span>20</span><span>10</span>
            </div>
            <div className="absolute left-[68px] right-0 top-[22px] h-[205px]">
              <div className="absolute inset-0 flex flex-col justify-between">
                <span className="block border-t border-[#e8c7eb]"></span>
                <span className="block border-t border-[#e8c7eb]"></span>
                <span className="block border-t border-[#e8c7eb]"></span>
                <span className="block border-t border-[#e8c7eb]"></span>
                <span className="block border-t border-[#e8c7eb]"></span>
              </div>
              <img
               src={revenuetrend} alt="Revenue trend line"
                className="absolute inset-x-0 top-[-17px] h-[230px] w-full object-fill" />
               <img src={commissiontrend} alt="Commission trend line"
                className="absolute inset-x-0 bottom-[-7px] h-[146px] w-full object-fill"/> 
              <div
                className="absolute left-[59%] top-[-17px] flex h-[31px] w-[143px] items-center justify-center rounded-full bg-[#03042d] text-[13px] font-medium text-white">
                49 Enquiries
                <span
                  className="absolute bottom-[-8px] h-0 w-0 border-x-[8px] border-t-[9px] border-x-transparent border-t-[#03042d]"></span>
              </div>
            </div>
            <div
              className="absolute bottom-[3px] left-[68px] right-0 grid grid-cols-12 text-center text-[13px] font-medium text-ink">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    {/* //property performance */}
      <section className="mb-6 rounded-[14px] bg-white px-5 py-5">
        <h2 className="mb-5 text-[22px] font-bold text-black">Property Performance</h2>
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 w-full max-w-[760px]">
            <div>
              <p className="text-[23px] font-bold text-black">09:30 am</p>
              <p className="mt-1 text-[14px] font-bold text-[#151515]">APT-101</p>
              <p className="mt-2 text-[13px] font-medium text-[#787878]">Maplewood Residence</p>
            </div>
            <div>
              <p className="text-[23px] font-bold text-black">11:15 am</p>
              <p className="mt-1 text-[14px] font-bold text-[#151515]">APT-205</p>
              <p className="mt-2 text-[13px] font-medium text-[#787878]">Sunset Villas</p>
            </div>
            <div>
              <p className="text-[23px] font-bold text-black">02:00 pm</p>
              <p className="mt-1 text-[14px] font-bold text-[#151515]">APT-312</p>
              <p className="mt-2 text-[13px] font-medium text-[#787878]">Riverside Heights</p>
            </div>
          </div>
          <div className="min-w-[245px] md:self-end text-left md:text-right text-[#777]">
            <button
              className="mb-2 rounded-lg border border-[#56a2ff] px-3 py-1.5 text-[11px] font-medium text-[#378cff]">Recent
              Viewings</button>
            <div className="space-y-1 text-[14px] font-medium">
              <p className="flex items-center md:justify-end gap-2"><i className="fa-solid fa-clock text-[11px] text-[#777]"
                  aria-hidden="true"></i><span>Avg. Duration: 1h 15m</span></p>
              <p className="flex items-center md:justify-end gap-2"><i className="fa-regular fa-user text-[13px] text-black"
                  aria-hidden="true"></i><span>Total Visitors Today: 24</span></p>
            </div>
          </div>
        </div>
      </section>
      //top locations
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <section className="rounded-[14px] bg-white px-5 py-5">
          <h2 className="mb-2 text-[23px] font-bold text-black">Top Locations</h2>
          <div className="h-[189px] overflow-hidden rounded-[14px] bg-[#d8f4e8]">
           <iframe
  title="Top Locations Map"
  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d921768!2d88.3!3d22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1"
  className="h-full w-full border-0"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  allowFullScreen
/>
          </div>
        </section>

        <section className="rounded-[14px] bg-white px-5 py-5">
          <div className="mb-6 flex items-start justify-between">
            <h2 className="text-[23px] font-bold text-black">Top Agents</h2>
            <div className="flex flex-col items-end gap-2">
              <button className="flex h-3 items-center gap-1 text-[#9ca3af]" aria-label="More options">
                <span className="h-1 w-1 rounded-full bg-current"></span>
                <span className="h-1 w-1 rounded-full bg-current"></span>
                <span className="h-1 w-1 rounded-full bg-current"></span>
              </button>
              <div className="flex items-center">
               <img  src={agent} alt="Agent"
                  className="h-9 w-9 rounded-full border-2 border-white object-cover" />
               <img  src={agent} alt="Agent"
                  className="-ml-2 h-9 w-9 rounded-full border-2 border-white object-cover" />
               <img  src={agent}alt="Agent"
                  className="-ml-2 h-9 w-9 rounded-full border-2 border-white object-cover" />
                <img src={agent} alt="Agent"
                  className="-ml-2 h-9 w-9 rounded-full border-2 border-white object-cover" />
                <img src={agent} alt="Agent"
                  className="-ml-2 h-9 w-9 rounded-full border-2 border-white object-cover" />
              </div>
            </div>
          </div>
          <p className="text-[39px] font-bold leading-none text-black">5 <span
              className="text-[23px] font-bold text-[#777]">/128</span></p>
          <h3 className="mt-8 text-[23px] font-medium text-black">Top Performing Agents</h3>
          <p className="mt-5 max-w-[460px] text-[16px] font-medium leading-tight text-black">3 agents are sales this month,
            achieving outstanding results performance this month.</p>
        </section>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_1fr] gap-[18px]">
        {/* //transaction history  */}
        <section className="rounded-[14px] bg-white px-4 py-5">
          <div className="mb-5 flex items-center justify-between px-1.5">
            <h2 className="text-[20px] sm:text-[23px] font-bold leading-none text-black">Transaction History</h2>
            <select
              className="h-8 rounded-lg border border-[#d9d9d9] bg-white px-3 text-[11px] font-medium text-[#878787] outline-none">
              <option>Last Week</option>
            </select>
          </div>
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full min-w-[620px] border-collapse text-left text-[12px]">
              <thead>
                <tr className="h-[33px] bg-[#03042d] text-white">
                  <th className="rounded-l-xl px-3 font-medium">ID</th>
                  <th className="px-3 font-medium">Customer Name</th>
                  <th className="px-3 font-medium">Property Type</th>
                  <th className="px-3 font-medium">Amount</th>
                  <th className="px-3 font-medium">Status</th>
                  <th className="rounded-r-xl px-3 font-medium">Transaction Date</th>
                </tr>
              </thead>
             <tbody className="text-[#252525]">
  {transactions.map((item) => (
    <tr
      key={item.id}
      className="h-[36px] border-b border-gray-100"
    >
      <td className="px-3">{item.id}</td>

      <td className="px-3">
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="h-[22px] w-[22px] rounded object-cover"
          />
          {item.name}
        </div>
      </td>

      <td className="px-3">{item.property}</td>

      <td className="px-3">{item.amount}</td>

      <td className="px-3">
        <span>{item.status}</span>
      </td>

      <td className="px-3">{item.date}</td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-[#232323]">
            <p className="rounded border border-[#d0d0d0] px-2 py-1.5 text-[12px]">Showing 1-4 out of 16 result</p>
            <div className="flex items-center gap-2">
              <button
                className="rounded border border-dashed border-[#777] px-2.5 py-1.5 text-[11px] font-medium">Prev.</button>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17205d] text-white text-[12px]">1</button>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#8c8c8c] text-[#17205d] text-[12px]">2</button>
              <button
                className="rounded border border-dashed border-[#777] px-2.5 py-1.5 text-[11px] font-medium">Next</button>
            </div>
          </div>
        </section>

        <section className="rounded-[14px] bg-white px-5 py-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[23px] font-bold leading-none text-black">Financial Insights</h2>
            <select
              className="h-8 rounded-lg border border-[#d9d9d9] bg-white px-3 text-[11px] font-medium text-[#878787] outline-none">
              <option>Last Week</option>
            </select>
          </div>
          <div className="relative h-[220px] overflow-x-auto overflow-y-hidden bg-white hide-scrollbar">
            <div className="min-w-[400px] h-full relative">
              <div
                className="absolute left-1 top-[42px] flex h-[135px] flex-col justify-between text-[12px] font-medium text-[#7b8190]">
                <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
              </div>
              <div className="absolute left-[42px] right-2 top-[34px] h-[155px]">
                <div className="absolute inset-x-0 top-0 border-t border-[#cfd3d8]"></div>
                 <img src={financial}alt="Financial Insights chart"
                  className="absolute inset-x-0 top-[10px] h-[143px] w-full object-fill" />
              </div>
              <div
                className="absolute bottom-1 left-[42px] right-2 grid grid-cols-7 text-center text-[12px] font-medium text-[#7b8190]">
                <span>Sun</span><span>Mon</span><span>Tues</span><span>Wed</span><span>Thus</span><span>Fri</span><span>Sat</span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-[13px] font-medium leading-tight text-[#333]">Total revenue generated from property sales
            and rentals this month and last month to date in USD dollars in the United States.</p>
        </section>
      </div>

      </section>
  )
}

export default Revenue