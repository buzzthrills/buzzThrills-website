import React, { useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email and password are required!");
    }

    setLoading(true);

    const response = await apiRequest("/user_auth/login", {
      method: "POST",
      body: { email, password },
      showSuccess: true,
    });

    setLoading(false);

    if (response.success) {
      // Save auth data
      localStorage.setItem("auth-token", response.data?.token || "");
      localStorage.setItem("user", JSON.stringify(response.data?.user || {}));

      navigate("/dashboard/book");
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4 text-black">
      <div className="mt-16 p-4 w-full border border-gray-300 rounded-md max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-black/30 focus:border-black outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-black/30 focus:border-black outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#ffae00] to-[#c804d7] text-white font-bold rounded-2xl hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
