import React, { useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import { useLocation, useNavigate } from "react-router-dom";
import BuzzThrills from "../components/BuzzThrillsLoader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup : React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [form, setForm] = useState({
    email,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup  = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);

    const res = await apiRequest("/user_auth/create-password", {
      method: "POST",
      body: form,
      showSuccess: true,
    });

    setLoading(false);

    if (res.success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[90vh] bg-white flex items-center justify-center px-4">
      {loading && <BuzzThrills />}

      <div className="bg-gradient-to-br from-[#36014b] to-[#c804d7] p-[1px] rounded-2xl shadow-xl w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl">
          <h2 className="text-xl font-extrabold text-center mb-2 text-[#36014b]">
            Create Password
          </h2>

          <p className="text-center text-gray-600 mb-6">
            Create a password for your account before proceeding
          </p>

          <form onSubmit={handleSignup } className="space-y-5">
            {/* Email (locked) */}
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c804d7] outline-none"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c804d7] outline-none"
                required
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c804d7] text-white p-3 rounded-xl font-semibold hover:bg-[#36014b] transition-all shadow-md"
            >
              Create Password
            </button>
          </form>

          <p className="text-center mt-6 text-gray-700">
            Already have a password?{" "}
            <a
              href="/login"
              className="text-[#c804d7] font-semibold hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
