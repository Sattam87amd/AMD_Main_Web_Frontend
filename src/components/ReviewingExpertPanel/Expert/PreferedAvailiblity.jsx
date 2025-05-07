"use client"; // If using Next.js App Router, ensure client-side rendering
import React, { useState, useEffect } from "react";
import { format, startOfToday, addMonths, eachDayOfInterval } from "date-fns";
import Image from "next/image";

const PreferredAvailability = () => {
  const [regions] = useState([
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
  ]);
  const [selectedRegion, setSelectedRegion] = useState("Asia/Kolkata");
  const [monthsRange, setMonthsRange] = useState(1);
  const today = startOfToday();
  const [availability, setAvailability] = useState([]);

  // On mount, load stored values and merge them with generated days
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRegion = localStorage.getItem("preferred_region");
      const storedMonths = localStorage.getItem("preferred_months");
      const storedAvailability = localStorage.getItem("preferred_availability");

      const region = storedRegion || "Asia/Kolkata";
      const months = storedMonths ? parseInt(storedMonths, 10) : 1;
      setSelectedRegion(region);
      setMonthsRange(months);
      const parsedAvailability = storedAvailability
        ? JSON.parse(storedAvailability)
        : [];

      const endDate = addMonths(today, months);
      const allDays = eachDayOfInterval({ start: today, end: endDate });
      const merged = allDays.map((day) => {
        const dayString = format(day, "yyyy-MM-dd");
        const existing = parsedAvailability.find((d) => d.date === dayString);
        if (existing) {
          return existing;
        } else {
          const times = {};
          for (let hour = 6; hour <= 22; hour++) {
            times[hour] = false;
          }
          return { date: dayString, times };
        }
      });
      setAvailability(merged);
    }
    // We run this effect only once on mount
  }, []);

  // When monthsRange changes, update availability with new days while preserving existing selections
  useEffect(() => {
    if (availability.length > 0) {
      const endDate = addMonths(today, monthsRange);
      const allDays = eachDayOfInterval({ start: today, end: endDate });
      const merged = allDays.map((day) => {
        const dayString = format(day, "yyyy-MM-dd");
        const existing = availability.find((d) => d.date === dayString);
        if (existing) {
          return existing;
        } else {
          const times = {};
          for (let hour = 6; hour <= 22; hour++) {
            times[hour] = false;
          }
          return { date: dayString, times };
        }
      });
      setAvailability(merged);
    }
  }, [monthsRange]);

  // Save any changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred_region", selectedRegion);
      localStorage.setItem("preferred_months", monthsRange.toString());
      localStorage.setItem(
        "preferred_availability",
        JSON.stringify(availability)
      );
    }
  }, [selectedRegion, monthsRange, availability]);

  const handleTimeToggle = (date, hour) => {
    setAvailability((prev) =>
      prev.map((dayObj) =>
        dayObj.date === date
          ? {
              ...dayObj,
              times: { ...dayObj.times, [hour]: !dayObj.times[hour] },
            }
          : dayObj
      )
    );
  };

  const handleRepeatDay = (date) => {
    const clickedDate = new Date(date);
    const clickedDayOfWeek = format(clickedDate, "EEEE");
    const dayObj = availability.find((d) => d.date === date);
    if (!dayObj) return;
    const clickedTimes = dayObj.times;

    setAvailability((prev) =>
      prev.map((dayObj) => {
        const loopDate = new Date(dayObj.date);
        if (format(loopDate, "EEEE") === clickedDayOfWeek) {
          return { ...dayObj, times: { ...clickedTimes } };
        }
        return dayObj;
      })
    );
  };

  return (
    <div className="w-[90vw] md:max-w-4xl mx-auto ">
      <h1 className="text-xl font-semibold mb-4">
        Preferred availability. Select the times you prefer to be booked:
      </h1>

      {/* Region and Month Selection (Stacked Layout) */}
      <div className="space-y-4 mb-7">
        {/* Time Zone Dropdown (with Globe Image) */}
        <div className="w-44 md:w-56 ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <Image
                src="/globe.png"
                alt="Globe"
                width={16}
                height={16}
                className="w-4 md:w-5 h-4 md:h-5"
              />
            </div>
            <select
              className="w-full border rounded-md px-3 py-2 pl-9 focus:ring-2 focus:ring-blue-500 bg-white"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Month Selection Dropdown (with Static Black Text & Dynamic Blue Text) */}
        <div className="w-60 md:w-60">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-black">Set availability for:</span>
            </div>
            <select
              className="w-full border rounded-md px-0 py-2 pl-[144px] text-[#0D70E5] focus:ring-2 focus:ring-blue-500 bg-white"
              value={monthsRange}
              onChange={(e) => setMonthsRange(parseInt(e.target.value, 10))}
            >
              <option value={1}>1 month</option>
              <option value={2}>2 months</option>
              <option value={3}>3 months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Availability Selection */}
      <div className="space-y-6">
        {availability.map((dayObj) => {
          const dayLabel = format(new Date(dayObj.date), "EEEE, MMM d");
          return (
            <div key={dayObj.date} className="border-b pb-4">
              {/* Day Label */}
              <div className="text-lg font-medium mb-2">{dayLabel}</div>

              {/* Time Selection - Single Line, Square Boxes, No Text Inside */}
              <div className="flex gap-3 md:gap-[17px] mb-3 md:overflow-visible overflow-x-scroll whitespace-nowrap">
                {Object.keys(dayObj.times).map((hour) => {
                  const isSelected = dayObj.times[hour];
                  return (
                    <div key={hour} className="flex flex-col items-center">
                      <button
                        onClick={() => handleTimeToggle(dayObj.date, hour)}
                        className={`w-9 h-12 border text-sm font-semibold transition-all ${
                          isSelected ? "bg-green-500 text-white" : "bg-gray-200"
                        } hover:bg-green-400 rounded-none`}
                      />
                      <div className="text-xs mt-1">{hour}a</div>
                    </div>
                  );
                })}
              </div>

              {/* Repeat Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Repeat every {format(new Date(dayObj.date), "EEEE")}
                </span>
                <label className="inline-flex items-center cursor-pointer md:pr-3">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() => handleRepeatDay(dayObj.date)}
                  />
                  <div
                    className="relative w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 
                        dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                        after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 
                        dark:peer-checked:bg-blue-600"
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreferredAvailability;
