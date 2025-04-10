"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaChevronDown } from "react-icons/fa";
import Link from 'next/link';
import Image from "next/image"; // Import Image from Next.js

const Navtop = ({ activeTab }) => {
  const [userData, setUserData] = useState({
    name: "",
    profilePic: "",
  });

  const [expertId, setExpertId] = useState("");

  // Fetch expertId from localStorage
  useEffect(() => {
    const expertToken = localStorage.getItem("expertToken");
    if (expertToken) {
      try {
        // Assuming expertToken contains the JWT, decoding it to get expertId
        const decodedToken = JSON.parse(atob(expertToken.split(".")[1]));
        setExpertId(decodedToken._id); // Save expertId to state
      } catch (error) {
        console.error("Error parsing expertToken:", error);
      }
    } else {
      alert("Expert token not found in localStorage");
    }
  }, []);

  // Fetch user data using expertId
  useEffect(() => {
    if (expertId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/expertauth/${expertId}`); // Replace with your actual endpoint
          const { firstName, photoFile } = response.data.data;
          setUserData({
            name: firstName,
            profilePic: photoFile || "/default-profile.png", // Default image if no profile pic is available
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [expertId]);

  return (
    <div className="flex justify-between items-center bg-white py-4 px-6 shadow-sm">
      {/* Left Section */}
      <div>
        <p className="text-gray-500 text-sm">Hi, {userData.name || "Loading..."}</p>
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
            {/* Profile Image */}
            <div className="relative w-8 h-8 rounded-full">
              <Image
                src={userData.profilePic} // Dynamically fetched image URL
                alt="Profile"
                width={32} // Set width (32px size for example)
                height={32} // Set height (32px size for example)
                className="rounded-full object-cover border border-gray-300"
              />
            </div>
            <p className="text-sm font-semibold">{userData.name || "Loading..."}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navtop;
