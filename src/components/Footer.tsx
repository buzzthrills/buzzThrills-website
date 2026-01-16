import React from "react";
import { logo } from "../assets";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#36014b] to-[#c804d7] text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 
                      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <img
            src={logo}
            alt="BuzzThrills"
            className="w-32 mx-auto sm:mx-0 mb-6"
          />
          <p className="text-gray-300 max-w-md leading-relaxed">
            Looking for quality service you can trust? We offer exceptional care
            and smooth booking. Slots fill up fast — book now!
          </p>
        </div>

        {/* Company */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-5 tracking-wide">
            COMPANY
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white transition cursor-pointer">Home</li>
            <li className="hover:text-white transition cursor-pointer">About Us</li>
            <li className="hover:text-white transition cursor-pointer">Bookings</li>
            <li className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-5 tracking-wide">
            GET IN TOUCH
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white transition cursor-pointer">
              support@buzzthrills.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <p className="py-4 text-xs text-center text-gray-300">
          © 2025 Daniel Success — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
