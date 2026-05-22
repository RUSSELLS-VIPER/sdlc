
import { NavLink } from 'react-router-dom'
import logo from "../../assets/images/login_Signup/logo.png"
const ForgotPasswordForm = () => {
  return (
     <div
          className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 md:px-16 w-full max-w-xl mx-auto"
        >
          <div className="flex lg:hidden justify-center mb-10">
            <div className="text-center flex flex-col items-center gap-2">
              <NavLink to="/" className="w-[74px] h-[92px]">
                <img
                  src={logo}
                  alt="logo"
                  loading="lazy"
                />
              </NavLink>
            </div>
          </div>

          <span
            className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3"
          >
            Security Recovery
          </span>

          <h1
            className="text-3xl sm:text-[2.5rem] leading-tight font-bold text-gray-900 mb-4"
          >
            Forgot Password
          </h1>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed pr-4">
            Enter the email address associated with your Infinity Horizon
            account. We will send a secure password reset link to your inbox.
          </p>

          <form>
            <div className="mb-8 relative">
              <label
                className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                >Email Address</label >
              <div className="relative">
                <i
                  className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                ></i>
                <input
                  type="email"
                  placeholder="e.g. investor@firm.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-md border border-gray-100 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors text-sm placeholder-gray-300 text-gray-800"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Reset Password"
              className="w-full bg-[#111827] text-white rounded-md py-3.5 text-base font-medium transition-all duration-300 hover:bg-[#FCA311] hover:shadow-md active:scale-[0.98] cursor-pointer outline-none"
            />
          </form>
          <div className="mt-6">
            <NavLink
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors group"
            >
              <i
                className="fa-solid fa-arrow-left text-xs transition-transform group-hover:-translate-x-1"
              ></i>
              Back to Login
            </NavLink>
          </div>
        </div>
  )
}

export default ForgotPasswordForm