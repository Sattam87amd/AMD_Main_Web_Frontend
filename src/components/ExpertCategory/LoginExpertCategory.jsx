"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const LoginExpertCategory = ({ selectedFilter, setSelectedFilter }) => {
  const categories = [
    { title: "Top Experts", image: "/topexperts.png", link: "/expertpanel/topexperts" },
    { title: "Home", image: "/home.png", link: "/expertpanel/homeexperts" },
    { title: "Career & Business", image: "/career-business.png", link: "/expertpanel/career&business" },
    { title: "Style & Beauty", image: "/style-beauty.png", link: "/expertpanel/style&beautyexperts" },
    { title: "Wellness", image: "/wellness.png", link: "/expertpanel/wellnessexperts" },
  ];

  const handleCategoryClick = (link) => {
    window.location.href = link;
  };

  return (
    <div className="bg-[#F8F7F3] px-4 py-6">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl md:text-3xl font-semibold text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find The Right Expert In Seconds!
        </motion.h1>
      </div>

      {/* Categories */}
      <motion.div
        className="overflow-x-auto md:overflow-x-auto md:ml-16 custom-scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex gap-4 md:gap-x-32 md:px-4 md:pb-2">
          {categories.map((category, index) => (
            <Link href={category.link} key={index} passHref>
              <motion.div
                onClick={() => handleCategoryClick(category.link)}
                className={`relative flex-shrink-0 min-w-[130px] md:min-w-[200px] h-20 md:h-32 rounded-xl overflow-hidden shadow-md cursor-pointer ${
                  selectedFilter === category.title ? "border-4 border-black rounded-xl" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-multiply"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
                  <p className="text-white font-semibold md:text-lg">{category.title}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginExpertCategory;
