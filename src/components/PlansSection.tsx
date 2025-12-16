import React, { useState, useEffect } from "react";
import { FaGift, FaPhoneAlt, FaUserFriends, FaBuilding } from "react-icons/fa";
import PlanCard from "./PlanCard";
import { motion } from "framer-motion";

const PlansSection: React.FC = () => {
  const [dim, setDim] = useState({ width: 0, height: 0 });
  const particles = Array.from({ length: 40 });

  // Get window size
  useEffect(() => {
    const updateDim = () => setDim({ width: window.innerWidth, height: window.innerHeight });
    updateDim();
    window.addEventListener("resize", updateDim);
    return () => window.removeEventListener("resize", updateDim);
  }, []);

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden min-h-screen">
      {/* PARTICLES */}
      {dim.width > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((_, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0.2,
                x: Math.random() * dim.width,
                y: Math.random() * dim.height,
                scale: Math.random() * 0.7 + 0.4,
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                x: Math.random() * dim.width,
                y: Math.random() * dim.height,
              }}
              transition={{
                duration: Math.random() * 6 + 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_12px_4px_rgba(200,4,215,0.7)]"
            />
          ))}
        </div>
      )}

      {/* Blurred Purple Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#36014b]/40 via-[#c804d7]/30 to-[#171053]/40 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-bl from-[#36014b]/30 via-[#c804d7]/20 to-[#171053]/30 rounded-full filter blur-3xl pointer-events-none"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#36014b]">
          Choose Your BuzzThrills Plan
        </h2>
        <p className="text-center text-gray-600 mt-2 md:text-lg">
          Thoughtfulness made simple.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <PlanCard
            title="Buzz Lite"
            price="₦15,000/month"
            calls="12 Surprise Calls"
            icon={<FaGift className="text-4xl text-[#c804d7]" />}
            features={[
              "Up to 12 heartfelt calls monthly",
              "Custom messages for every recipient",
              "Access to all call types",
              "Priority booking",
            ]}
            onSelect={() => (window.location.href = "/subscribe?plan=lite")}
          />

          <PlanCard
            title="Buzz Plus"
            price="₦25,000/month"
            calls="20 Surprise Calls"
            icon={<FaPhoneAlt className="text-4xl text-[#c804d7]" />}
            features={[
              "Up to 20 surprise calls monthly",
              "Perfect for birthdays & apologies",
              "Customizable messages",
              "Faster processing & priority slots",
            ]}
            onSelect={() => (window.location.href = "/subscribe?plan=plus")}
          />

          <PlanCard
            title="Buzz Orbit"
            price="₦50,000/month"
            calls="30+ Premium Calls"
            icon={<FaUserFriends className="text-4xl text-[#c804d7]" />}
            features={[
              "30+ premium personalized calls",
              "Unlimited call experiences",
              "Custom voice notes",
              "Preferred caller",
              "Bonus calls",
              "VIP scheduling ",
            ]}
            onSelect={() => (window.location.href = "/subscribe?plan=orbit")}
          />

          <PlanCard
            title="Buzz Corporate"
            price="Custom Pricing"
            calls="35+ Corporate Calls"
            icon={<FaBuilding className="text-4xl text-[#c804d7]" />}
            features={[
              "Branded messages",
              "Staff reminders",
              "Client appreciation",
              "Dedicated account manager",
            ]}
            onSelect={() => (window.location.href = "/subscribe?plan=corporate")}
          />

        </div>
      </div>
    </section>
  );
};

export default PlansSection;
