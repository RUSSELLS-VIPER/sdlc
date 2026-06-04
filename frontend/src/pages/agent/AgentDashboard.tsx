import React, { useState, useEffect, type FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import agent1 from '../../assets/images/agent-dashboard-images/agent-1.jpg'
// import { useAppDispatch, useAppSeletor } from '../../services/helper/reduxstore';
// import { getProperties } from '../../store/slices/property.slice';
import propertyBoxImg1 from '../../assets/images/agent-dashboard-images/property-box-img-1.png'
import propertyBoxImg2 from '../../assets/images/agent-dashboard-images/property-box-img-2.png'
import propertyBoxImg3 from '../../assets/images/agent-dashboard-images/property-box-img-3.png'
import propertyBoxImg4 from '../../assets/images/agent-dashboard-images/property-box-img-4.png'

// TypeScript Interface for the API structure
interface Property {
  id: string | number;
  image: string;
  title: string;
  bhk: string;
  location: string;
  availability: 'AVAILABLE' | 'SOLD';
  status: string;
  value: string;
  sqft: number;
}

const AgentDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimating, setModalAnimating] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [tickerFadeClass, setTickerFadeClass] = useState("fade-in");
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [toast, setToast] = useState({ visible: false, message: '', type: '' });
//   const {items} = useAppSeletor((state)=> state.property)
//   const dispatch = useAppDispatch()
//   console.log(items)






  const propertiesData: Property[] = [
    {
      id: 1,
      image: propertyBoxImg1,
      title: "Duplex House",
      bhk: "2BHK",
      location: "Barasat, Chapadali More",
      availability: "AVAILABLE",
      status: "Ready To Move",
      value: "45L",
      sqft: 800
    },
    {
      id: 2,
      image: propertyBoxImg2,
      title: "Luxury Apartments",
      bhk: "3BHK",
      location: "Barasat, Colony More",
      availability: "AVAILABLE",
      status: "Under Construction",
      value: "50L",
      sqft: 1200
    },
    {
      id: 2,
      image: propertyBoxImg3,
      title: "Luxury Apartments",
      bhk: "3BHK",
      location: "Barasat, Colony More",
      availability: "SOLD",
      status: "Under Construction",
      value: "50L",
      sqft: 1200
    },
    {
      id: 2,
      image: propertyBoxImg4,
      title: "Luxury Apartments",
      bhk: "3BHK",
      location: "Barasat, Colony More",
      availability: "SOLD",
      status: "Under Construction",
      value: "50L",
      sqft: 1200
    }
  ];

  const activities = [
    "Rahul Sharma booked a schedule for Sunset View Villa.",
    "Payment received for Imperial Estate (Token Amount).",
    "Snehas Roy canceled the site visit for Downtown Office.",
    "New inquiry received from Ananya Paul for 3BHK Apartment.",
    "Property 'Green Valley' status updated to Sold.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerFadeClass("fade-out");
      setTimeout(() => {
        setCurrentActivityIndex((prevIndex) => (prevIndex + 1) % activities.length);
        setTickerFadeClass("fade-in");
      }, 500);
    }, 2500);
    return () => clearInterval(interval);
  }, [activities.length]);

  const openScheduleModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setModalAnimating(true), 10);
  };

  const closeScheduleModal = () => {
    setModalAnimating(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  const submitScheduleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeScheduleModal();
    setTimeout(() => {
      setToast({ visible: true, message: "Schedule booked successfully!", type: "Success" });
      setTimeout(() => setToast({ visible: false, message: '', type: '' }), 3000);
    }, 300);
  };

  const showChartTooltip = (e: React.MouseEvent<SVGCircleElement>, label: string, count: number, color: string) => {
    const text = `<span style="color: ${color}; font-weight: 700;">${label}:</span> <span class="font-bold">${count}</span> Properties`;
    setTooltip({ visible: true, text, x: e.clientX, y: e.clientY - 45 });
  };

  const moveChartTooltip = (e: React.MouseEvent<SVGCircleElement>) => {
    setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY - 45 }));
  };

  const hideChartTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

//     useEffect(()=> {
//     dispatch(getProperties())

