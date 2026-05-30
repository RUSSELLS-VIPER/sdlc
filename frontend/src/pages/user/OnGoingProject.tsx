import { NavLink } from "react-router-dom";
import man1 from "../../assets/images/ongoing-projects/man-1.png";
import man2 from "../../assets/images/ongoing-projects/man-2.png";
import man3 from "../../assets/images/ongoing-projects/man-3.png";
import man4 from "../../assets/images/ongoing-projects/man-4.png";
import OnGoingProjectCard from "../../components/onGoingProject/OnGoingProjectCard";
import ongoingbg from "../../assets/images/ongoing-projects/ongoing-bg.png";
import OnGoingPagination from "../../components/onGoingProject/OnGoingPagination";
import projectCard1 from "../../assets/images/ongoing-projects/project-card-1.png";
import projectCard2 from "../../assets/images/ongoing-projects/project-card-2.png";
import projectCard3 from "../../assets/images/ongoing-projects/project-card-3.png";
import projectCard4 from "../../assets/images/ongoing-projects/project-card-4.png";
import projectCard5 from "../../assets/images/ongoing-projects/project-card-5.png";
import projectCard6 from "../../assets/images/ongoing-projects/project-card-6.png";
import projectCard7 from "../../assets/images/ongoing-projects/project-card-7.png";
import projectCard8 from "../../assets/images/ongoing-projects/project-card-8.png";
import projectCard9 from "../../assets/images/ongoing-projects/project-card-9.png";
import projectCard10 from "../../assets/images/ongoing-projects/project-card-10.png";
import projectCard11 from "../../assets/images/ongoing-projects/project-card-11.png";
import projectCard12 from "../../assets/images/ongoing-projects/project-card-12.png";
import projectCard13 from "../../assets/images/ongoing-projects/project-card-13.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const projectsData = [
  {
    id: 1,
    image: projectCard1,
    altText: "Building",
    views: "288981",
    title: "PS Logistics Park",
    location: "Kona Expressway, Howrah",
    unitsAvailable: "24",
    possession: "Dec 2026",
    price: "Starting from ₹ 2.99 Crores",
    unitType: "Industrial Units",
    sizeRange: "1200-1800 Sq Ft",
  },
  {
    id: 2,
    image: projectCard2,
    altText: "Apartment",
    views: "145203",
    title: "Sansara",
    location: "Howrah",
    unitsAvailable: "5 Towers",
    possession: "Mar 2027",
    price: "Starting from ₹ 3.5 Crores",
    unitType: "3/4/4.5/5 BHK Duplex",
    sizeRange: "1800-2500 Sq Ft",
  },
  {
    id: 3,
    image: projectCard3,
    altText: "Complex",
    views: "98442",
    title: "Jade Grove",
    location: "Near Entally, Central Kolkata",
    unitsAvailable: "12",
    possession: "Jun 2028",
    price: "Starting from ₹ 1.03 Crores",
    unitType: "2/3/4 BHK",
    sizeRange: "2000-3000 Sq Ft",
  },
  {
    id: 4,
    image: projectCard4,
    altText: "Poolside Apartment",
    views: "123212",
    title: "One10",
    location: "New Town Action Area I",
    unitsAvailable: "32",
    possession: "Sep 2027",
    price: "Starting from ₹ 4.49 Crores",
    unitType: "5 BHK",
    sizeRange: "2000-3000 Sq Ft",
  },
  {
    id: 5,
    image: projectCard5,
    altText: "Poolside Apartment",
    views: "288981",
    title: "Quintessa",
    location: "Kankurgachi",
    unitsAvailable: "28",
    possession: "Nov 2027",
    price: "Starting from ₹ 3.98 Crores",
    unitType: "4/4.5/5 BHK",
    sizeRange: "2000-3000 Sq Ft",
  },
  {
    id: 6,
    image: projectCard6,
    altText: "Poolside Apartment",
    views: "258981",
    title: "Navyom",
    location: "Off New Alipore",
    unitsAvailable: "15",
    possession: "Aug 2027",
    price: "Starting from ₹ 3.54 Crores",
    unitType: "4/6 BHK",
    sizeRange: "2500-3500 Sq Ft",
  },
  {
    id: 7,
    image: projectCard7,
    altText: "Poolside Apartment",
    views: "214981",
    title: "Abacus",
    location: "New Town",
    unitsAvailable: "3 Towers",
    possession: "Dec 2028",
    price: "Price on request",
    unitType: "Commercial Spaces",
    sizeRange: "1200-1800 Sq Ft",
  },
  {
    id: 8,
    image: projectCard8,
    altText: "Poolside Apartment",
    views: "288411",
    title: "Vaanya",
    location: "New Town - Action Area II",
    unitsAvailable: "5 Towers",
    possession: "Mar 2029",
    price: "Starting from ₹ 4.02 Crores",
    unitType: "4 BHK",
    sizeRange: "1900-2400 Sq Ft",
  },
  {
    id: 9,
    image: projectCard9,
    altText: "Poolside Apartment",
    views: "281981",
    title: "Aurus",
    location: "Behind ITC Sonar",
    unitsAvailable: "2 Towers",
    possession: "Jun 2030",
    price: "Starting from ₹ 4.34 Crores",
    unitType: "4 BHK, 4 BHK Terrace",
    sizeRange: "1800-2200 Sq Ft",
  },
  {
    id: 10,
    image: projectCard10,
    altText: "Poolside Apartment",
    views: "282981",
    title: "Montage",
    location: "Tangra",
    unitsAvailable: "53 Apartments",
    possession: "May 2027",
    price: "Starting from ₹ 93.02 Lakhs",
    unitType: "3 BHK",
    sizeRange: "513-645 Sq Ft",
  },
  {
    id: 11,
    image: projectCard11,
    altText: "Poolside Apartment",
    views: "288980",
    title: "Antares",
    location: "Sarat Bose Road",
    unitsAvailable: "26 Apartments",
    possession: "Nov 2027",
    price: "Price on request",
    unitType: "5 BHK Duplex",
    sizeRange: "2300-2500 Sq Ft",
  },
  {
    id: 12,
    image: projectCard12,
    altText: "Poolside Apartment",
    views: "388981",
    title: "The Dominion",
    location: "LansdowneI",
    unitsAvailable: "1 Tower",
    possession: "Apr 2028",
    price: "Starting from ₹ 1.80 Crores",
    unitType: "Retail Spaces & Offices",
    sizeRange: "2484 Sq Ft",
  },
  {
    id: 13,
    image: projectCard13,
    altText: "Poolside Apartment",
    views: "288910",
    title: "The Reserve",
    location: "Ballygunge Circular - AJC Crossing",
    unitsAvailable: "30/34 Storey High Rise",
    possession: "Jul 2026",
    price: "Price on request",
    unitType: "4/5 BHK",
    sizeRange: "1905 Sq Ft",
  },
];

