import React from "react";
import Particles from "react-tsparticles";
import { motion } from "framer-motion";
import { home_banner } from "../assets";
import { Link } from "react-scroll";

// import heroImage from "../assets/hero-image.png"; // replace with your image path

const HeroSection: React.FC = () => {



    return (
        <section className="relative h-screen flex items-center overflow-hidden">
            {/* Animated Gradient Background */}


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

            <motion.div
                className="absolute w-full h-full top-0 left-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-70"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(135deg, #36014b, #c804d7, #171050)",
                    backgroundSize: "300% 300%",
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    rotate: [0, 1, -1, 0],
                    scale: [1, 1.02, 1, 1.02],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            {/* Floating Blobs */}



            {/* Content Container */}
            <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 z-10">



                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex-1 text-center md:text-left"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg"
                    >
                        BuzzThrills Prime
                    </motion.h1>



                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-6 text-lg md:text-xl text-white/90 max-w-md"
                    >
                        You never forget, because we never let you. Get personalized calls,
                        special reminders, and curated surprises delivered straight to your loved ones.
                    </motion.p>

                    <Link
                        to="newsletter"
                        smooth={true}
                        duration={800}
                        offset={-80} // adjust if you have a fixed navbar
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-12 py-4 bg-gradient-to-r from-[#ffae00] to-[#c804d7] text-white font-bold rounded-2xl shadow-2xl"
                        >
                            SUBSCRIBE NOW
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex-1"
                >
                    <img
                        src={home_banner}
                        alt="BuzzThrills Illustration"
                        className="w-full rounded-3xl max-w-md mx-auto md:mx-0"
                    />
                </motion.div>bg-[#f4f4f4]

            </div>

            {/* Optional Overlay Gradient */}
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
        </section>
    );
};

export default HeroSection;
