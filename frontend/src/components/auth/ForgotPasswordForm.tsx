import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/images/login_Signup/logo.png";
import { useAppDispatch, useAppSeletor } from "../../services/helper/reduxstore";
import { forgotPassword, resetPassword } from "../../store/slices/auth.slice";

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSeletor((state) => state.auth);

  const [step, setStep] = useState<"requestOtp" | "resetWithOtp">("requestOtp");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleRequestOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      const response = await dispatch(forgotPassword({ email: email.trim() })).unwrap();
      toast.success(response.message || "OTP sent to your email");
      setStep("resetWithOtp");
    } catch {
      // errors are already handled by redux state
    }
  };

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!otp.trim() || !newPassword.trim()) {
      toast.error("OTP and new password are required");
      return;
    }

    if (newPassword.trim().length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await dispatch(
        resetPassword({
          email: email.trim(),
          otp: otp.trim(),
          newPassword: newPassword.trim(),
        })
      ).unwrap();

      toast.success(response.message || "Password reset successful");
      navigate("/login");
    } catch {
      // errors are already handled by redux state
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 md:px-16 w-full max-w-xl mx-auto">
      <div className="flex lg:hidden justify-center mb-10">
        <div className="text-center flex flex-col items-center gap-2">
          <NavLink to="/" className="w-[74px] h-[92px]">
            <img src={logo} alt="logo" loading="lazy" />
          </NavLink>
        </div>
      </div>

      <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
        Security Recovery
      </span>

      <h1 className="text-3xl sm:text-[2.5rem] leading-tight font-bold text-gray-900 mb-4">
        Forgot Password
      </h1>

      <p className="text-gray-500 text-sm mb-10 leading-relaxed pr-4">
        {step === "requestOtp"
          ? "Enter your account email. We will send an OTP to reset your password."
          : "Enter the OTP received on email and set your new password."}
      </p>

      {step === "requestOtp" ? (
        <form onSubmit={handleRequestOtp}>
          <div className="mb-8 relative">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div className="relative">
              <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. investor@firm.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-md border border-gray-100 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors text-sm placeholder-gray-300 text-gray-800"
              />
            </div>
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111827] text-white rounded-md py-3.5 text-base font-medium transition-all duration-300 hover:bg-[#FCA311] hover:shadow-md active:scale-[0.98] cursor-pointer outline-none"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="mb-5 relative">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div className="relative">
              <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. investor@firm.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-md border border-gray-100 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors text-sm placeholder-gray-300 text-gray-800"
              />
            </div>
          </div>

          <div className="mb-5 relative">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              OTP
            </label>
            <div className="relative">
              <i className="fa-solid fa-shield-halved absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full pl-11 pr-4 py-3.5 rounded-md border border-gray-100 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors text-sm placeholder-gray-300 text-gray-800"
              />
            </div>
          </div>

          <div className="mb-8 relative">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              New Password
            </label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-11 pr-4 py-3.5 rounded-md border border-gray-100 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors text-sm placeholder-gray-300 text-gray-800"
              />
            </div>
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111827] text-white rounded-md py-3.5 text-base font-medium transition-all duration-300 hover:bg-[#FCA311] hover:shadow-md active:scale-[0.98] cursor-pointer outline-none"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>

          <button
            type="button"
            onClick={() => setStep("requestOtp")}
            className="w-full mt-3 border border-gray-300 text-gray-700 rounded-md py-3 text-sm font-medium hover:bg-gray-50 transition"
          >
            Back
          </button>
        </form>
      )}

      <div className="mt-6">
        <NavLink
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors group"
        >
          <i className="fa-solid fa-arrow-left text-xs transition-transform group-hover:-translate-x-1"></i>
          Back to Login
        </NavLink>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
