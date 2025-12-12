import React from "react";
import { motion } from "framer-motion";

interface StepProps {
  number: string;
  title: string;
  text: string;
  icon?: React.ReactNode; // optional icon
  extraText?: string;     // optional additional description
}

const StepCard: React.FC<StepProps> = ({ number, title, text, icon, extraText }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.6 }}
    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-[#c804d7]/20 transition-all duration-300"
  >
    {/* Icon / Emoji */}
    {icon && <div className="text-4xl md:text-5xl mb-4">{icon}</div>}

    {/* Step Number */}
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#36014b] to-[#c804d7] text-white text-2xl font-bold shadow-md mx-auto">
      {number}
    </div>

    {/* Title & Text */}
    <h3 className="text-xl md:text-2xl font-semibold text-[#36014b] mt-5">{title}</h3>
    <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">{text}</p>

    {/* Extra Description */}
    {extraText && <p className="mt-2 text-gray-500 text-sm md:text-base">{extraText}</p>}
  </motion.div>
);

export default StepCard;

