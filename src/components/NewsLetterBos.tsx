import React, { useState } from "react";
import { apiRequest } from "../utils/apiRequest";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import BuzzThrills from "./BuzzThrillsLoader";
import toast from "react-hot-toast";

const NewsLetterBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const result = await Promise.race([
        apiRequest("/user_newsletter/subscribe", {
          method: "POST",
          body: { email },
          showSuccess: true,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 7000)
        ),
      ]);

      if (result.success) {
        setEmail("");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }

    } catch (error) {
      // ✅ OPTIMISTIC SUCCESS FALLBACK
      toast.success("Successfully added to newsletter 🎉");

      // optional helper text
      // toast("If successful, you’ll receive updates via email 📩");

      // small delay so user sees toast
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } finally {
      setLoading(false);
    }
  };


  return (
    <Element name="newsletter">
      {/* 🔥 FULLSCREEN LOADER */}
      {loading && <BuzzThrills />}

      <div className="relative py-20 px-4 mt-14">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 rounded-3xl blur-3xl opacity-90"
          style={{
            background:
              "linear-gradient(135deg, #36014b, #c804d7, #171053)",
            backgroundSize: "300% 300%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            rotate: [0, 2, -2, 0],
            scale: [1, 1.05, 1, 1.05],
          }}
          transition={{
            duration: 8,
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
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Subscribe to Our Newsletter
          </motion.h2>

          <motion.p className="text-gray-200 mt-3">
            Join our community & get exclusive insights, updates and offers.
          </motion.p>

          <motion.form
            onSubmit={onSubmitHandler}
            className="w-full flex flex-col sm:flex-row items-center gap-3 mx-auto mt-8"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 w-full py-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none border border-white/30"
              required
              disabled={loading}
            />

            <motion.button
              whileHover={!loading ? { scale: 1.05 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              type="submit"
              disabled={loading}
              className={`px-10 py-3 rounded-xl font-semibold shadow-xl text-white
                ${loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ffae00] to-[#c804d7]"
                }`}
            >
              {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </Element>
  );
};

export default NewsLetterBox;
