"use client";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaPen } from "react-icons/fa";

const ScheduleQuickCalls = () => {
  // Days of the week (Static, Always Visible)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Dates with Month (Scrollable)
  const datesData = [
    { date: 12, month: "Feb" },
    { date: 13, month: "Feb" },
    { date: 14, month: "Feb" },
    { date: 15, month: "Feb" },
    { date: 16, month: "Feb" },
    { date: 17, month: "Feb" },
    { date: 18, month: "Feb" },
    { date: 19, month: "Feb" },
    { date: 20, month: "Feb" },
    { date: 21, month: "Feb" },
    { date: 22, month: "Feb" },
    { date: 23, month: "Feb" },
    { date: 24, month: "Feb" },
    { date: 25, month: "Feb" },
    { date: 26, month: "Feb" },
    { date: 27, month: "Feb" },
  ];

  // Time Slots Data (Available & Unavailable)
  const timeSlots = [
    { time: "07:00 AM", available: false },
    { time: "08:00 AM", available: true },
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "01:00 PM", available: true },
    { time: "02:00 AM", available: false },
    { time: "03:00 AM", available: false },
    { time: "04:00 AM", available: true },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const visibleRange = 7; // Show only 7 items at a time

  // Scroll Left (Move back by 1)
  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Scroll Right (Move forward by 1)
  const scrollRight = () => {
    if (startIndex + visibleRange < datesData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  // Select or Deselect Time Slot
  const handleSelectTime = (time) => {
    if (selectedSlots.includes(time)) {
      setSelectedSlots(selectedSlots.filter((slot) => slot !== time));
    } else {
      if (selectedSlots.length < 5) {
        setSelectedSlots([...selectedSlots, time]);
      }
    }
  };

  return (
    <div className="bg-[#F8F7F3] rounded-2xl p-6 w-full md:w-[80%] mx-auto flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-xl md:text-3xl font-bold py-6 text-black mb-4">
        What time works best for a quick call?
      </h2>

      {/* Schedule Selector */}
      <div className="flex items-center gap-3 w-full max-w-4xl">
        {/* Left Arrow (Controls Date & Month Scrolling Only) */}
        <button
          onClick={scrollLeft}
          className="p-5 rounded-xl bg-white text-black hover:bg-gray-200 transition"
          disabled={startIndex === 0} // Disable when at the start
        >
          <FaChevronLeft />
        </button>

        {/* Date Picker Container */}
        <div className="w-full rounded-2xl bg-white">
          {/* Top Row: Days (Static, Always Visible) */}
          <div className="grid grid-cols-7 bg-[#EDECE8] px-4 py-3 rounded-t-2xl text-center font-semibold">
            {days.map((day, idx) => (
              <div key={idx} className="flex items-center justify-center text-lg">
                {day}
              </div>
            ))}
          </div>

          {/* Scrollable Bottom Row: Dates & Months (Only Show 7 Items) */}
          <div className="grid grid-cols-7 px-4 py-4 rounded-b-2xl text-center">
            {datesData.slice(startIndex, startIndex + visibleRange).map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 rounded-md px-3 py-2
                    ${isSelected ? "bg-black text-white" : "bg-white text-black"}
                  `}
                >
                  <span className="text-[40px] font-thin">{item.date}</span>
                  <span className="text-base font-normal">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow (Controls Date & Month Scrolling Only) */}
        <button
          onClick={scrollRight}
          className="p-5 rounded-xl bg-white text-black hover:bg-gray-200 transition"
          disabled={startIndex + visibleRange >= datesData.length} // Disable at the end
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Time Slot Selection */}
      <h3 className="text-xl md:text-2xl md:my-12 font-bold mt-8 text-black">
        Select Time Slot
      </h3>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8 mt-4">
        {timeSlots.map((slot, idx) => (
          <button
            key={idx}
            onClick={() => slot.available && handleSelectTime(slot.time)}
            className={`px-14 py-3 w-full text-lg rounded-lg border-2 font-semibold 
              ${
                slot.available
                  ? selectedSlots.includes(slot.time)
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                  : "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
              }`}
            disabled={!slot.available}
          >
            {slot.time}
          </button>
        ))}
      </div>

        {/*Bottom Note! */}
      <div className="bg-white rounded-2xl p-5 mt-8 shadow-md w-full md:w-[50%] mx-auto">
      {/* Top Row: Star Rating (left) + Next Button & Icon (right) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* Left: Star Rating on top, Price below */}
        <div>
          {/* Price */}
          <h2 className="text-xl font-semibold text-black mt-2">
            $2000 <span className="text-lg font-normal">. session</span>
          </h2>
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#FFA629]" />
            ))}
            <span className="text-[#FFA629] font-medium text-sm">5.0</span>
          </div>

        </div>

        {/* Right: Next Button + Note Icon */}
        <div className="flex items-center gap-8 mt-2 md:mt-0">
          <button className="bg-black text-white py-3 px-16 rounded-2xl text-lg font-medium">
            Next
          </button>
          <FaPen className="text-black text-lg cursor-pointer hover:opacity-80" />
        </div>
      </div>

      {/* Bottom: Note */}
      <p className="text-[#FE3232] text-sm text-start mt-2 w-full">
        Note - Can add up to 5 sessions at different time slots. Any 1 time slot might get selected.
      </p>
    </div>
    </div>
  );
};

export default ScheduleQuickCalls;
