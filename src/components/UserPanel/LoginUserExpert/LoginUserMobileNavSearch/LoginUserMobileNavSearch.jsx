"use client";

import React, { useState } from "react";
import { FaSearch, FaGift, FaUser, FaFilter, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri"


const LoginUserMobileNavSearch = () => {
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

  const categories = [
    { title: "Top Experts", image: "/topexperts.png" },
    { title: "Home", image: "/home.png" },
    { title: "Career & Business", image: "/career&buisness.png" },
    { title: "Style & Beauty", image: "/style&beauty.png" },
    { title: "Wellness", image: "/wellness.png" },
  ];

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <div className="bg-[#F8F7F3] p-4">
      {/* Navbar */}
      <nav className="flex items-center justify-between mb-4">
        {/* Left - Brand Name */}
        <div className="text-2xl font-bold text-black flex items-center"
        ><RiArrowLeftSLine className="mr-2" onClick={() => navigate.back()} />
AMD</div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4 relative">
          <FaSearch className="text-xl text-gray-600 cursor-pointer" />
          <FaFilter
            className={`text-xl cursor-pointer ${
              showFilter ? "text-black" : "text-gray-600"
            }`}
            onClick={toggleFilter}
          />
          <FaGift className="text-xl text-gray-600 cursor-pointer" 
          onClick={() => router.push("/userpanel/usergiftsession")}/>
          <FaUser className="text-xl text-gray-600 cursor-pointer" 
          onClick={() => router.push("/userpanel/userprofile")}/>

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
      <h1 className="text-xl font-bold text-black mb-4">
        Find The Right Expert In Seconds!
      </h1>

      {/* Categories Section */}
      <div className="flex overflow-x-auto space-x-4 py-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative w-36 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md cursor-pointer"
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

export default LoginUserMobileNavSearch;
