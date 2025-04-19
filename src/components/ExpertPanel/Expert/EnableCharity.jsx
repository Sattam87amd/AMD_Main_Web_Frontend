import React, { useState, useEffect } from "react";
import axios from "axios";

const EnableCharity = () => {
  const [charityData, setCharityData] = useState({
    name: "Charity",
    percentage: "0%",
  });

  const [isEnabled, setIsEnabled] = useState(false); // Toggle state
  const [expertId, setExpertId] = useState(null); // To store expert's ID
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [errorSessions, setErrorSessions] = useState("");

  // Fetch expertId from localStorage and decode JWT token to get expertId
  useEffect(() => {
    const expertToken = localStorage.getItem('expertToken');  // Get the token from localStorage

    if (expertToken) {
      try {
        // Decode JWT token to get the expert's _id (MongoDB ObjectId)
        const decodedToken = JSON.parse(atob(expertToken.split(".")[1])); // Decode JWT token
        const expertId = decodedToken._id;
        setExpertId(expertId); // Set the expertId to state

        // Fetch charity settings once expertId is set
        fetchCharitySettings(expertId);
      } catch (error) {
        console.error("Error parsing expertToken:", error);
      }
    } else {
      alert("Expert token not found in localStorage");
    }
  }, []);

  const fetchCharitySettings = async (expertId) => {
    try {
      setLoadingSessions(true);
      const token = localStorage.getItem("expertToken");
  
      if (!token) {
        setErrorSessions("Token is required");
        return;
      }
  
      // Fetch expert details by ID, using the existing `getExpertById` route
      const response = await axios.get(
        `http://localhost:5070/api/expertauth/${expertId}`, // Backend API endpoint with expertId
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the header for authorization
          },
        }
      );
  
      if (response.data.success) {
        // Extract charity-related details from the response data
        const { charityEnabled, charityPercentage, charityName } = response.data.data;
  
        // Update your state based on the fetched data
        setIsEnabled(charityEnabled);
        setCharityData({
          name: charityName || "Charity", // Fallback to 'Charity' if charityName is undefined
          percentage: `${charityPercentage}%` || "0%", // Fallback to "0%" if charityPercentage is undefined
        });
      } else {
        setErrorSessions("Failed to fetch charity settings");
      }
    } catch (error) {
      console.error("Error fetching charity settings:", error);
      setErrorSessions("Error fetching charity settings");
    } finally {
      setLoadingSessions(false);
    }
  };

  // Function to handle save button click
  const handleSave = async () => {
    console.log("Charity Data Saved:", charityData);
    console.log("Charity Enabled:", isEnabled);

    if (!expertId) {
      console.error("Expert ID not found.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5070/api/expertauth/update-charity", // Correct backend endpoint
        {
          charityEnabled: isEnabled,
          charityPercentage: parseInt(charityData.percentage, 10),
          charityName: charityData.name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('expertToken')}`,
            expertid: expertId, // Send expertId to backend
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Charity settings updated successfully!");
      }
    } catch (error) {
      console.error("Error updating charity settings:", error);
      alert("There was an error updating the charity settings.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-1 space-y-6">
      {loadingSessions && <div>Loading...</div>}
      {errorSessions && <div>{errorSessions}</div>}

      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-semibold text-black">
          Enable Charity
        </h2>

        {/* Toggle Switch */}
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
          <div
            className={`relative w-11 h-6 rounded-full transition ${
              isEnabled ? "bg-black" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-[2px] left-[2px] bg-white border-gray-300 border w-5 h-5 rounded-full transition-all ${
                isEnabled ? "translate-x-full border-white" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>

      {/* Charity Form - Disabled when toggle is off */}
      <div className={`${!isEnabled ? "opacity-50 pointer-events-none" : ""}`}>
        <div className="mt-4">
          <label className="block text-black text-sm font-semibold mb-3">
            Name of Charity
          </label>
          <input
            type="text"
            value={charityData.name}
            onChange={(e) =>
              setCharityData({ ...charityData, name: e.target.value })
            }
            disabled={!isEnabled} // Disable input when toggle is off
            className="bg-white border border-gray-300 text-gray-600 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-2.5 py-4"
            placeholder="Charity"
          />
        </div>

        <div className="mt-4">
          <label className="block text-black text-sm font-semibold mb-3">
            What % of proceeds would you like to donate?
          </label>
          <input
            type="text"
            value={charityData.percentage}
            onChange={(e) =>
              setCharityData({ ...charityData, percentage: e.target.value })
            }
            disabled={!isEnabled} // Disable input when toggle is off
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-2.5 py-4"
            placeholder="0%"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-center items-center mt-8 pt-20">
          <button
            onClick={handleSave}
            disabled={!isEnabled} // Disable button when toggle is off
            className="w-44 bg-black text-white text-sm font-semibold py-2.5 rounded-2xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnableCharity;
