"use client";

import React, { useState } from "react";
import { FaSearch, FaGift, FaUser, FaFilter, FaArrowLeft } from "react-icons/fa";

const MobileNavSeearch = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filterOptions = [
    { label: "Recommended", value: "recommended" },
    { label: "Price High - Low", value: "price_high_low" },
    { label: "Price Low - High", value: "price_low_high" },
    { label: "Highest Rating", value: "highest_rating" },
    { label: "Most Reviewed", value: "most_reviewed" },
    { label: "Expert Language - Arabic", value: "language_arabic" },
    { label: "Expert Language - English", value: "language_english" },
  ];

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <div className="bg-[#F8F7F3] p-4">
      {/* Navbar */}
      <nav className="flex items-center justify-between mb-4">
        {/* Left - Brand Name */}
        <div className="text-2xl font-bold text-black">Shourk</div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4 relative">
          <FaSearch className="text-xl text-gray-600 cursor-pointer" />
          <FaFilter
            className={`text-xl cursor-pointer ${
              showFilter ? "text-black" : "text-gray-600"
            }`}
            onClick={toggleFilter}
          />
          <FaGift className="text-xl text-gray-600 cursor-pointer" />
          <FaUser className="text-xl text-gray-600 cursor-pointer" />

          {/* Filter Dropdown */}
          {showFilter && (
            <div className="absolute right-0 w-80 bg-white shadow-xl rounded-xl p-4 z-50 mt-72">
              <div className="flex items-center justify-between mb-4">
                <button
                  className="flex items-center space-x-2"
                  onClick={toggleFilter}
                >
                  <FaArrowLeft />
                  <span>Filter</span>
                </button>
                <button
                  className="bg-black text-white px-4 py-2 rounded-lg"
                  onClick={toggleFilter}
                >
                  Save
                </button>
              </div>

              <div className="mt-2">
                <h3 className="text-lg font-semibold mb-2">Sort By</h3>
                <form>
                  {filterOptions.map((option) => (
                    <div key={option.value} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={option.value}
                        name="filter"
                        value={option.value}
                        checked={selectedFilter === option.value}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor={option.value} className="text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Headline */}
      {/* <h1 className="text-xl font-bold text-black mb-4">
        Find The Right Expert In Seconds!
      </h1> */}
    </div>
  );
};

export default MobileNavSeearch;
