import React from "react";
import { motion } from "framer-motion";

interface PlanProps {
  title: string;
  price: string;
  calls: string;
  icon: React.ReactNode;
  features: string[];
    onSelect: () => void;   // new prop

}

const PlanCard: React.FC<PlanProps> = ({ title,onSelect, price, calls, icon, features }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.6 }}
    className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 
               shadow-lg hover:shadow-2xl rounded-3xl p-8 border border-[#c804d7]/20 transition-all duration-300"
  >
    {/* Icon */}
    <div className="flex justify-center text-5xl text-[#c804d7]">{icon}</div>

    {/* Title & Price */}
    <h3 className="text-2xl font-bold text-[#36014b] mt-5 text-center">{title}</h3>
    <p className="text-center text-[#c804d7] font-semibold mt-2 text-lg">{price}</p>
    <p className="text-sm text-gray-500 text-center mt-1">{calls}</p>

    {/* Features */}
    <ul className="mt-6 space-y-2 text-gray-700 text-left">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-[#c804d7] mt-1">•</span>
          <span>{f}</span>
        </li>
      ))}
    </ul>

    {/* CTA Button */}
    <button 
    onClick={onSelect} className="mt-6 w-full py-3 bg-gradient-to-r from-[#36014b] to-[#c804d7] 
                       text-white rounded-xl font-semibold shadow-lg hover:shadow-xl 
                       transition-all duration-300">
      Choose Plan
    </button>
  </motion.div>
);

export default PlanCard;
