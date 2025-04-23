'use client';

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import Footer from "../Layout/Footer";

const expertData = [
  {
    name: "Aaliya Abadi",
    price: "$450",
    image: "/aaliyaabadi.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
  {
    name: "Aisha Aziz",
    price: "$600",
    image: "/aishaaziz.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
  {
    name: "Jenny Wilson",
    price: "$250",
    image: "/jennywilson.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
  {
    name: "Guy Hawkins",
    price: "$1500",
    image: "/guyhawkins.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
  {
    name: "Ralph Edwards",
    price: "$450",
    image: "/ralphedwards.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
];

const SearchExperts = ({ closeSearchPage }) => {
  const [search, setSearch] = useState(""); // State for the search term
  const [filteredExperts, setFilteredExperts] = useState(expertData); // State for filtered experts

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive search
    setSearch(searchTerm);

    // Filter the expert data based on the search term
    const filtered = expertData.filter((expert) =>
      expert.name.toLowerCase().includes(searchTerm) ||
      expert.description.toLowerCase().includes(searchTerm)
    );

    setFilteredExperts(filtered); // Update filtered experts
  };

  return (
    <div className="bg-white p-0 relative min-h-screen px-1 mt-2">
      {/* NAVIGATION BAR - Centered Search Bar & Close Button */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center w-full mb-6 relative"
      >
        {/* Shourk Logo (Left Aligned) */}
        <div className="hidden md:block absolute left-4 text-3xl font-bold text-black">Shourk</div>

        {/* Centered Search Bar & Close Button */}
        <div className="flex items-center justify-center gap-2 w-full max-w-3xl">
          {/* Close Button (Centered but outside Search Bar) */}
          <button
            className="w-14 h-12 flex items-center justify-center bg-black text-white rounded-2xl transition-all duration-300"
            onClick={closeSearchPage}
          >
            <FaTimes className="text-white text-lg" />
          </button>

          {/* Full-Width Search Bar - Rounded & No Shadow */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center bg-white border rounded-2xl px-4 py-2 w-full relative"
          >
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange} // Call the search change handler
              className="flex-grow outline-none text-gray-700 placeholder:text-gray-400 bg-transparent text-lg"
            />

            {/* Search Icon */}
            <button className="w-12 h-12 flex items-center justify-center bg-[#EDECE8] hover:bg-gray-300 rounded-2xl transition-all duration-300">
              <FaSearch className="text-gray-600 text-lg" />
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* REPEATED POPULAR EXPERTS SECTIONS */}
      {filteredExperts.length > 0 ? (
        <div className="bg-white p-6 mt-6 rounded-lg ">
          {/* Heading Section */}
          <div className="flex flex-col md:flex-row md:h-40 items-center mb-6">
            <h2 className="text-2xl md:text-[60px] font-bold text-black">
              Popular Experts
            </h2>
          </div>

          {/* Cards Section */}
          <div className="overflow-x-auto md:overflow-visible">
            <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-10 px-4 md:px-0 overflow-x-scroll scrollbar-hide">
              {filteredExperts.map((expert, i) => (
                <Link key={i} href={`/expertaboutme`} passHref>
                  <div className="relative min-w-[280px] md:w-full h-[400px] flex-shrink-0 overflow-hidden rounded-lg cursor-pointer">
                    {/* Expert Image */}
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-[#F8F7F3] text-black px-4 py-2 rounded-2xl font-semibold">
                      {expert.price}
                    </div>

                    {/* Transparent Blur Card */}
                    <div className="absolute bottom-1 left-1 right-1 bg-white/80 p-4 m-2 rounded-lg">
                      <h3 className="text-lg font-semibold text-black flex items-center gap-1">
                        {expert.name}
                        <HiBadgeCheck className="w-6 h-6 text-yellow-500" />
                      </h3>
                      <p className="text-xs text-black mt-1">
                        {expert.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center p-6">
          <p className="text-xl font-semibold">No experts found for "{search}"</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SearchExperts;
