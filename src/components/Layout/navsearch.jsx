"use client";

import React, { useState } from "react";
import { FaSearch, FaGift, FaUser, FaFilter, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NavSearch = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);

  // Filter Data
  const brands = ["Name", "Name", "Name", "Name", "Name", "Name", "Name", "Name"];
  const features = ["Name", "Name", "Name", "Name", "Name", "Name", "Name", "Name"];

  // Category Data with Links
  const categories = [
    { title: "Top Experts", image: "/topexperts.png", link: "/topexpert" },
    { title: "Home", image: "/home.png", link: "/homeexpert" },
    { title: "Career & Business", image: "/career-business.png", link: "/career&businessexperts" },
    { title: "Style & Beauty", image: "/style-beauty.png", link: "/style&beautyexperts" },
    { title: "Wellness", image: "/wellness.png", link: "/wellnessexperts" },
  ];

  // Toggle Filter
  const toggleFilter = () => setShowFilter(!showFilter);

  // Handle Category Click
  const handleCategoryClick = (link) => {
    window.location.href = link;
  };

  return (
    <div className="bg-[#F8F7F3] px-4 py-4">
      {/* Navbar with Animation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between w-full mb-6"
      >
        {/* Left - Brand Name */}
        <div className="text-3xl font-bold text-black">AMD</div>

        {/* Middle - Search Box */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-xl mx-4 shadow-lg"
        >
          <input
            type="text"
            placeholder="Search Expert...."
            className="flex-grow outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md transition-all duration-300">
            <FaSearch className="text-gray-600" />
          </button>
        </motion.div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4 relative">
          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
            <FaGift className="text-xl text-gray-600 cursor-pointer" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
            <FaUser className="text-xl text-gray-600 cursor-pointer" />
          </motion.div>

          {/* Filter Icon */}
          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-md transition-all"
              onClick={toggleFilter}
            >
              <FaFilter className="text-gray-600" />
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-2xl font-bold text-black mb-4"
      >
        Find The Right Expert In Seconds!
      </motion.h1>

      {/* Categories Section with Hover Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between gap-4"
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleCategoryClick(category.link)}
            className="relative w-56 h-32 rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
              <p className="text-white font-semibold">{category.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Dropdown Animation */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute right-0 mt-4 w-80 bg-white shadow-xl rounded-xl p-4 z-50"
          >
            {/* Header - Back & Save */}
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center space-x-2" onClick={toggleFilter}>
                <FaArrowLeft />
                <span>Filter</span>
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={toggleFilter}>
                Save
              </button>
            </div>

            {/* Brand Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Brand</h3>
              <div className="grid grid-cols-4 gap-2">
                {brands.map((name, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={`px-3 py-1 rounded-full ${
                      activeBrand === index ? "bg-black text-white" : "bg-gray-300 text-black"
                    }`}
                    onClick={() => setActiveBrand(index)}
                  >
                    {name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="grid grid-cols-4 gap-2">
                {features.map((name, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={`px-3 py-1 rounded-full ${
                      activeFeature === index ? "bg-black text-white" : "bg-gray-300 text-black"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    {name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavSearch;
