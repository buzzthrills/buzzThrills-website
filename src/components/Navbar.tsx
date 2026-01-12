import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import type { Varient } from "framer-motion";
import { logo } from "../assets";
import { toast } from "react-hot-toast";

type Subscription = {
  _id: string;
  plan?: {
    name: string;
  };
};

type User = {
  _id: string;
  fullName: string;
  email: string;
  subscription?: Subscription;
};

// const menuContainer = {
//   hidden: { x: "100%" },
//   visible: {
//     x: "0%", // keep string
//     transition: {
//       type: "spring",
//       stiffness: 260,
//       damping: 28,
//     },
//   },
//   exit: {
//     x: "100%",
//     transition: { duration: 0.25 },
//   },
// };


const menuItem = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsed = JSON.parse(storedUser);

    if (parsed?._id) {
      setUser(parsed);
    } else {
      setUser(null);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/");
  };

  const isSignedIn = Boolean(user?._id);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#36014b] to-[#c804d7] shadow-md">
      <div className="container mx-auto flex items-center px-4 justify-between ">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-24" />
        </Link>

        {/* Desktop Navigation (UNCHANGED) */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => toast("🚧 Services coming soon", { icon: "⏳" })}
            className="text-white/90 hover:text-white transition"
          >
            Services
          </button>


          <Link to="/faqs" className="text-white/90 hover:text-white transition">
            FAQs
          </Link>

          {isSignedIn && (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
            >
              Dashboard
            </Link>
          )}

          {isSignedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-white text-[#36014b] font-semibold hover:bg-gray-200 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-xl bg-white text-[#36014b] font-semibold hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden flex flex-col gap-[5px]"
        >
          <span className="w-6 h-[2px] bg-white" />
          <span className="w-6 h-[2px] bg-white" />
          <span className="w-6 h-[2px] bg-white" />
        </button>
      </div>

      {/* Mobile Menu (ONLY AREA UPDATED) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-0 right-0 h-full w-[80%] bg-[#ffffff] shadow-2xl p-6"
            variants={{}}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-xl font-bold text-gray-700"
            >
              ✕
            </button>

            <motion.ul className="mt-20 space-y-4">

              <motion.li variants={menuItem}>
                <button
                  onClick={() => {
                    toast("🚧 Services coming soon", { icon: "⏳" });
                    setIsOpen(false);
                  }}
                  className="block w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 font-medium
             hover:bg-purple-50 hover:text-purple-700 transition text-left"
                >
                  Services
                </button>

              </motion.li>

              <motion.li variants={menuItem}>
                <Link
                  to="/faqs"
                  onClick={() => setIsOpen(false)}
                  className="block w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-800 font-medium
                             hover:bg-purple-50 hover:text-purple-700 transition"
                >
                  FAQs
                </Link>
              </motion.li>

              {isSignedIn && (
                <motion.li variants={menuItem}>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block w-full rounded-xl px-4 py-3 bg-purple-600 text-white font-semibold
                               hover:bg-purple-700 transition"
                  >
                    Dashboard
                  </Link>
                </motion.li>
              )}

              {isSignedIn ? (
                <motion.li variants={menuItem}>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-xl px-4 py-3  border border-gray-300bg-red-50 text-red-600 font-medium
                               hover:bg-red-100 transition text-left"
                  >
                    Logout
                  </button>
                </motion.li>
              ) : (
                <motion.li variants={menuItem}>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full rounded-xl px-4 py-3 bg-gradient-to-r from-[#ffae00] to-[#c804d7] text-white font-semibold
             hover:bg-gray-800 transition"
                  >
                    Login
                  </Link>

                </motion.li>
              )}

            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav >
  );
};

export default Navbar;
