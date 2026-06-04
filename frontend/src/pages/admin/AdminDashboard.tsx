import ActiveCustomerItem from "../../components/Dashboard/AdminDashboard/ActiveCustomerItem";
import CustomerRegion from "../../components/Dashboard/AdminDashboard/CustomerRegion";
import CustomerTable1 from "../../components/Dashboard/AdminDashboard/CustomerTable1";
import StatCard from "../../components/Dashboard/AdminDashboard/StatCard";
import { activeCustomers, customers, regions, stats } from "../../services/json/data.input";


const AdminDashboard = () => {
  return (
    <div className="w-full max-w-[1580px] mx-auto">
      <p className="text-lg md:text-xl font-bold text-[#070b2d] mb-4">
        Customer
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_370px] gap-[17px] items-start mb-5">
        {/* LEFT SECTION */}
        <div className="space-y-[17px] w-full min-w-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[17px]">
            {stats.slice(0, 3).map((item) => (
              <StatCard
                key={item.title}
                title={item.title}
                value={item.value}
                Icon={item.Icon}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[17px]">
            {stats.slice(3).map((item) => (
              <StatCard
                key={item.title}
                title={item.title}
                value={item.value}
                Icon={item.Icon}
              />
            ))}
          </div>

          {/* Enquiries Chart */}
          <div className="bg-white rounded-[10px] px-4 md:px-7 py-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[#070b2d]">
                Total Enquiries
              </p>

              <select className="text-xs border border-[#070b2d] rounded-full px-4 py-1.5 outline-none text-[#070b2d] bg-white cursor-pointer">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
            </div>

            <div className="w-full overflow-x-auto">
              <div className="min-w-[600px] w-full">
                <svg
                  viewBox="0 0 640 204"
                  width="100%"
                  height="210"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="areaGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#8c9bad"
                        stopOpacity="0.95"
                      />
                      <stop
                        offset="55%"
                        stopColor="#cbd2d7"
                        stopOpacity="0.7"
                      />
                      <stop
                        offset="100%"
                        stopColor="#ffffff"
                        stopOpacity="0.15"
                      />
                    </linearGradient>
                  </defs>

                  <g stroke="#eacdf1" strokeWidth="1.3">
                    <path d="M42 25H640" />
                    <path d="M42 68H640" />
                    <path d="M42 111H640" />
                    <path d="M42 154H640" />
                    <path d="M42 197H640" />
                  </g>

                  <g fontSize="14" fill="#070b2d">
                    <text x="0" y="31">50</text>
                    <text x="0" y="74">40</text>
                    <text x="0" y="117">30</text>
                    <text x="0" y="160">20</text>
                    <text x="0" y="203">10</text>
                  </g>

                  <path
                    d="M42,68 C63,58 83,72 105,86 C126,100 145,103 165,84 C186,65 205,65 224,78 C245,91 267,79 290,72 C312,65 328,60 350,75 C372,90 389,92 407,74 C429,52 436,22 455,25 C480,29 498,48 518,62 C537,76 555,83 578,70 C600,57 603,41 622,37 C633,35 633,27 640,25 L640,204 L42,204 Z"
                    fill="url(#areaGrad)"
                  />

                  <path
                    d="M42,68 C63,58 83,72 105,86 C126,100 145,103 165,84 C186,65 205,65 224,78 C245,91 267,79 290,72 C312,65 328,60 350,75 C372,90 389,92 407,74 C429,52 436,22 455,25 C480,29 498,48 518,62 C537,76 555,83 578,70 C600,57 603,41 622,37 C633,35 633,27 640,25"
                    fill="none"
                    stroke="#8998a9"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Feedback Summary */}
          <div className="rounded-2xl bg-white px-5 md:px-7 py-2 shadow-sm">
            <p className="mb-3 text-[16px] font-medium text-[#111827]">
              Feedback Summary
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src="/images/customer1.png"
                    alt="Rahul"
                    className="h-[46px] w-[46px] rounded-md object-cover"
                  />

                  <div>
                    <p className="text-[12px] font-medium text-[#111827]">
                      Rahul Verma
                    </p>

                    <p className="text-[12px] mt-1">(4.6 ⭐)</p>
                  </div>
                </div>

                <p className="text-[13px] font-medium leading-snug text-[#111827]">
                  "I was very impressed with the professionalism."
                </p>
              </div>

              <img
                src="/images/feedback.png"
                alt="Feedback"
                className="h-12 w-12 sm:h-[84px] sm:w-[74px]"
              />
            </div>
          </div>
        </div>
                {/* RIGHT SIDEBAR */}
        <div className="space-y-[17px] w-full">
          {/* Active Customer */}
          <div className="bg-white rounded-[10px] p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-[#161E54]">
                Active Customer
              </p>

              <span className="text-xs text-slate-700 font-medium cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {activeCustomers.map((customer, index) => (
                <ActiveCustomerItem
                  key={index}
                  image={customer.image}
                  name={customer.name}
                  location={customer.location}
                />
              ))}
            </div>
          </div>

          {/* Total Active Customer */}
          <div className="bg-white rounded-[10px] p-5 md:p-7 min-h-[300px] shadow-sm flex flex-col border justify-between">
            <p className="text-sm font-semibold text-[#161E54] mb-4">
              Total Active Customer
            </p>

            <div className="flex justify-center my-2">
              <svg viewBox="0 0 140 140" width="190" height="190">
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                />

                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#4f7cec"
                  strokeWidth="8"
                  strokeDasharray="101.8 237.9"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />

                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeDasharray="152.7 186.9"
                  strokeDashoffset="-101.8"
                  strokeLinecap="round"
                />

                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="8"
                  strokeDasharray="84.8 254.8"
                  strokeDashoffset="-254.5"
                  strokeLinecap="round"
                />

                <text
                  x="70"
                  y="66"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="#4f7cec"
                >
                  2.87%
                </text>

                <text
                  x="70"
                  y="80"
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="#94a3b8"
                >
                  this month
                </text>
              </svg>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="w-4 h-4 rounded-sm bg-blue-500 inline-block"></span>
                New
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="w-4 h-4 rounded-sm bg-red-500 inline-block"></span>
                Verified
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="w-4 h-4 rounded-sm bg-amber-400 inline-block"></span>
                Returning
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Region */}
      <CustomerRegion regions={regions} />

      {/* Customer Table */}
      <CustomerTable1 customers={customers} />
    </div>
  );
};

export default AdminDashboard;