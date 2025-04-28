'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import Footer from "../Layout/Footer";

const SearchExperts = ({ closeSearchPage }) => {
  const [search, setSearch] = useState("");
  const [allExperts, setAllExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await fetch(`http://localhost:5070/api/expertauth/`); 
        const data = await res.json();

        if (res.ok) {
          const initialExperts = data.data.filter((expert) => expert.averageRating >= 4);
          setAllExperts(data.data);
          setFilteredExperts(initialExperts);
        } else {
          console.error("Failed to fetch experts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };

    fetchExperts();
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    if (searchTerm === "") {
      const topRated = allExperts.filter((expert) => expert.averageRating >= 4);
      setFilteredExperts(topRated);
    } else {
      const filtered = allExperts.filter((expert) =>
        `${expert.firstName} ${expert.lastName}`.toLowerCase().includes(searchTerm) ||
        expert.experience?.toLowerCase().includes(searchTerm)
      );
      setFilteredExperts(filtered);
    }
  };

  return (
    <div className="bg-white p-0 relative min-h-screen px-1 mt-2 border-4">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center w-full mb-6 relative "
      >
        <div className="hidden md:block absolute left-4 text-3xl font-bold text-black">Shourk</div>

        <div className="flex items-center justify-center gap-2 w-full max-w-3xl">
          <button
            className="w-14 h-12 flex items-center justify-center bg-black text-white rounded-2xl transition-all duration-300"
            onClick={closeSearchPage}
          >
            <FaTimes className="text-white text-lg" />
          </button>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center bg-white border rounded-2xl px-4 py-2 w-full relative"
          >
            <input
              type="text"
              placeholder="Search experts..."
              value={search}
              onChange={handleSearchChange}
              className="flex-grow outline-none text-gray-700 placeholder:text-gray-400 bg-transparent text-lg"
            />
            <button className="w-12 h-12 flex items-center justify-center bg-[#EDECE8] hover:bg-gray-300 rounded-2xl transition-all duration-300">
              <FaSearch className="text-gray-600 text-lg" />
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Experts List */}
      {filteredExperts.length > 0 ? (
        <div className="bg-white p-6 mt-6 rounded-lg">
          <div className="flex flex-col md:flex-row md:h-40 items-center mb-6">
            <h2 className="text-2xl md:text-[60px] font-bold text-black">
              Popular Experts
            </h2>
          </div>

          <div className="overflow-x-auto md:overflow-visible">
            <div className="flex gap-4 md:gap-10 px-4 md:px-0 overflow-x-scroll custom-scrollbar-hide scrollbar-hide">
              {filteredExperts.map((expert) => (
                <Link
                  key={expert._id}
                  href={`/expertaboutme/${expert._id}`} 
                  passHref
                >
                  <div className="relative min-w-[280px] md:w-full h-[400px] flex-shrink-0 overflow-hidden rounded-lg cursor-pointer">
                    <img
                      src={expert.photoFile || "/default-profile.png"}
                      alt={`${expert.firstName} ${expert.lastName}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#F8F7F3] text-black px-4 py-2 rounded-2xl font-semibold">
                      SAR {expert.price || 0}
                    </div>
                    <div className="absolute bottom-1 left-1 right-1 bg-white/80 p-4 m-2 rounded-lg">
                      <h3 className="text-lg font-semibold text-black flex items-center gap-1">
                        {expert.firstName} {expert.lastName}
                        <HiBadgeCheck className="w-6 h-6 text-yellow-500" />
                      </h3>
                      <p className="text-xs text-black mt-1">
                        {expert.experience ? expert.experience.slice(0, 100) : "No description"}...
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
