import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import BuzzThrills from "../components/BuzzThrillsLoader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const user = localStorage.getItem("user");
    if (user) navigate("/");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await apiRequest("/user_auth/login", {
      method: "POST",
      body: { email, password },
      showSuccess: true
    });

    setLoading(false);

    if (res.success) {
      // Save full user object minus password
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/"); // or home
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      {loading && <BuzzThrills />}
      <div className="bg-gradient-to-br from-[#36014b] to-[#c804d7] p-[1px] rounded-2xl shadow-xl w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-[#36014b]">Welcome Back 👋</h2>
          <p className="text-center text-gray-600 mb-6">Login to continue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#c804d7] outline-none"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="submit"
              className="w-full bg-[#c804d7] text-white p-3 rounded-xl font-semibold hover:bg-[#36014b] transition-all shadow-md"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-6 text-gray-700">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#c804d7] font-semibold hover:underline">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
