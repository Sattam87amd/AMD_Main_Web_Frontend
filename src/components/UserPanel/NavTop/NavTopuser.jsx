"use client";

import React from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import Link from 'next/link'

// Dummy User Data (Replace this with backend data)
const userData = {
  name: "Basim Thakur",
  profilePic: "/ralphedwards.png", // Replace with dynamic image URL if needed
};

const Navtop = ({ activeTab }) => {
  return (
    <div className="flex justify-between items-center bg-white py-4 px-6 shadow-sm">
      {/* Left Section */}
      <div>
        <p className="text-gray-500 text-sm">Hi, {userData.name}</p>
        <h1 className="text-2xl font-bold">{activeTab}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Language Selector */}
        <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
          <span className="text-sm">EN</span>
          <FaChevronDown className="text-xs" />
        </div>

        {/* Notification Icon */}
        <div className="relative cursor-pointer hover:text-black">
          <FaBell className="text-lg" />
          <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
        </div>

        {/* Profile Section */}
        <Link href="/userpanel/userpanelprofile">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src={userData.profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
            <p className="text-sm font-semibold">{userData.name}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navtop;
