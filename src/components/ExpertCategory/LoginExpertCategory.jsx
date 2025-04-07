"use client";
import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { motion } from "framer-motion";
import Link from "next/link";

const LoginExpertCategory = ({ selectedFilter, setSelectedFilter }) => {
  const categories = [
    { title: "Top Experts", image: "/topexperts.png", link: "/expertpanel/topexperts" },
    { title: "Home", image: "/home.png", link: "/expertpanel/homeexperts" },
    { title: "Career & Business", image: "/career-business.png", link: "/expertpanel/career&business" },
    { title: "Style & Beauty", image: "/style-beauty.png", link: "/style&beautyexperts" },
    { title: "Wellness", image: "/wellness.png", link: "/wellnessexperts" },
  ];

  const filterOptions = [
    { label: "Recommended", value: "recommended" },
    { label: "Price High - Low", value: "price_high_low" },
    { label: "Price Low - High", value: "price_low_high" },
    { label: "Highest Rating", value: "highest_rating" },
    { label: "Most Reviewed", value: "most_reviewed" },
    { label: "Expert Language - Arabic", value: "language_arabic" },
    { label: "Expert Language - English", value: "language_english" },
  ];

  const [showFilterBox, setShowFilterBox] = useState(false);

  const handleCategoryClick = (link) => {
    window.location.href = link;
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const toggleFilterBox = () => setShowFilterBox(!showFilterBox);

  return (
    <div className="bg-[#F8F7F3] px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl md:text-3xl font-semibold text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find The Right Expert In Seconds!
        </motion.h1>
        <motion.button
          onClick={toggleFilterBox}
          className="bg-black text-white p-2 rounded-2xl flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CiFilter size={30} />
          <span>Filter</span>
        </motion.button>
      </div>

      {showFilterBox && (
        <motion.div
          className="bg-white p-4 rounded-md shadow-lg w-64 absolute top-16 right-4 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Filter</h3>
          <form>
            {filterOptions.map((option) => (
              <div key={option.value} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={option.value}
                  name="filter"
                  value={option.value}
                  checked={selectedFilter === option.value}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label htmlFor={option.value} className="text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </form>
          <div className="flex justify-end mt-4">
            <button 
              className="bg-black text-white px-4 py-2 rounded-lg" 
              onClick={toggleFilterBox}
            >
              Save
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        className="overflow-x-auto md:overflow-x-auto md:ml-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex gap-4 md:gap-x-32 md:px-4 md:pb-2 scrollbar-hide">
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
