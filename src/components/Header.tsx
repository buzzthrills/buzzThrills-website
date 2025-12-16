import React, { useState } from "react";
import type { User } from "../utils/type";
import { FiMenu, FiX } from "react-icons/fi";

type HeaderProps = {
  user: User;
};

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#36014b] to-[#c804d7] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left: Welcome */}
        <div className="flex-shrink-0">
          <h1 className="text-lg sm:text-xl font-semibold truncate">
            Welcome, {user.fullName}
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <span className="text-sm sm:text-base">
            Plan: {user.subscription?.plan?.name || "No active plan"}
          </span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="ml-4 px-3 py-1 rounded bg-white text-[#36014b] font-semibold hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#4e0c7c] px-4 pb-4 space-y-2">
          <span className="block text-white">Plan: {user.subscription?.plan?.name || "No active plan"}</span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full text-left px-3 py-2 rounded bg-white text-[#36014b] font-semibold hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
