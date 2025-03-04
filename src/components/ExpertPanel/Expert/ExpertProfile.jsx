'use client';

import { useState } from 'react';
import { FaUser, FaCheckCircle, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { LuPencilLine } from 'react-icons/lu';
import { FiShare2 } from "react-icons/fi";

const ExpertProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [expertData, setExpertData] = useState({
    firstName: "Basim",
    lastName: "Thakur",
    expertise: "Software Development",
    country: "India",
    experience: "5 Years",
    availability: "Monday - Friday, 10 AM - 6 PM",
  });

  const handleInputChange = (e) => {
    setExpertData({ ...expertData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSuccessMessage("Changes Saved!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="flex-1 p-4 md:p-8 bg-white">
      
      {/* Header */}
      <div className="mt-6 flex flex-row md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 md:space-x-6">
          <img src="/guyhawkins.png" alt="Expert Profile" className="w-16 h-16 md:w-40 md:h-36 rounded-3xl" />
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-[#434966]">
              {expertData.firstName} {expertData.lastName}
            </h3>
            <p className="text-gray-500">{expertData.expertise}</p>
            <p className="text-gray-500">{expertData.country}</p>
          </div>
        </div>
        <button 
          className="border border-[#434966] px-4 md:px-5 py-2 text-[#434966] font-semibold rounded-lg flex items-center gap-2" 
          onClick={handleEditClick}>
          Edit <LuPencilLine className="text-black h-5 w-5" />
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 flex items-center text-green-600 font-medium">
          <FaCheckCircle className="mr-2" /> {successMessage}
        </div>
      )}

      {/* Marketing Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-black">Marketing</h2>
        <p className="text-[#7E7E7E] mt-1 py-2">Share your booking link:</p>
        
        <div className="relative mt-3">
          <input 
            type="text" 
            id="large-input" 
            className="block w-full p-4 pr-10 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://your-booking-link.com"
          />
          <FiShare2 className="absolute top-4 right-4 text-gray-500 text-xl cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      {/* Verification Checkmark Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-black">Verification Checkmark</h2>
        <p className="text-[#0D70E5] mt-2 py-5">
          To be considered for verification, you need to do the following:
        </p>
        <ul className="text-[#0D70E5]  list-disc ml-6 mt-2 space-y-2">
          <li>Add your booking link to two or more of the following bios: Instagram, LinkedIn, Twitter, or TikTok</li>
          <li>Complete 10 or more paid bookings through your link</li>
          <li>Generate at least $1,000 on the platform</li>
          <li>Maintain a rating above 4.8</li>
        </ul>
      </div>

    </div>
  );
};

export default ExpertProfile;
