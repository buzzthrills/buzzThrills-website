import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PhoneCall, Clock, Users, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { name: "Book", icon: PhoneCall, path: "/dashboard/book" },
  { name: "History", icon: Clock, path: "/dashboard/history" },
  { name: "Recipients", icon: Users, path: "/dashboard/recipients" },
  { name: "Profile", icon: User, path: "/dashboard/profile" },
];

const DashboardDownbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-xl">
      <div className="relative flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-1 left-2 right-2 bottom-1 rounded-2xl bg-purple-100"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                  }}
                />
              )}

              {/* Icon + Label */}
              <motion.div
                whileTap={{ scale: 0.85 }}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative z-10 flex flex-col items-center text-xs font-medium
                  ${
                    isActive
                      ? "text-purple-700"
                      : "text-gray-400"
                  }
                `}
              >
                <Icon
                  size={22}
                  className={`${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`}
                />
                <span className="mt-1">{tab.name}</span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardDownbar;