const OnGoingProject = () => {
  return (
    <>
      {/*hero section */}
      <div
        className="relative w-full h-[50vh] min-h-[400px] bg-cover bg-center bg-no-repeat flex flex-col"
        style={{ backgroundImage: `url(${ongoingbg})` }}
      >
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center pt-24 px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text font-bold mb-4 leading-tight">
            Ongoing Projects
          </h1>
          <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base font-medium mt-2">
            <NavLink to="/" className="hover:text-yellow-400 transition">
              Home
            </NavLink>
            <span className="text-[10px] sm:text-xs">
              <i className="fa-solid fa-angle-right"></i>
            </span>
            <span className="text-white">Ongoing Projects</span>
          </div>
        </div>
      </div>

      <main>
        <section>
          <div className="max-w-[1320px] mx-auto p-4 md:p-8">
            <div className="flex gap-3 mb-6">
              <button className="bg-[#202E5C] text-white  rounded-xl border-2 border-[#202E5C] hover:bg-white hover:text-[#202E5C] transition-all duration-300 px-6 py-2 font-medium text-sm">
                Ongoing
              </button>
              <button className="bg-white text-gray-600 rounded-xl border-2 border-gray-200 hover:border-[#202E5C] hover:text-[#202E5C] transition-all duration-300px-6 px-6 py-2 font-medium text-sm">
                Completed
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-xl shadow-xl">
                  <h2 className="text-xl font-bold mb-6 text-gray-800">
                    Filter Projects
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-md py-2.5 px-3 appearance-none focus:outline-none focus:border-gray-400 text-gray-600 text-sm bg-transparent">
                          <option>Select City</option>
                          <option>Select City</option>
                          <option>Select City</option>
                        </select>
                        <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Area
                      </label>
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-md py-2.5 px-3 appearance-none focus:outline-none focus:border-gray-400 text-gray-600 text-sm bg-transparent">
                          <option>Select Area</option>
                          <option>Select Area</option>
                          <option>Select Area</option>
                        </select>
                        <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Project Type
                      </label>
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-md py-2.5 px-3 appearance-none focus:outline-none focus:border-gray-400 text-gray-600 text-sm bg-transparent">
                          <option>Select Type</option>
                          <option>Select Type</option>
                          <option>Select Type</option>
                        </select>
                        <i className="fas fa-chevron-down absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none"></i>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-700 mb-3">
                      Status
                    </label>
                    <div className="space-y-2.5">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-[#14213D] focus:ring-[#14213D] [#FCAA31]-[#14213D]"
                        />
                        <span className="text-sm text-gray-600">
                          Under Construction
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded border-gray-300 text-[#FCAA31] focus:ring-[#FCAA31] [#FCAA31]-[#FCAA31]"
                        />
                        <span className="text-sm text-gray-600">
                          Near Possession
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-[#14213D] focus:ring-[#14213D] [#FCAA31]-[#14213D]"
                        />
                        <span className="text-sm text-gray-600">
                          New Launch
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Price Range (₹)
                    </label>
                    <div className="border-2 border-[#FCAA31] rounded-xl p-3 pt-4">
                      <input
                        type="range"
                        min="20"
                        max="500"
                        defaultValue="100"
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [#FCAA31]-[#FCAA31]"
                      />
                      <div className="flex justify-between text-[11px] font-medium text-gray-500 mt-2">
                        <span>₹20L</span>
                        <span>₹5Cr</span>
                      </div>
                    </div>
                  </div>

                  {/* Area Range Slider */}
                  <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Area (Sq Ft)
                    </label>
                    <div className="border-2 border-[#FCAA31] rounded-xl p-3 pt-4">
                      <input
                        type="range"
                        min="500"
                        max="5000"
                        defaultValue="1500"
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [#FCAA31]-[#FCAA31]"
                      />
                      <div className="flex justify-between text-[11px] font-medium text-gray-500 mt-2">
                        <span>500</span>
                        <span>5000</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#202E5C] text-white  rounded-xl border-2 border-[#202E5C] hover:bg-white hover:text-[#202E5C] transition-all duration-300 px-6 py-2 font-medium text-sm">
                    Search Projects
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
                  <div className="slider-container relative w-full overflow-hidden mb-4 rounded-xl flex items-center justify-center">
                    <Swiper
                      slidesPerView={1}
                      loop={true}
                      className="w-full flex items-center justify-center"
                      modules={[Autoplay, Pagination]}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        el: "#sliderDots",
                        clickable: true,
                        renderBullet: function (index, className) {
                          return `<span class="${className} w-2 h-2 rounded-full cursor-pointer transition-colors duration-300"></span>`;
                        },
                      }}
                    >
                      {/* Slide 1 */}
                      <SwiperSlide className="profile-slide flex flex-col items-center justify-center text-center w-full">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={man1}
                            alt="slider Img"
                            className="h-64 object-cover object-top rounded-xl mb-4 mx-auto"
                          />
                          <h3 className="font-bold text-lg text-gray-800">
                            Danial Carter
                          </h3>
                          <p className="text-xs text-gray-400">
                            Field Executive
                          </p>
                        </div>
                      </SwiperSlide>

                      {/* Slide 2 */}
                      <SwiperSlide className="profile-slide flex flex-col items-center justify-center text-center w-full">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={man2}
                            alt="Slider img"
                            className="h-64 object-cover object-top rounded-xl mb-4 mx-auto"
                          />
                          <h3 className="font-bold text-lg text-gray-800">
                            Danial Carter
                          </h3>
                          <p className="text-xs text-gray-400">
                            Field Executive
                          </p>
                        </div>
                      </SwiperSlide>

                      {/* Slide 3 */}
                      <SwiperSlide className="profile-slide flex flex-col items-center justify-center text-center w-full">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={man3}
                            alt="Slider Img"
                            className="h-64 object-cover object-top rounded-xl mb-4 mx-auto"
                          />
                          <h3 className="font-bold text-lg text-gray-800">
                            Danial Carter
                          </h3>
                          <p className="text-xs text-gray-400">
                            Field Executive
                          </p>
                        </div>
                      </SwiperSlide>

                      {/* Slide 4 */}
                      <SwiperSlide className="profile-slide flex flex-col items-center justify-center text-center w-full">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={man4}
                            alt="slider img"
                            className="h-64 object-cover object-top rounded-xl mb-4 mx-auto"
                          />
                          <h3 className="font-bold text-lg text-gray-800">
                            Danial Carter
                          </h3>
                          <p className="text-xs text-gray-400">
                            Field Executive
                          </p>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>

                  <div
                    className="flex gap-1.5 justify-center items-center"
                    id="sliderDots"
                  ></div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start h-max mb-8">
                  {/* Card 1 */}
                  {projectsData?.map((project) => (
                    <OnGoingProjectCard project={project} />
                  ))}
                </div>

                {/* Pagination Starts */}
                <OnGoingPagination />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OnGoingProject;
