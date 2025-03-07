"use client";
import React, { useState, useEffect } from "react";

const VideoSessionPrices = () => {
  // State for selected session lengths
  const [selectedTimes, setSelectedTimes] = useState([]);

  // State for each session's price and discount
  const [prices, setPrices] = useState({});
  const [discounts, setDiscounts] = useState({});

  // State for the coupon cards
  const [coupons, setCoupons] = useState([
    { name: "FreeAMD", discountPercent: 15 },
    { name: "FreeAMD", discountPercent: 15 },
  ]);

  // State for managing the discount modal
  const [showModal, setShowModal] = useState(false);
  const [selectedCouponIndex, setSelectedCouponIndex] = useState(null);
  const [newDiscount, setNewDiscount] = useState("");

  // Load stored values on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSessions = localStorage.getItem("selected_sessions");
      if (storedSessions) setSelectedTimes(JSON.parse(storedSessions));

      const storedPrices = localStorage.getItem("session_prices");
      if (storedPrices) setPrices(JSON.parse(storedPrices));

      const storedDiscounts = localStorage.getItem("session_discounts");
      if (storedDiscounts) setDiscounts(JSON.parse(storedDiscounts));

      const storedCoupons = localStorage.getItem("session_coupons");
      if (storedCoupons) setCoupons(JSON.parse(storedCoupons));
    }
  }, []);

  // Handle price input change
  const handlePriceChange = (time, value) => {
    setPrices((prev) => ({
      ...prev,
      [time]: value,
    }));
  };

  // Handle discount input change
  const handleDiscountChange = (time, value) => {
    setDiscounts((prev) => ({
      ...prev,
      [time]: value,
    }));
  };

  // Handle saving all data to localStorage
  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("session_prices", JSON.stringify(prices));
      localStorage.setItem("session_discounts", JSON.stringify(discounts));
      localStorage.setItem("session_coupons", JSON.stringify(coupons));
      alert("Rates saved!");
    }
  };

  // Open modal when a coupon is clicked
  const handleCouponClick = (index) => {
    setSelectedCouponIndex(index);
    setNewDiscount(coupons[index].discountPercent);
    setShowModal(true);
  };

  // Update discount on save
  const handleSaveDiscount = () => {
    const updatedCoupons = [...coupons];
    updatedCoupons[selectedCouponIndex].discountPercent = Number(newDiscount);
    setCoupons(updatedCoupons);
    setShowModal(false);

    if (typeof window !== "undefined") {
      localStorage.setItem("session_coupons", JSON.stringify(updatedCoupons));
    }
  };

  return (
    <div className="w-full flex flex-col items-start px-4 md:px-0 py-1 md:py-1">
      {/* Heading */}
      <h2 className="text-lg md:text-3xl font-semibold mb-1 w-full md:w-auto">
        Set your rates
      </h2>
      <p className="hidden md:block text-[#7E7E7E] text-sm md:text-base font-semibold mb-6 md:mb-8 w-full md:w-auto">
        Set your price for a 15 minute video call or a group call & <br />
        we’ll calculate the rest
      </p>
      <p className="text-[#7E7E7E] text-sm font-semibold mb-6 md:hidden">
        Set your price for a 15 minute video call or a group call & we’ll calculate the rest
      </p>

      {/* Video Calls heading */}
      <h3 className="text-base md:text-3xl font-semibold text-left w-full mb-2">
        Video calls
      </h3>

      {/* Available Discount Coupons heading */}
      <h3 className="text-base md:text-3xl font-semibold text-left py-4 w-full mb-2">
        Available Discount Coupons
      </h3>

      {/* Coupon Cards */}
      <div className="flex flex-col w-full flex-wrap gap-3 mb-8">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            onClick={() => handleCouponClick(index)}
            className="cursor-pointer flex items-start justify-between 
                       border border-[#EAEAEA] px-4 py-5 
                       rounded-2xl text-sm md:text-lg 
                       hover:shadow-sm transition-shadow"
          >
            <span className="mr-2 font-bold">{coupon.name}</span>
            <span className="text-black font-semibold">
              {coupon.discountPercent}% OFF
            </span>
          </div>
        ))}
      </div>

      {/* Show column headings only if times are selected */}
      {selectedTimes.length > 0 && (
        <div className="w-full grid grid-cols-3 items-center gap-2 md:gap-1 mb-2 md:mb-4">
          <div className="text-sm md:text-base font-semibold"></div>
          <div className="text-sm md:text-base font-semibold md:mr-36 text-black text-center">
            Price
          </div>
          <div className="text-sm md:text-base font-semibold md:mr-32 text-black text-center">
            Discount
          </div>
        </div>
      )}

      {/* Rows of session times, Price, and Discount */}
      <div className="w-full flex flex-col gap-4">
        {selectedTimes.map((time) => {
          const isFifteen = time === 15;
          return (
            <div
              key={time}
              className="w-full grid grid-cols-3 items-center gap-2 md:gap-1"
            >
              {/* Session Time Label */}
              <div className="text-sm md:text-base font-semibold">
                {time} min
              </div>

              {/* Price Input */}
              <input
                type="number"
                placeholder="$0"
                value={prices[time] || ""}
                onChange={(e) => handlePriceChange(time, e.target.value)}
                className={`w-full md:w-48 text-center rounded-xl px-4 md:px-12 py-5 md:py-8 text-sm md:text-base 
                  outline-none 
                  ${
                    isFifteen
                      ? "bg-[#C3F7D2] text-[#4CB269] placeholder-[#4CB269]"
                      : "bg-[#F6F6F6] text-[#7E7E7E] placeholder-[#7E7E7E]"
                  }`}
              />

              {/* Discount Input */}
              <input
                type="number"
                placeholder="$0"
                value={discounts[time] || ""}
                onChange={(e) => handleDiscountChange(time, e.target.value)}
                className="w-full md:w-48 text-center rounded-xl px-4 md:px-12 py-5 md:py-8 text-sm md:text-base 
                  outline-none bg-[#CFE5F8] text-[#1C4FD1] placeholder-[#1C4FD1]"
              />
            </div>
          );
        })}
      </div>

      {/* Save Button (centered) */}
      <div className="w-full flex justify-center mt-8">
        <button
          onClick={handleSave}
          className="bg-black text-white px-16 py-2.5 rounded-lg text-sm md:text-base font-medium"
        >
          Save
        </button>
      </div>

      {/* Discount Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80 md:w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Enter Discount Percentage
            </h3>
            <input
              type="number"
              placeholder="Enter discount"
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setNewDiscount("");
                  setShowModal(false);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded-md w-1/3"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDiscount}
                className="bg-black text-white px-4 py-2 rounded-md w-1/3"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSessionPrices;
