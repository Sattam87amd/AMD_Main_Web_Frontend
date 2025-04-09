"use client";
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { Gift } from 'lucide-react';
import NavSearch from "@/components/Layout/navsearch";
import WhatToExpectExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/WhatToExpectExpertPanel";
import AboutMeReviews from '@/components/ExpertAboutMe/AboutMeReviews';
import ExpertFeatureHighightsExpertPanel from '@/components/ExpertPanel/ExpertPanelAboutMe/ExpertFeatureHighightsExpertPanel';
import SimilarExpertsExpertPanel from '@/components/ExpertPanel/ExpertPanelAboutMe/SimilarExpertsExpertPanel';
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';
import Footer from '@/components/Layout/Footer';
import BottomNav from '@/components/ExpertPanel/Bottomnav/bottomnav';
import Link from 'next/link';
import axios from 'axios';

const ExpertDetail = () => {
  const [expert, setExpert] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);
  const [price, setPrice] = useState(350);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({
    today: [],
    tomorrow: [],
    nextDate: []
  });

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const expertId = pathParts[pathParts.length - 1];

    if (expertId) {
      const fetchExpertData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/expertauth/${expertId}`);
          setExpert(response.data.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching expert details:", err);
          setError('Error fetching expert details.');
          setLoading(false);
        }
      };

      fetchExpertData();
    }
  }, []);

  useEffect(() => {
    if (showTimeSelection) {
      setTimeSlots([
        '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
        '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
      ]);
    }
  }, [showTimeSelection]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleConsultationChange = (type) => {
    setSelectedTime(null);
    setPrice(type === '1:4' ? 150 : 350);
  };

  const handleSeeTimeClick = () => {
    setShowTimeSelection(true);
  };

  const handleTimeSelection = (day, time) => {
    const currentSelectedSlots = selectedTimeSlots[day];
    if (currentSelectedSlots.includes(time)) {
      setSelectedTimeSlots({
        ...selectedTimeSlots,
        [day]: currentSelectedSlots.filter(selectedTime => selectedTime !== time)
      });
    } else {
      if (currentSelectedSlots.length < 5) {
        setSelectedTimeSlots({
          ...selectedTimeSlots,
          [day]: [...currentSelectedSlots, time]
        });
      }
    }
  };

  const handleSeeMore = () => {
    setIsExpanded(!isExpanded);
  };

  const getFormattedDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + 2);

  const todayStr = getFormattedDate(today);
  const tomorrowStr = getFormattedDate(tomorrow);
  const nextDateStr = getFormattedDate(nextDate);

  // Get the truncated experience text
  const experienceText = expert?.experience || '';
  const truncatedExperience = experienceText.slice(0, 200) + (experienceText.length > 200 ? '...' : '');

  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-[20%] hidden md:block">
          <Sidebar />
        </aside>

        <div className="w-full md:w-[80%] flex flex-col">
          <div className="min-h-screen bg-white py-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Expert Info */}
              <div className="bg-[#F8F7F3] rounded-3xl p-12 shadow">
                <img
                  src={expert?.photoFile || '/guyhawkins.png'}
                  alt={expert?.firstName}
                  className="w-[520px] h-[530px] object-cover rounded-xl"
                />
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {expert?.firstName} {expert?.lastName}
                  </h2>
                  <p className="text-[#9C9C9C] mt-1">{expert?.designation || 'Tech Entrepreneur + Investor'}</p>
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
                  <div className="bg-white p-6 rounded-xl">
                    <button
                      className="py-2 px-4 bg-black text-white rounded-md shadow mb-4"
                      onClick={() => setShowTimeSelection(false)}
                    >
                      Back
                    </button>
                    <h3 className="text-4xl font-semibold mb-4">Book a video call</h3>
                    <p className="mb-4 font-semibold text-xl">Select one of the available time slots below:</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {["Quick - 15min", "Regular - 30min", "Extra - 45min", "All Access - 60min"].map((duration) => (
                        <button
                          key={duration}
                          className={`py-2 px-4 ${selectedTime === duration ? 'bg-black text-white' : 'bg-[#F8F7F3] text-black'} rounded-md shadow`}
                          onClick={() => setSelectedTime(duration)}
                        >
                          {duration}
                        </button>
                      ))}
                    </div>

                    {[
                      { title: `Today (${todayStr})`, slots: 'today' },
                      { title: `Tomorrow (${tomorrowStr})`, slots: 'tomorrow' },
                      { title: `Next Date (${nextDateStr})`, slots: 'nextDate' }
                    ].map((day) => (
                      <div key={day.title}>
                        <h4 className="font-semibold py-8">{day.title}</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              className={`py-2 px-4 ${selectedTimeSlots[day.slots].includes(time) ? 'bg-black text-white' : 'bg-white text-black'} rounded-xl border`}
                              onClick={() => handleTimeSelection(day.slots, time)}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-10 py-10">
                      <div>
                        <p className="text-xl font-semibold">${price} • Session</p>
                        <div className="flex items-center mt-2 gap-2 text-[#FFA629]">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                          <span className="ml-2 font-semibold text-sm">5.0</span>
                        </div>
                      </div>
                      <button className="py-2 px-6 w-full bg-black text-white rounded-md">
                        Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* 1:1 Video Consultation */}
                    <div className="bg-[#F8F7F3] p-6 rounded-xl">
                      <div className="bg-black text-white p-2 rounded-t-xl w-max">
                        <h3 className="text-2xl font-semibold">Book A Video Call</h3>
                      </div>
                      <div className="text-2xl py-4">
                        <h2 className="font-semibold">1:1 Video Consultation</h2>
                      </div>
                      <p className="text-2xl font-semibold">Book a 1:1 Video consultation & get personalized advice</p>

                      <div className="mt-4">
                        <p className="text-xl font-semibold">Starting at ${price}</p>
                        <div className="flex items-center justify-start">
                          <p className="text-[#7E7E7E] text-base font-semibold">
                            Next available - <span className="text-[#0D70E5]">4:30am on 3/25</span>
                          </p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-[#FFA629] ml-3" />
                            ))}
                            <span className="ml-2 text-[#FFA629] font-semibold text-sm">5.0</span>
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

                    {/* 1:4 Video Consultation */}
                    <div className="bg-[#F8F7F3] p-6 rounded-xl">
                      <div className="bg-black text-white p-2 rounded-t-xl w-max">
                        <h3 className="text-2xl font-semibold">Book A Video Call</h3>
                      </div>
                      <div className="text-2xl py-4">
                        <h2 className="font-semibold">1:4 Video Consultation</h2>
                      </div>
                      <p className="text-2xl font-semibold">Book a 1:4 Video consultation & get personalized advice</p>

                      <div className="mt-4">
                        <p className="text-xl font-semibold">Starting at ${price}</p>
                        <div className="flex items-center justify-start">
                          <p className="text-[#7E7E7E] text-base font-semibold">
                            Next available - <span className="text-[#0D70E5]">5:00pm on 3/25</span>
                          </p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-[#FFA629] ml-3" />
                            ))}
                            <span className="ml-2 text-[#FFA629] font-semibold text-sm">5.0</span>
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
                  </>
                )}
              </div>
            </div>
          </div>
          <WhatToExpectExpertPanel />
          <AboutMeReviews/> 
          <ExpertFeatureHighightsExpertPanel />
          <SimilarExpertsExpertPanel />
        </div>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
};

export default ExpertDetail;