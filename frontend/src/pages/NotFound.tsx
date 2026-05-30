import {  NavLink } from "react-router-dom";
import logo from "../assets/images/login_Signup/logo.png"
import notfound from "../assets/images/login_Signup/404bg.png"


const NotFound = () => {
  return (
   <div className="max-w-[1320px] mx-auto">
      <div
        className="absolute bottom-0 left-0 w-full h-full bg-cover bg-bottom bg-no-repeat"
        style={{backgroundImage: `url(${notfound})`}}
      
      ></div>
      <div
        className="relative z-10 flex-1 flex flex-col items-center w-full max-w-2xl mx-auto px-6 py-2 text-center mt-8"
      >
        <div className="flex flex-col items-center gap-2 mb-8" >
          <NavLink to={"/"} className="w-[74px] h-[92px]">
            <img
              src={logo}
              alt="logo"
              loading="lazy"
            />
          </NavLink>
        </div>
        <div
          className="flex items-center justify-center mb-6 font-404 gap-2 md:gap-3 sm:gap-4"
        >
          <span
            className="text-[#111827] text-[5rem] sm:text-[10rem] font-black leading-none tracking-tighter"
          >
            4
          </span>
          <div
            className="relative flex items-center justify-center w-[5rem] h-[5rem] sm:w-[7rem] sm:h-[7rem] md:w-[9rem] md:h-[9rem] lg:w-[11rem] lg:h-[11rem] rounded-full shadow-[0_0_80px_rgba(0,0,0,0.06)] bg-white gap-2"
          >
            <div
              className="absolute inset-0 rounded-full border-[3px] sm:border-[4px] md:border-[6px] border-[#E2E8F0] opacity-70"
            ></div>
            <div
              className="absolute inset-[16%] rounded-full border-[10px] sm:border-[16px] md:border-[22px] lg:border-[28px] border-[#CBD5E1] opacity-60"
            ></div>
          </div>
          <span
            className="text-[#111827] text-[5rem] sm:text-[10rem] font-black leading-none tracking-tighter"
          >
            4
          </span>
        </div>
        <h1 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900 mb-3">
          Look like you're lost
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          The page you're looking for is not available!
        </p>
        <div className="w-full max-w-[320px] mx-auto mb-6">
          <NavLink
            to={"/"}
            className="block w-full bg-[#111827] text-white rounded-md py-3.5 text-base font-medium transition-all duration-300 hover:bg-[#FCA311] hover:shadow-md active:scale-[0.98]"
          >
            Go to Home
          </NavLink>
        </div>
        <div>
          <p className="text-[13px] text-gray-600">
            Having trouble?
            <NavLink
              to={"#"}
              className="font-medium text-gray-900 hover:text-[#FCA311] transition-colors"
              >Contact support</NavLink
            >
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;