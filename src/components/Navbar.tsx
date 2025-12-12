import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignin, setIsSignin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsSignin(!!token); 
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const topBar = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  };

  const middleBar = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomBar = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <nav className="bg-gradient-to-r from-[#36014b] to-[#c804d7] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between pr-3 md:py-4">
        
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Pickload Icon" className="w-24" />
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
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

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          <li><Link to="" className="text-gray-100 hover:text-green-200 font-medium">Service</Link></li>
          <li><Link to="" className="text-gray-100 hover:text-green-200 font-medium">FAQs</Link></li>
          <li><Link to="" className="text-gray-100 hover:text-green-200 font-medium">Book</Link></li>

          <li>
            <Link to={isSignin ? "/book" : "/signup"}>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                {isSignin ? "Book Call Now" : "Sign Up Now"}
              </button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white shadow-inner"
            initial="hidden" animate="visible" exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center gap-4 py-4">

              <li><Link to="" className="text-gray-700">Service</Link></li>
              <li><Link to="/faqs" className="text-gray-700">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-700">Contact</Link></li>

              <li>
                <Link to={isSignin ? "/book" : "/signup"}>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    {isSignin ? "Book Call Now" : "Sign Up Now"}
                  </button>
                </Link>
              </li>

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
