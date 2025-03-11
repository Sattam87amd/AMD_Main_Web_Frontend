"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaVideo, FaUser, FaCheckCircle, FaThLarge } from "react-icons/fa";

const BottomNav = () => {
  const [active, setActive] = useState("Profile"); // Default active

  const navItems = [
    { label: "Search Experts", icon: <FaSearch size={28} />, id: "search" },
    { label: "Video Call", icon: <FaVideo size={28} />, id: "video" },
    { label: "Profile", icon: <FaUser size={28} />, id: "profile" },
    { label: "Expert", icon: <FaCheckCircle size={28} />, id: "expert" },
    { label: "Dashboard", icon: <FaThLarge size={28} />, id: "dashboard" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around items-center border-t">
      {navItems.map((item) => (
        <Link href="#" key={item.id}>
          <div
            onClick={() => setActive(item.id)}
            className={`flex flex-col items-center cursor-pointer ${
              active === item.id ? "text-red-500" : "text-black"
            }`}
          >
            {item.icon}
            <span className="text-sm font-semibold mt-1">{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
