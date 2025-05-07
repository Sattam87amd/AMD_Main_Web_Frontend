'use client';




import NavSearch from "@/components/Layout/navsearch";
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { Gift, HeartHandshake } from 'lucide-react';
import WhatToExpectExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/WhatToExpectExpertPanel";
import AboutMeReviews from '@/components/ExpertAboutMe/AboutMeReviews';
import ExpertFeatureHighightsExpertPanel from '@/components/ExpertPanel/ExpertPanelAboutMe/ExpertFeatureHighightsExpertPanel';
import SimilarExpertsExpertPanel from '@/components/ExpertPanel/ExpertPanelAboutMe/SimilarExpertsExpertPanel';
import Footer from "@/components/Layout/Footer";
import axios from "axios";
import { useRouter } from "next/navigation";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";

const ExpertDetail = () => {
  const [expert, setExpert] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState("1:1");
  const [price, setPrice] = useState();
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [charityEnabled, setCharityEnabled] = useState(false);
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState(15);
  const [charityInfo, setCharityInfo] = useState({
    name: "",
    percentage: "",
  });

  const router = useRouter();

  // Date handling
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 2);

  const getFormattedDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };
  const handleSeeMore = () => {
    setIsExpanded(!isExpanded);
  };
  // Modify your handleSeeTimeClick to set default duration:
  const handleSeeTimeClick = () => {
    setShowTimeSelection(true);
    setSelectedDuration("Quick - 15min");
    setSelectedDurationMinutes(15);
  };

  const dateMap = {
    today: today,
    tomorrow: tomorrow,
    nextDate: nextDate,
  };


  useEffect(() => {
    console.log("DEBUG - Selected Duration:", selectedDurationMinutes);
    console.log("DEBUG - Expert Price:", expert?.price);
  }, [selectedDurationMinutes, expert?.price]);


  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const expertId = pathParts[pathParts.length - 1];

    if (expertId) {
      const fetchExpertData = async () => {
        try {
          const response = await axios.get(
            `https://amd-api.code4bharat.com/api/expertauth/${expertId}`
          );
          setExpert(response.data.data);

          // Set charity info if available
          if (response.data.data.charityEnabled) {
            setCharityEnabled(response.data.data.charityEnabled);
            setCharityInfo({
              name: response.data.data.charityName || "",
              percentage: response.data.data.charityPercentage || "",
            });
          }

          setLoading(false);
          localStorage.setItem(
            "consultingExpertData",
            JSON.stringify(response.data.data)
          );
        } catch (err) {
          setError("Error fetching expert details.");
          setLoading(false);
        }
      };
      fetchExpertData();
    }
  }, []);

  const handleConsultationChange = (type) => {
    setSelectedConsultation(type);
    setPrice(type === "1:4" ? 150 : 350);
  };

  const handleTimeSelection = (dayKey, time) => {
    const date = dateMap[dayKey].toISOString().split("T")[0];
    const formattedTime = time.replace(" AM", "").replace(" PM", "").trim();

    setSelectedDate(date);
    setSelectedTime(formattedTime);
  };

  const handleBookingRequest = async () => {
    try {
      const token = localStorage.getItem("expertToken");
      if (!token) throw new Error("No authentication token found");

      const sessionData = {
        consultingExpertId: expert._id,
        sessionDate: selectedDate,
        sessionTime: selectedTime,
        duration: selectedDurationMinutes,
        areaOfExpertise: "Home",
      };

      // Store session data in localStorage
      localStorage.setItem("sessionData", JSON.stringify(sessionData));

      // Redirect to the next page
      router.push("/expertpanel/expertbooking"); // Assuming the second page is 'expertbookingdetails'

      setShowTimeSelection(false);
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      toast.error(
        `Booking failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  // Get the truncated experience text
  const experienceText = expert?.experience || "";
  const truncatedExperience =
    experienceText.slice(0, 200) + (experienceText.length > 200 ? "..." : "");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className=" min-h-screen">


        <div className="w-full flex flex-col">
          <MobileNavSearch />
          <div className="hidden md:block">
            <NavSearch />
          </div>
          <div className="min-h-screen bg-white py-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Expert Info (Unchanged) */}
              <div className="bg-[#F8F7F3] rounded-3xl p-12 shadow">
                <img
                  src={expert?.photoFile || "/guyhawkins.png"}
                  alt={expert?.firstName}
                  className="w-[520px] h-[530px] object-cover rounded-xl"
                />
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {expert?.firstName} {expert?.lastName}
                  </h2>
                  <p className="text-[#9C9C9C] mt-1">
                    {expert?.designation || "Tech Entrepreneur + Investor"}
                  </p>
                  <div className="flex items-center mt-2 gap-2 text-[#FFA629]">
                    {[...Array(5)].map((_, i) => {
                      const rating = expert.averageRating || 0; // Use 0 as a fallback if expert.averageRating is falsy (undefined, null, etc.)

                      const isFilled = i < Math.floor(rating); // If the index is less than the rating
                      const isHalf =
                        i === Math.floor(rating) && rating % 1 !== 0; // If the rating has a decimal and we are at the exact index
                      return (
                        <FaStar
                          key={i}
                          className={
                            isFilled || isHalf
                              ? "text-[#FFA629]"
                              : "text-gray-300"
                          } // Full or empty star color
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-3xl font-semibold">
                      About Me
                    </h3>
                    <div className="flex items-center gap-3">
                      {charityEnabled && (
                        <div className="flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-full">
                          <span className="flex text-xs text-red-600 font-medium">
                            {charityInfo.percentage}% to Charity{charityInfo.name}

                          </span>

                          <HeartHandshake className="h-4 w-4 text-red-600" />
                        </div>
                      )}
                      <FaInstagram className="text-xl text-gray-600 cursor-pointer hover:text-gray-900" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm md:text-xl text-black">
                      {isExpanded ? experienceText : truncatedExperience}
                    </p>
                  </div>
                  {experienceText.length > 200 && (
                    <button
                      className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
                      onClick={handleSeeMore}
                    >
                      {isExpanded ? "Show Less" : "See More"}
                    </button>
                  )}

                  <h4 className="text-md font-semibold mt-6 flex items-center">
                    <span className="text-yellow-500 text-lg mr-2">💡</span>{" "}
                    Strengths:
                  </h4>
                  <ul className="list-none mt-2 space-y-1">
                    {(
                      expert?.strengths || [
                        "Startups",
                        "Investing",
                        "Company Culture",
                        "Early Stage Marketing",
                        "Growth Tactics",
                        "Operations",
                        "Fundraising",
                        "Hiring & Managing",
                      ]
                    ).map((strength, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-center text-sm"
                      >
                        <span className="text-yellow-500 mr-2">✔</span>{" "}
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {showTimeSelection ? (
                  <>
                    <button
                      onClick={() => setShowTimeSelection(false)}
                      className="py-2 px-4 bg-black text-white rounded-md shadow mb-6"
                    >
                      Back
                    </button>
                    <div className="bg-white p-6 rounded-xl">
                      <h3 className="text-4xl font-semibold mb-4">
                        Book a video call
                      </h3>
                      <p className="mb-4 font-semibold text-xl">
                        Select duration and time slot:
                      </p>


                      {/* Duration Selection Section */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {[
                          { label: "Quick - 15min", duration: 15 },
                          { label: "Regular - 30min", duration: 30 },
                          { label: "Extra - 45min", duration: 45 },
                          { label: "All Access - 60min", duration: 60 },
                        ].map(({ label, duration }) => (
                          <button
                            key={label}
                            className={`py-2 px-4 ${selectedDuration === label
                              ? "bg-black text-white"
                              : "bg-[#F8F7F3] text-black"
                              } rounded-md shadow`}
                            onClick={() => {
                              setSelectedDuration(label);
                              setSelectedDurationMinutes(duration);
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      {/* Time Slots */}
                      {[
                        ["Today", "today"],
                        ["Tomorrow", "tomorrow"],
                        ["Next Date", "nextDate"],
                      ].map(([label, dayKey]) => (
                        <div key={dayKey} className="mb-8">
                          <h4 className="font-semibold py-4 text-xl">
                            {`${label} (${getFormattedDate(dateMap[dayKey])})`}
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              "07:00 AM",
                              "08:00 AM",
                              "09:00 AM",
                              "10:00 AM",
                              "11:00 AM",
                              "12:00 PM",
                              "02:00 PM",
                              "03:00 PM",
                              "04:00 PM",
                            ].map((time) => (
                              <button
                                key={time}
                                className={`py-2 px-3 text-sm ${selectedDate ===
                                  dateMap[dayKey]
                                    .toISOString()
                                    .split("T")[0] &&
                                  selectedTime ===
                                  time
                                    .replace(" AM", "")
                                    .replace(" PM", "")
                                    .trim()
                                  ? "bg-black text-white"
                                  : "bg-white text-black"
                                  } rounded-xl border`}
                                onClick={() =>
                                  handleTimeSelection(dayKey, time)
                                }
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}


                      <div className="flex gap-10 py-10 items-center">
                        <div>
                          {/* Updated price display */}
                          <p className="text-xl font-semibold">
                            SAR {(expert?.price * (selectedDurationMinutes / 15)).toFixed(2)} • Session
                          </p>

                          <div className="flex items-center mt-2 gap-2 text-[#FFA629]">
                            {[...Array(5)].map((_, i) => {
                              const rating = expert.averageRating || 0; // Use 0 as a fallback if expert.averageRating is falsy (undefined, null, etc.)

                              const isFilled = i < Math.floor(rating); // If the index is less than the rating
                              const isHalf =
                                i === Math.floor(rating) && rating % 1 !== 0; // If the rating has a decimal and we are at the exact index
                              return (
                                <FaStar
                                  key={i}
                                  className={
                                    isFilled || isHalf
                                      ? "text-[#FFA629]"
                                      : "text-gray-300"
                                  } // Full or empty star color
                                />
                              );
                            })}
                          </div>
                        </div>
                        <button
                          className="py-3 px-12 bg-black text-white rounded-md hover:bg-gray-900 transition"
                          onClick={handleBookingRequest}
                          disabled={
                            !selectedDuration || !selectedDate || !selectedTime
                          }
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* 1:1 Video Consultation */}
                    <div className="bg-[#F8F7F3] p-6 rounded-xl">
                      <div className="bg-black text-white p-2 rounded-t-xl w-max">
                        <h3 className="text-2xl font-semibold">
                          Book A Video Call
                        </h3>
                      </div>
                      <div className="text-2xl py-4">
                        <h2 className="font-semibold">
                          1:1 Video Consultation
                        </h2>
                      </div>
                      <p className="text-2xl font-semibold">
                        Book a 1:1 Video consultation & get personalized advice
                      </p>


                      <div className="mt-4">
                        {/* Updated starting price display */}
                        <p className="text-xl font-semibold">
                          SAR {(expert.price * (selectedDurationMinutes / 15)).toFixed(2)}
                        </p>
                        <div className="flex items-center justify-start">
                          {/* <p className="text-[#7E7E7E] text-base font-semibold">
                            Next available - <span className="text-[#0D70E5]">4:30am on 3/25</span>
                          </p> */}
                          <div className="flex items-center ml-2 mt-3 gap-5 text-[#FFA629]">
                            {[...Array(5)].map((_, i) => {
                              const rating = expert.averageRating || 0; // Use 0 as a fallback if expert.averageRating is falsy (undefined, null, etc.)

                              const isFilled = i < Math.floor(rating); // If the index is less than the rating
                              const isHalf =
                                i === Math.floor(rating) && rating % 1 !== 0; // If the rating has a decimal and we are at the exact index
                              return (
                                <FaStar
                                  key={i}
                                  className={
                                    isFilled || isHalf
                                      ? "text-[#FFA629]"
                                      : "text-gray-300"
                                  } // Full or empty star color
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center mt-4 gap-8">
                        <div className="flex items-center">
                          <Gift className="h-8 w-8" />
                        </div>
                        <button
                          className="bg-[#0D70E5] text-white py-3 px-24 rounded-md hover:bg-[#0A58C2]"
                          onClick={handleSeeTimeClick}
                        >
                          See Time
                        </button>
                      </div>
                    </div>
                     
                    <div className="bg-[#F8F7F3] p-6 rounded-xl mt-12">
                      <div className="bg-black text-white p-2 rounded-t-xl w-max">
                        <h3 className="text-2xl font-semibold">Send a Gift Card</h3>
                      </div>
                      <div className="text-2xl py-4">
                        <h2 className="font-semibold">Gift an Intro</h2>
                      </div>
                      <p className="text-2xl font-semibold">
                        Gift a session or membership to friends, family, or coworkers
                      </p>

                      <div className="flex items-center justify-center mt-4 gap-8">
                        <div className="flex items-center">
                          <Gift className="h-8 w-8" />
                        </div>
                        <button
                          onClick={() => alert("Gift Card feature coming soon!")} // placeholder for future functionality
                          className="bg-[#0D70E5] text-white py-3 px-24 rounded-md hover:bg-[#0A58C2]"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <WhatToExpectExpertPanel />
          <AboutMeReviews />
          <ExpertFeatureHighightsExpertPanel />
          <SimilarExpertsExpertPanel />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExpertDetail;