import React from "react";
import { motion } from "framer-motion";

const CTASection: React.FC = () => (
  <section className="py-24 text-center bg-gradient-to-r from-[#36014b] via-[#c804d7] to-[#171053] text-white">
    <motion.h2
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="text-4xl font-bold"
    >
      Never miss a birthday or special moment again.
    </motion.h2>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-8 px-10 py-4 bg-white text-[#36014b] font-semibold rounded-xl shadow-lg"
    >
      SUBSCRIBE NOW
    </motion.button>
  </section>
);

export default CTASection;
