import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import type { Settings } from "react-slick";

import "slick-carousel/slick/slick-theme.css";

interface TestimonialType {
  image: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: TestimonialType[] = [
  {
    image: "/images/user1.jpg",
    name: "Sarah Johnson",
    role: "Founder, Nova Labs",
    text: "Working with this team completely transformed our product. The execution and marketing clarity were top-tier.",
    rating: 5,
  },
  {
    image: "/images/user2.jpg",
    name: "David Kim",
    role: "Growth Lead, MetaForge",
    text: "One of the smartest strategic minds I’ve worked with. Delivery was smooth, communication was elite.",
    rating: 5,
  },
  {
    image: "/images/user3.jpg",
    name: "Maria Perez",
    role: "Web3 PM, ChainWave",
    text: "Truly understands Web3 users and how to scale products. Highly recommended!",
    rating: 4,
  },
];

const Testimonial: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="w-full py-16 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-10 text-gray-800"
      >
        What People Are Saying
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl mx-auto"
      >
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="px-4"
            >
              <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover mb-4 shadow-md"
                />

                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{item.role}</p>

                <p className="text-gray-600 text-base mb-4 leading-relaxed">
                  “{item.text}”
                </p>

                <div className="flex justify-center">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                  {Array.from({ length: 5 - item.rating }).map((_, i) => (
                    <span key={i} className="text-gray-300 text-xl">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
};

export default Testimonial;
