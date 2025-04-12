'use client'

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Gift } from "lucide-react";
import Footer from "@/components/UserPanel/Layout/Footer";
import UserWhatToExpect from "@/components/UserPanel/UserAboutMe/UserWhatToExpect";
import UserAboutMeReviews from "@/components/UserPanel/UserAboutMe/UserAboutMeReviews";
import UserExpertFeatureHighights from "@/components/UserPanel/UserAboutMe/UserExpertFeatureHighights";
import UserSimilarExperts from "@/components/UserPanel/UserAboutMe/UserSimilarExperts";
import BottomNav from "@/components/UserPanel/BottomNav/BottomNav";
import UserSidebar from "@/components/UserPanel/UseSideBar/UserSidebar";
import UserNavSearch from "@/components/UserPanel/Layout/NavSearch";
import axios from "axios";
import { useRouter } from "next/navigation";

const ExpertDetail = () => {
  const [expert, setExpert] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState("1:1");
  const [price, setPrice] = useState(350);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const router = useRouter();

  // Date handling
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 2);

  const dateMap = {
    today: today,
    tomorrow: tomorrow,
    nextDate: nextDate,
  };

  const getFormattedDate = (date) => {
    return date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" });
  };

  const handleSeeMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const expertId = pathParts[pathParts.length - 1];

    localStorage.setItem("expertId",expertId)
    if (expertId) {
      const fetchExpertData = async () => {
        try {
          const response = await axios.get(`https://amd-api.code4bahart.com/api/expertauth/${expertId}`);
          setExpert(response.data.data);
          setLoading(false);
          localStorage.setItem("consultingExpertData", JSON.stringify(response.data.data));
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

  const handleSeeTimeClick = () => {
    setShowTimeSelection(true);
  };

  const handleBookingRequest = async () => {
    try {
      const sessionData = {
        consultingExpertId: expert._id,
        sessionDate: selectedDate,
        sessionTime: selectedTime,
        duration: selectedDuration,
        areaOfExpertise: "Home",
      };
    
      localStorage.setItem("sessionData", JSON.stringify(sessionData));
      alert("Click Ok to proceed");
      router.push('/userpanel/userbooking');
      setShowTimeSelection(false);
    } catch (error) {
      console.error("Booking error:", error);
      alert(`Booking failed: ${error.message}`);
    }
  };

  const handleTimeSelection = (dayKey, time) => {
    const date = dateMap[dayKey].toISOString().split('T')[0];
    const formattedTime = time.replace(" AM", "").replace(" PM", "").trim();
    
    setSelectedDate(date);
    setSelectedTime(formattedTime);
  };

  const experienceText = expert?.experience || '';
  const truncatedExperience = experienceText.slice(0, 200) + (experienceText.length > 200 ? '...' : '');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-[20%] hidden md:block">
          <UserSidebar />
        </aside>

        <div className="w-full md:w-[80%] flex flex-col">
          <div className="hidden md:block">
            <UserNavSearch />
          </div>
          <div className="min-h-screen bg-white py-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Expert Info */}
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
                  <p className="text-[#9C9C9C] mt-1">{expert?.designation || "Tech Entrepreneur + Investor"}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[#FFA629]" />
                    ))}
                    <span className="ml-2 text-[#FFA629] font-semibold text-sm">{expert?.rating || 5.0}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-3xl font-semibold">About Me</h3>
                    <FaInstagram className="text-xl text-gray-600 cursor-pointer hover:text-gray-900" />
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
                      {isExpanded ? 'Show Less' : 'See More'}
                    </button>
                  )}

                  <h4 className="text-md font-semibold mt-6 flex items-center">
                    <span className="text-yellow-500 text-lg mr-2">💡</span> Strengths:
                  </h4>
                  <ul className="list-none mt-2 space-y-1">
                    {(expert?.strengths || [
                      "Startups",
                      "Investing",
                      "Company Culture",
                      "Early Stage Marketing",
                      "Growth Tactics",
                      "Operations",
                      "Fundraising",
                      "Hiring & Managing",
                    ]).map((strength, index) => (
                      <li key={index} className="text-gray-700 flex items-center text-sm">
                        <span className="text-yellow-500 mr-2">✔</span> {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Video Consultation */}
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
                      <h3 className="text-4xl font-semibold mb-4">Book a video call</h3>
                      <p className="mb-4 font-semibold text-xl">Select duration and time slot:</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {["Quick - 15min", "Regular - 30min", "Extra - 45min", "All Access - 60min"].map((duration) => (
                          <button
                            key={duration}
                            className={`py-2 px-4 ${
                              selectedDuration === duration ? "bg-black text-white" : "bg-[#F8F7F3] text-black"
                            } rounded-md shadow`}
                            onClick={() => setSelectedDuration(duration)}
                          >
                            {duration}
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
                                className={`py-2 px-3 text-sm ${
                                  selectedDate === dateMap[dayKey].toISOString().split("T")[0] &&
                                  selectedTime === time.replace(" AM", "").replace(" PM", "").trim()
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                                } rounded-xl border`}
                                onClick={() => handleTimeSelection(dayKey, time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-10 py-10 items-center">
                        <div>
                          <p className="text-xl font-semibold">${price} • Session</p>
                          <div className="flex items-center mt-2 gap-2 text-[#FFA629]">
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                          </div>
                        </div>
                        <button
                          className="py-3 px-12 bg-black text-white rounded-md hover:bg-gray-900 transition"
                          onClick={handleBookingRequest}
                          disabled={!selectedDuration || !selectedDate || !selectedTime}
                        >
                          Request
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    {/* 1:1 Consultation Card */}
                    <div 
                      className={`bg-[#F8F7F3] p-6 rounded-xl cursor-pointer ${
                        selectedConsultation === "1:1" ? "border-2 border-black" : ""
                      }`}
                      onClick={() => handleConsultationChange("1:1")}
                    >
                      <div className="bg-black text-white p-2 rounded-t-xl w-max">
                        <h3 className="text-2xl font-semibold">1:1 Video Call</h3>
                      </div>
                      <div className="text-2xl py-4">
                        <h2 className="font-semibold">Personalized 1:1 Session</h2>
                      </div>
                      <p className="text-2xl font-semibold">Get dedicated one-on-one expert guidance</p>
                      <div className="mt-4">
                        <p className="text-xl font-semibold">Starting at $350</p>
                        <div className="flex items-center justify-start mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-[#FFA629]" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-4 gap-8">
                        <Gift className="h-8 w-8" />
                        <button
                          className="bg-[#0D70E5] text-white py-3 px-24 rounded-md hover:bg-[#0A58C2]"
                          onClick={handleSeeTimeClick}
                        >
                          See Time
                        </button>
                      </div>
                    </div>

                    {/* 1:4 Consultation Card */}
                    <div 
                      className={`bg-[#F8F7F3] p-6 rounded-xl cursor-pointer ${
                        selectedConsultation === "1:4" ? "border-2 border-black" : ""
                      }`}
                      onClick={() => handleConsultationChange("1:4")}
                    >
                      <div className="bg-black text-white p-2 rounded-t-xl w-max">
                        <h3 className="text-2xl font-semibold">1:4 Video Call</h3>
                      </div>
                      <div className="text-2xl py-4">
                        <h2 className="font-semibold">Group Session (1:4)</h2>
                      </div>
                      <p className="text-2xl font-semibold">Join a small group discussion with expert guidance</p>
                      <div className="mt-4">
                        <p className="text-xl font-semibold">Starting at $150</p>
                        <div className="flex items-center justify-start mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-[#FFA629]" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-4 gap-8">
                        <Gift className="h-8 w-8" />
                        <button
                          className="bg-[#0D70E5] text-white py-3 px-24 rounded-md hover:bg-[#0A58C2]"
                          onClick={handleSeeTimeClick}
                        >
                          See Time
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <UserWhatToExpect />
          <UserAboutMeReviews />
          <UserExpertFeatureHighights />
          <UserSimilarExperts />
        </div>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
};

export default ExpertDetail;