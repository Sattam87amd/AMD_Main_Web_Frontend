"use client";

import React, { useState } from "react";
import { FaSearch, FaGift, FaUser, FaFilter, FaArrowLeft } from "react-icons/fa";

const NavSearch = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);

  // Filter Data
  const brands = ["Name", "Name", "Name", "Name", "Name", "Name", "Name", "Name"];
  const features = ["Name", "Name", "Name", "Name", "Name", "Name", "Name", "Name"];

  // Category Data
  const categories = [
    { title: "Top Experts", image: "/topexperts.png" },
    { title: "Home", image: "/home.png" },
    { title: "Career & Business", image: "/career&buisness.png" },
    { title: "Style & Beauty", image: "/style&beauty.png" },
    { title: "Wellness", image: "/wellness.png" },
  ];

  // Toggle Filter
  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <div className="bg-[#F8F7F3]  px-4 py-4">
      {/* Navbar */}
      <nav className="flex items-center justify-between w-full mb-6">
        {/* Left - Brand Name */}
        <div className="text-3xl font-bold text-black">AMD</div>

        {/* Middle - Search Box */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-xl mx-4">
          <input
            type="text"
            placeholder="Search Expert...."
            className="flex-grow outline-none text-gray-700 placeholder:text-gray-400"
          />
          <button className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md">
            <FaSearch className="text-gray-600" />
          </button>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4 relative">
          <FaGift className="text-xl text-gray-600 cursor-pointer" />
          <FaUser className="text-xl text-gray-600 cursor-pointer" />

          {/* Filter Icon with Dropdown */}
          <div className="relative">
            <FaFilter
              className={`text-xl cursor-pointer ${
                showFilter ? "text-black" : "text-gray-600"
              }`}
              onClick={toggleFilter}
            />

            {/* Filter Dropdown */}
            {showFilter && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 z-50">
                {/* Header - Back & Save */}
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

                {/* Brand Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Brand</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {brands.map((name, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 rounded-full ${
                          activeBrand === index
                            ? "bg-black text-white"
                            : "bg-gray-300 text-black"
                        }`}
                        onClick={() => setActiveBrand(index)}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {features.map((name, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 rounded-full ${
                          activeFeature === index
                            ? "bg-black text-white"
                            : "bg-gray-300 text-black"
                        }`}
                        onClick={() => setActiveFeature(index)}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Headline */}
      <h1 className="text-2xl font-bold text-black mb-4">
        Find The Right Expert In Seconds!
      </h1>

      {/* Categories Section */}
      <div className="flex items-center justify-between gap-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative w-56 h-32 rounded-xl overflow-hidden shadow-md cursor-pointer "
          >
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
              <p className="text-white font-semibold">{category.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavSearch;
