
import bgimg from "../../assets/images/login_Signup/signup-forgot-bg.png"
import logo from "../../assets/images/login_Signup/logo.png"
import { NavLink } from 'react-router-dom'
const AuthBanner = () => {
  return (
    <div
        className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:w-1/2 lg:h-screen relative bg-cover bg-center"
        style={{backgroundImage:`url(${bgimg})`}}
         
        
      >
        <div
          className="relative z-10 w-full flex flex-col justify-between p-12 lg:p-16 h-full"
        >
          <div className="flex justify-start mt-4">
            <div className="text-center flex flex-col items-center gap-3">
              <NavLink to="/" className="w-[74px] h-[92px]">
                <img
                  src={logo}
                  alt="logo"
                  loading="lazy"
                />
              </NavLink>
            </div>
          </div>

          <div className="text-white max-w-md mb-8">
            <h2 className="text-4xl font-bold mb-4">Find your sweet home</h2>
            <p className="text-gray-200 text-sm leading-relaxed font-medium">
              Schedule visits in just a few clicks and discover a curated
              collection of premium estates.
            </p>
          </div>
        </div>
      </div>
  )
}

export default AuthBanner