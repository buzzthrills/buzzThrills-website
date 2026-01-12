import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";

type FaqItem = {
  question: string;
  answer: any ;
};

const faqData: FaqItem[] = [
  {
    question: "What is BuzzLite?",
    answer: (
      <>
        BuzzLite is ₦15,000/month and includes up to 12 surprise calls monthly. 
        <br />
        <strong>Features:</strong>
        <ul className="list-disc ml-6 mt-1">
          <li>Up to 12 heartfelt calls monthly (including pranks, music, etc.)</li>
          <li>Custom messages for each recipient</li>
          <li>Access to all call types, even premium ones</li>
          <li>Priority booking for extra surprises</li>
        </ul>
        <strong>Perfect for:</strong> Thoughtful people with a few special celebrations each month.
      </>
    ),
  },
  {
    question: "What is BuzzPlus?",
    answer: (
      <>
        BuzzPlus is ₦25,000/month and includes up to 20 surprise calls monthly.
        <br />
        <strong>Features:</strong>
        <ul className="list-disc ml-6 mt-1">
          <li>Perfect for affirmations, apologies, birthdays & “just because” calls</li>
          <li>Customizable messages for each call</li>
          <li>Faster processing & priority call slots</li>
        </ul>
        <strong>Perfect for:</strong> People who want to show love constantly.
      </>
    ),
  },
  {
    question: "What is BuzzOrbit?",
    answer: (
      <>
        BuzzOrbit is ₦50,000/month and includes 30+ premium calls monthly.
        <br />
        <strong>Features:</strong>
        <ul className="list-disc ml-6 mt-1">
          <li>Unlimited access to all premium call experiences</li>
          <li>Custom voice notes and preferred caller selection</li>
          <li>Bonus surprise calls and early access to Buzzthrills drops</li>
          <li>VIP scheduling & priority customer support</li>
        </ul>
        <strong>Perfect for:</strong> Families, executives, VIPs, content creators, and small businesses.
      </>
    ),
  },
  {
    question: "What is BuzzCorporate?",
    answer: (
      <>
        Custom pricing starting from ₦XX,XXX monthly. Built for companies, HR teams, and professionals.
        <br />
        <strong>Features:</strong>
        <ul className="list-disc ml-6 mt-1">
          <li>Number of calls depends on the project scope (min 35 calls)</li>
          <li>Full range of corporate call styles included</li>
          <li>Custom brand messaging, staff birthday & milestone reminders</li>
          <li>Monthly performance reports & dedicated account manager</li>
        </ul>
        <strong>Perfect for:</strong> Businesses that want consistent, professional appreciation for staff and clients.
      </>
    ),
  },
  {
    question: "How does subscription work?",
    answer: (
      <>
        All plans include:
        <ul className="list-disc ml-6 mt-1">
          <li>Subscriber information: Name, Email, Phone, Preferred contact method</li>
          <li>Recipient details with dynamic input per recipient</li>
          <li>Custom messages and call types included</li>
          <li>Additional preferences like call anonymity, billing, and notes</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I subscribe?",
    answer: (
      <>
        Visit the subscription page, select your plan, fill out subscriber information, add recipients, and submit. 
        <br />
        You can fill multiple recipients' details easily without overwhelming the form.
      </>
    ),
  },
];

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pb-20  px-4">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0"
        options={{
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.3 },
            color: { value: "#ffffff" },
          },
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "white",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          rotate: [0, 1, -1, 0],
          scale: [1, 1.02, 1, 1.02],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Optional Overlay Gradient */}
      <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-12 drop-shadow-lg">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden"
              layout
            >
              <motion.button
                className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-lg hover:bg-purple-700/30 transition"
                onClick={() => toggleIndex(idx)}
                initial={false}
              >
                {item.question}
                <span className="text-xl">{activeIndex === idx ? "−" : "+"}</span>
              </motion.button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    className="px-6 pb-4 text-gray-700 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