//   }, [dispatch])

  return (
    <main className="flex-1 h-full overflow-y-auto bg-[#f4f7f6] relative w-full custom-scrollbar">
      <div className="mx-auto max-w-[1320px] flex flex-col p-4 md:p-6 lg:p-8 min-h-full">
        
        {/* Header content dashboard */}
        <header className="sticky top-0 z-30 bg-[#f4f7f6] py-2 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#161a2b] truncate">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4 bg-white/50 backdrop-blur-sm p-1.5 rounded-full shadow-sm shrink-0">
            <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
              <i className="fas fa-search"></i>
            </button>
            <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition relative">
              <i className="fas fa-bell"></i>
            </button>
            <img
              src={agent1}
              alt="User Profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-gray-200 cursor-pointer ml-1"
            />
          </div>
        </header>

        {/* Overview Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold text-[#161a2b] shrink-0">Overview</h2>
          <button
            onClick={openScheduleModal}
            className="bg-[#161a2b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 hover:bg-[#2c3454] hover:shadow transition-colors duration-300"
          >
            <i className="far fa-calendar-check text-base"></i> Book Schedules
          </button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#2b487c] text-white rounded-2xl p-6 shadow-lg flex justify-between items-center transition-transform hover:-translate-y-1 duration-300">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/90 font-sans">TOTAL INQUIRIES</p>
              <h3 className="text-4xl font-bold mb-4 font-sans">28</h3>
              <NavLink to="/inquiry" className="text-sm font-medium underline underline-offset-4 hover:text-gray-300 transition">View Inquiries</NavLink>
            </div>
            <div><i className="far fa-calendar-alt text-[56px] text-white"></i></div>
          </div>

          <div className="bg-[#e29100] text-white rounded-2xl p-6 shadow-lg flex justify-between items-center transition-transform hover:-translate-y-1 duration-300">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/90 font-sans">TOTAL PROPERTY SOLD</p>
              <h3 className="text-4xl font-bold mb-4 font-sans">15</h3>
              <p className="text-sm font-medium text-white/95">65% Conversion Rate</p>
            </div>
            <div><i className="fas fa-history text-[56px] text-white"></i></div>
          </div>

          <div className="bg-[#394a6b] text-white rounded-2xl p-6 shadow-lg flex justify-between items-center transition-transform hover:-translate-y-1 duration-300">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/90 font-sans">TOTAL PROPERTY AVAILABLE</p>
              <h3 className="text-4xl font-bold mb-4 font-sans">8</h3>
              <NavLink to="#" className="text-sm font-medium underline underline-offset-4 hover:text-gray-300 transition">Manage Listings</NavLink>
            </div>
            <div><i className="far fa-heart text-[56px] text-white"></i></div>
          </div>
        </div>

        {/* Data Split Section */}
        <div className="flex flex-col lg:flex-row gap-6 h-[1000px] lg:h-[500px] mb-6">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-6 pb-2 shrink-0 border-b border-dashed border-gray-200 mb-2">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-serif text-gray-900">My Properties</h2>
                <span className="bg-[#fef3c7] text-[#92400e] text-xs font-bold px-3 py-1.5 rounded-full">4 Active Listings</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pt-2 custom-scrollbar">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* Dynamically mapped property cards */}
                {propertiesData.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-44">
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-3 left-3 text-white text-[10px] tracking-wide font-bold px-3 py-1.5 rounded ${
                        property.availability === 'AVAILABLE' ? 'bg-[#10b981]' : 'bg-[#4f46e5]'
                      }`}>
                        {property.availability}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-[17px]">{property.title}</h4>
                        <span className="text-[11px] font-bold text-gray-500 mt-1">{property.bhk}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        <i className="fas fa-map-marker-alt text-gray-400 mr-1.5"></i>{property.location}
                      </p>
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Status</p>
                          <p className={`text-[13px] font-medium text-gray-800 `}>{property.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">Value</p>
                          <p className={`text-[19px] font-extrabold  ${property.availability === "AVAILABLE" ? "text-[#161a2b]" : "text-[#4f46e5]"}`}>{property.value}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="text-[13px] font-semibold text-gray-600">Sq.FT - {property.sqft}</span>
                        <button className="bg-[#161a2b] hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">Get Quote</button>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* SVG Pie Chart Status Block */}
          <div className="w-full lg:w-[350px] xl:w-[400px] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col shrink-0">
            <div className="p-6 pb-4 border-b border-dashed border-gray-200">
              <h2 className="text-2xl font-bold font-serif text-gray-900">Portfolio Chart</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">Property Status Breakdown</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
              <div className="mb-10 mt-4 relative w-56 h-56 animate-chart">
                <div className="absolute inset-0 m-auto w-[150px] h-[150px] bg-white rounded-full shadow-[inset_0_4px_6px_-1px_rgba(0,0,0,0.1)] pointer-events-none z-0"></div>
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 z-10 relative overflow-visible drop-shadow-md">
                  <circle cx="18" cy="18" r="15.91549431" fill="transparent" stroke="#f1f5f9" strokeWidth="4"></circle>
                  <circle
                    cx="18" cy="18" r="15.91549431" fill="transparent" stroke="#4f46e5" strokeWidth="4" strokeDasharray="63 37" strokeDashoffset="0"
                    className="transition-all duration-300 cursor-pointer hover:stroke-[5] hover:drop-shadow-lg"
                    onMouseOver={(e) => showChartTooltip(e, 'Sold', 15, '#4f46e5')} onMouseMove={moveChartTooltip} onMouseOut={hideChartTooltip}
                  ></circle>
                  <circle
                    cx="18" cy="18" r="15.91549431" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="33 67" strokeDashoffset="-65"
                    className="transition-all duration-300 cursor-pointer hover:stroke-[5] hover:drop-shadow-lg"
                    onMouseOver={(e) => showChartTooltip(e, 'Available', 8, '#10b981')} onMouseMove={moveChartTooltip} onMouseOut={hideChartTooltip}
                  ></circle>
                </svg>
              </div>
              <div className="w-full space-y-4 px-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="block w-4 h-4 rounded-full bg-[#10b981] shadow-sm"></span>
                    <span className="text-sm font-bold text-gray-700">Total Property Available</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">8 Listings</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="block w-4 h-4 rounded-full bg-[#4f46e5] shadow-sm"></span>
                    <span className="text-sm font-bold text-gray-700">Total Property Sold</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">15 Listings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Notification Slider */}
        <div className="w-full lg:w-[60%] bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-center gap-3 shadow-sm mb-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="font-bold text-[#161a2b] text-sm">Recent Activity :</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p id="activity-ticker" className={`text-sm font-medium text-gray-600 truncate ${tickerFadeClass}`}>
              {activities[currentActivityIndex]}
            </p>
          </div>
        </div>

      </div>

      {/* Embedded Chart Overlay Tooltip Element */}
      {tooltip.visible && (
        <div
          id="chart-tooltip"
          className="fixed bg-[#161a2b]/95 backdrop-blur-sm text-white text-xs px-4 py-2.5 rounded-lg shadow-xl pointer-events-none z-[100] whitespace-nowrap border border-gray-700 transition-opacity duration-200"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          <span dangerouslySetInnerHTML={{ __html: tooltip.text }}></span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#161a2b]/95 border-b border-r border-gray-700 rotate-45"></div>
        </div>
      )}

      {/* Embedded Booking Modal Panel */}
      {isModalOpen && (
        <div id="schedule-modal" className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeScheduleModal}></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className={`relative bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-lg w-full duration-300 ${modalAnimating ? "modal-enter" : "modal-exit"}`}>
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#161a2b]/10 flex items-center justify-center text-[#161a2b]"><i className="far fa-calendar-plus text-lg"></i></div>
                  <h3 className="text-xl font-bold text-gray-900">Book New Schedule</h3>
                </div>
                <button onClick={closeScheduleModal} className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none p-1"><i className="fas fa-times text-xl"></i></button>
              </div>
              <form id="schedule-form" onSubmit={submitScheduleForm}>
                <div className="px-6 py-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Client Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="far fa-user text-gray-400"></i></div>
                      <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#161a2b] focus:border-transparent outline-none transition-all" placeholder="e.g. Rahul Sharma" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Interested Property <span className="text-red-500">*</span></label>
                    <select required defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm focus:bg-white focus:ring-2 focus:ring-[#161a2b] focus:border-transparent outline-none transition-all cursor-pointer">
                      <option value="" disabled>Select a Property</option>
                      <option>Sunset View Villa</option>
                      <option>Imperial Estate</option>
                      <option>Downtown Office Space</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Visit Date <span className="text-red-500">*</span></label>
                      <input type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#161a2b] focus:border-transparent outline-none transition-all text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time Slot <span className="text-red-500">*</span></label>
                      <input type="time" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#161a2b] focus:border-transparent outline-none transition-all text-gray-700" />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                  <button type="button" onClick={closeScheduleModal} className="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors shadow-sm">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-[#161a2b] rounded-xl text-sm font-bold text-white hover:bg-[#252c47] transition-all shadow-md hover:shadow-lg flex items-center gap-2"><i className="fas fa-check"></i> Confirm Booking</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Pop-up Alert Feedback Toast Container */}
      <div
        id="toast"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 z-[70] flex items-center p-4 space-x-3 w-max max-w-xs bg-white rounded-xl shadow-2xl border-l-4 transition-all duration-300 ease-in-out pointer-events-none ${
          toast.visible ? "toast-enter border-[#161a2b]" : "toast-exit hidden"
        }`}
        role="alert"
      >
        <div id="toast-icon" className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-white shadow-sm bg-[#161a2b]">
          <i className="fas fa-check"></i>
        </div>
        <div id="toast-message" className="ml-3 text-sm font-semibold text-gray-800">
          {toast.message}
        </div>
      </div>
    </main>
  );
}

export default AgentDashboard;