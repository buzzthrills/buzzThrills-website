import React from "react";
import StepCard from "./StepCard";
import { FaRegSmile, FaUserPlus, FaPhoneAlt } from "react-icons/fa";

const StepsSection: React.FC = () => (
  <section
    className="py-20 px-6 relative overflow-hidden"
    style={{
      background: "linear-gradient(to bottom, #ffffff, #f6f2fa, #36014b)",
    }}
  >
    {/* Decorative blobs */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#36014b]/40 via-[#c804d7]/30 to-[#171053]/40 rounded-full filter blur-3xl pointer-events-none"></div>
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-bl from-[#36014b]/30 via-[#c804d7]/20 to-[#171053]/30 rounded-full filter blur-3xl pointer-events-none"></div>

    <div className="relative max-w-6xl mx-auto text-center z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#36014b]">
        How It Works
      </h2>
      <p className="mt-3 text-gray-600 md:text-lg">
        Follow these simple steps to start spreading joy.
      </p>

      <div className="grid md:grid-cols-3 gap-10 mt-14">
        <StepCard
          number="1"
          icon={<FaRegSmile />}
          title="Subscribe"
          text="Choose a plan that fits your needs."
          extraText="Pick the plan that suits your style and budget."
        />
        <StepCard
          number="2"
          icon={<FaUserPlus />}
          title="Add Recipients"
          text="Tell us who to call & why."
          extraText="Add friends, family, or anyone special to your list."
        />
        <StepCard
          number="3"
          icon={<FaPhoneAlt />}
          title="We Handle the Rest"
          text="We make the calls, send updates & deliver the love."
          extraText="Sit back, relax, and watch the magic happen!"
        />
      </div>
    </div>
  </section>
);

export default StepsSection;
