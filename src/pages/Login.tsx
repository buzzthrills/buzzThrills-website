import React, { useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import { toast } from "react-hot-toast";
import OTPModal from "../components/OTPModal";
// import { nav } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpAmount, setOtpAmount] = useState(0); // optional: can be used for display

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required!");
    setLoading(true);

    // Call backend API to send OTP
    const response = await apiRequest("/user_auth/login", {
      method: "POST",
      body: { email },
      showSuccess: true,
    });

    setLoading(false);

    if (response.success) {
      setOtpModalOpen(true); // Open OTP modal on success
      setOtpAmount(0); // optional, set if you want to show amount in modal
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    const response = await apiRequest("/user_auth/verify-otp", {
      method: "POST",
      body: { email, otp },
      showSuccess: true,
    });

    if (response.success) {
      setOtpModalOpen(false);
      // toast.success("Login successful!");
      // Save token or user info if returned
      localStorage.setItem("auth-token", response.data?.token || "");
      localStorage.setItem("user", JSON.stringify(response.data?.user || {}));
      navigate("/dashboard");
      // Redirect or update state as needed
    }
  };

  return (
    <div className="min-h-screen flex text-black   justify-center  px-4">
      <div className=" mt-16 h-   p-4 w-full border border-gray-300 rounded-md  max-w-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-left drop-shadow-lg">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-black/90 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-black placeholder-black/70 border border-black/30 focus:border-black focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#ffae00] to-[#c804d7] text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>

      {/* OTP Modal */}
      <OTPModal
        show={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        amount={otpAmount} // optional, can hide if not needed
        onVerify={handleVerifyOtp}
      />
    </div>
  );
};

export default Login;
