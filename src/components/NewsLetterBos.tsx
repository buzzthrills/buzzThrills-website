import React, { useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import { motion } from "framer-motion";
import { Element } from "react-scroll";

const NewsLetterBox: React.FC = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success } = await apiRequest("/user_newsletter/subscribe", {
      method: "POST",
      body: { email },
      showSuccess: true,
    });

    if (success) {
      setEmail("");
    }
  };

  return (
    <Element name="newsletter">

      <div className="relative py-20 px-4 mt-14">

        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 rounded-3xl blur-3xl opacity-90"
          style={{
            background:
              "linear-gradient(135deg, #36014b, #c804d7, #171053)",
            backgroundSize: "300% 300%", // bigger gradient for more movement
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            rotate: [0, 2, -2, 0], // subtle rotation for more dynamic effect
            scale: [1, 1.05, 1, 1.05], // slight scale pulsing
          }}
          transition={{
            duration: 8, // faster movement
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-2xl mx-auto p-10 shadow-2xl text-center"
        >

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm"
          >
            Subscribe to Our Newsletter
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-200 mt-3"
          >
            Join our community & get exclusive insights, updates and offers.
          </motion.p>

          {/* Form */}
          <motion.form
            onSubmit={onSubmitHandler}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full flex flex-col sm:flex-row items-center gap-3 mx-auto mt-8"
          >

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 w-full py-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none border border-white/30 focus:ring-2 focus:ring-[#ffae00]"
              required
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-gradient-to-r from-[#ffae00] to-[#c804d7] text-white font-semibold px-10 py-3 rounded-xl shadow-xl"
            >
              SUBSCRIBE
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </Element>

  );
};

export default NewsLetterBox;
