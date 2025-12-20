import React from "react";
import { User, CalendarCheck, Phone, Package } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-xl rounded-3xl p-6">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-purple-200 flex items-center justify-center border-4 border-purple-500">
          <User size={40} className="text-purple-500" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
          <p className="text-gray-500 mt-1">johndoe@example.com</p>
          <p className="text-gray-400 mt-1 text-sm">Joined: 2025-01-01</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
          <CalendarCheck size={36} className="mb-2" />
          <span className="text-3xl font-bold mt-2">0</span>
          <p className="text-sm mt-1">Total Bookings</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
          <Phone size={36} className="mb-2" />
          <span className="text-3xl font-bold mt-2">0</span>
          <p className="text-sm mt-1">People Called</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
          <Package size={36} className="mb-2" />
          <span className="text-3xl font-bold mt-2">Starter</span>
          <p className="text-sm mt-1">Current Package</p>
        </div>

        <div className="bg-gradient-to-r from-purple-300 to-purple-500 text-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
          <User size={36} className="mb-2" />
          <span className="text-3xl font-bold mt-2">John</span>
          <p className="text-sm mt-1">Welcome!</p>
        </div>
      </div>

      {/* Optional Info Section */}
      <div className="bg-purple-50 rounded-3xl p-6 shadow-inner border border-purple-200">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Your Dashboard Overview</h2>
        <p className="text-gray-600">
          This is your profile area where you can track your bookings, calls, and current package.
          As you progress, your stats and usage will be updated here in real time.
        </p>
      </div>
    </div>
  );
};

export default Profile;
