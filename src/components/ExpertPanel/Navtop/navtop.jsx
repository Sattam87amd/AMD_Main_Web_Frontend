"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image"; // Import Image from Next.js
import { FaBell, FaChevronDown } from "react-icons/fa";

const Navtop = ({ activeTab }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    photoFile: "",
  });

  // Fetch expertId from localStorage (similar to ProfileSection)
  const [expertId, setExpertId] = useState("");

  useEffect(() => {
    const expertToken = localStorage.getItem("expertToken");

    if (expertToken) {
      try {
        // Assuming the expertToken contains the _id directly (if it's JWT)
        const decodedToken = JSON.parse(atob(expertToken.split(".")[1])); // Decode JWT token
        const expertId = decodedToken._id;
        setExpertId(expertId); // Set the expertId to state
      } catch (error) {
        console.error("Error parsing expertToken:", error);
      }
    } else {
      alert("Expert token not found in localStorage");
    }
  }, []); // Runs once when the component mounts

  // Fetch user data using expertId (similar to ProfileSection)
  useEffect(() => {
    if (expertId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`https://amd-api.code4bharat.com/api/expertauth/${expertId}`); // Replace with actual API endpoint
          const { firstName, photoFile } = response.data.data;
          setUserData({ firstName, photoFile });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [expertId]); // Fetch data when expertId changes

  return (
    <div className="w-full flex justify-between items-center bg-white py-4 px-6 shadow-sm">
      {/* Left Section */}
      <div>
        <p className="text-gray-500 text-sm">Hi, {userData.firstName || "Loading..."}</p>
        <h1 className="text-2xl font-bold ">{activeTab}</h1>
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
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Use Next.js Image component for profile picture */}
          {userData.photoFile ? (
            <div className="relative w-10 h-10 overflow-hidden">
              <Image
                src={userData.photoFile} // Ensure this URL is valid and points to the image
                alt="Profile"
                width={100} // Set width (64px size for example)
                height={100} // Set height (64px size for example)
                className="rounded-full h-10"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300"></div> // Fallback if image is not loaded
          )}
          <p className="text-sm font-semibold">{userData.firstName || "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default Navtop;
