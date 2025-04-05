"use client";
import React from "react";
import { IoPersonOutline } from "react-icons/io5"; // Updated profile icon
import { Gift } from "lucide-react"; // Updated gift icon
import { FaSearch } from "react-icons/fa"; // Search icon
import { motion } from "framer-motion";
import ExpertCategory from "../ExpertCategory/ExpertCategory";

const NavSearch = () => {
  return (
    <div className="hidden md:block bg-[#F8F7F3] px-4 py-4 relative">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between w-full mb-6"
      >
        <div className="text-3xl font-bold text-black">AMD</div>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center bg-white rounded-2xl px-4 py-2 w-full max-w-2xl mx-4 shadow-lg"
        >
          <input
            type="text"
            placeholder="Search Expert...."
            className="flex-grow outline-none text-gray-700 placeholder:text-gray-400 text-lg"
          />
          <button className="w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md transition-all duration-300">
            <FaSearch className="text-gray-600 text-2xl" />
          </button>
        </motion.div>
        <div className="flex items-center space-x-6">
          <motion.div whileHover={{ scale: 1.2 }}>
            <Gift className="w-10 h-10 text-black cursor-pointer" /> {/* Corrected size and color */}
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <IoPersonOutline className="text-4xl text-black font-semibold cursor-pointer" /> {/* Increased size and color */}
          </motion.div>
        </div>
      </motion.nav>

      <ExpertCategory />
    </div>
  );
};

export default NavSearch;
