import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { motion, AnimatePresence } from "framer-motion";

type Subscription = {
  _id: string;
  plan?: {
    name: string;
    maxCalls?: number;
  };
};

type User = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  subscription?: Subscription;
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const topBar = { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } };
  const middleBar = { closed: { opacity: 1 }, open: { opacity: 0 } };
  const bottomBar = { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } };

  const mobileMenuVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const isSignin = !!user;

  return (
    <nav className="bg-gradient-to-r from-[#36014b] to-[#c804d7] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between pr-3 md:py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-24" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link to="/services" className="text-gray-100 hover:text-green-200 font-medium">Service</Link>
          <Link to="/faqs" className="text-gray-100 hover:text-green-200 font-medium">FAQs</Link>
          <Link to="/book" className="text-gray-100 hover:text-green-200 font-medium">Book</Link>

          {isSignin ? (
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">Welcome, {user?.fullName}</span>
              {user?.subscription?.plan && (
                <span className="text-white font-medium">Plan: {user.subscription.plan.name}</span>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-white text-[#36014b] font-semibold hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/signup">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Sign Up Now
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="hidden  flex-col justify-center items-center w-8 h-8 focus:outline-none"
        >
          <motion.span className="block w-6 h-[2px] bg-white rounded mb-[4px]"
            animate={isOpen ? "open" : "closed"}
            variants={topBar}
            transition={{ duration: 0.4 }}
          />
          <motion.span className="block w-6 h-[2px] bg-white rounded mb-[4px]"
            animate={isOpen ? "open" : "closed"}
            variants={middleBar}
            transition={{ duration: 0.4 }}
          />
          <motion.span className="block w-6 h-[2px] bg-white rounded"
            animate={isOpen ? "open" : "closed"}
            variants={bottomBar}
            transition={{ duration: 0.4 }}
          />
        </button>

        <div
        onClick={() =>navigate('/book')}
          className=" px-4 py-2 bg-gradient-to-r from-[#ffae00] text-sm to-[#c804d7] text-white font-bold rounded-3xl l"
        >
          <button> Book Call</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="hidden bg-white px-4 pb-4 space-y-2 shadow-lg border-t"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
          >
            <Link to="/services" className="block text-gray-800 font-medium py-2 hover:text-purple-600 transition">
              Service
            </Link>
            <Link to="/faqs" className="block text-gray-800 font-medium py-2 hover:text-purple-600 transition">
              FAQs
            </Link>
            <Link to="/book" className="block text-gray-800 font-medium py-2 hover:text-purple-600 transition">
              Book
            </Link>

            {isSignin ? (
              <>
                <span className="block text-gray-800 font-medium py-2">Welcome, {user?.fullName}</span>
                {user?.subscription?.plan && (
                  <span className="block text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded mb-2">
                    Plan: {user.subscription.plan.name}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signup">
                <button className="w-full text-left px-3 py-2 rounded bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
                  Sign Up Now
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
