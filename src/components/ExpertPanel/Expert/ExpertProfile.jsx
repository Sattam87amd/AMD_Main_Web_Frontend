"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiShare2 } from "react-icons/fi";

const ExpertProfile = ({ activeTab }) => {
  const [expertData, setExpertData] = useState(null);
  const [expertId, setExpertId] = useState("");

  // Fetch expertId from localStorage
  useEffect(() => {
    const expertToken = localStorage.getItem("expertToken");
    const fetchExpertData = async () => {
      try {
        const response = await axios.get(`http://localhost:5070/api/expertauth/${expertId}`);
        setExpertData(response.data.data);  // Assuming the response follows { data: expert }
      } catch (error) {
        console.error("Error fetching expert data:", error);
      }
    };

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

  // Fetch user data using expertId
  useEffect(() => {
    if (expertId) {
      const fetchExpertData = async () => {
        try {
          const response = await axios.get(`http://localhost:5070/api/expertauth/${expertId}`);
          setExpertData(response.data.data);  // Assuming the response follows { data: expert }
        } catch (error) {
          console.error("Error fetching expert data:", error);
        }
      };

      fetchExpertData();
    }
  }, [expertId]);

  if (!expertData) {
    return <div>Loading...</div>; // Show a loading message until the data is fetched
  }

  return (
    <div className="flex-1 p-4 md:p-8 bg-white">
      {/* Header */}
      <div className="mt-6 flex flex-row md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 md:space-x-6">
          <img
            src={expertData.photoFile || "/default-profile.png"} // Use a default if no photo
            alt="Expert Profile"
            className="w-16 h-16 md:w-40 md:h-36 rounded-3xl"
          />
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-[#434966]">
              {expertData?.firstName || ""} {expertData?.lastName || ""}
            </h3>
            <p className="text-gray-500">{expertData?.areaOfExpertise || ""}</p>
            <p className="text-gray-500">{expertData?.country || ""}</p>
          </div>
        </div>
      </div>

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
        <ul className="text-[#0D70E5] list-disc ml-6 mt-2 space-y-2">
          <li>
            Add your booking link to two or more of the following bios:
            Instagram, LinkedIn, Twitter, or TikTok
          </li>
          <li>Complete 10 or more paid bookings through your link</li>
          <li>Generate at least $1,000 on the platform</li>
          <li>Maintain a rating above 4.8</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpertProfile;
