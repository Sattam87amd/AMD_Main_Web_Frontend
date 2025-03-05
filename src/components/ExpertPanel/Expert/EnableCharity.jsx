import React, { useState } from "react";

const EnableCharity = () => {
  const [charityData, setCharityData] = useState({
    name: "Charity",
    percentage: "0%",
  });

  const [isEnabled, setIsEnabled] = useState(false); // Toggle state

  // Function to handle save button click
  const handleSave = () => {
    console.log("Charity Data Saved:", charityData);
    console.log("Charity Enabled:", isEnabled);
  };

  return (
    <div className="bg-white rounded-2xl p-1 space-y-6">
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
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-2.5 py-4"
            placeholder="0%"
          />
        </div>

      {/* Save Button */}
      <div className="flex justify-center items-center mt-8 pt-20">
        <button
          onClick={handleSave}
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
