'use client';
import NavSearch from "@/components/Layout/navsearch";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { Gift } from 'lucide-react';
import WhatToExpectExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/WhatToExpectExpertPanel";
import AboutMeReviews from '@/components/ExpertAboutMe/AboutMeReviews';
import ExpertFeatureHighightsExpertPanel from '@/components/ExpertPanel/ExpertPanelAboutMe/ExpertFeatureHighightsExpertPanel';
import SimilarExpertsExpertPanel from '@/components/ExpertPanel/ExpertPanelAboutMe/SimilarExpertsExpertPanel';
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';
import Footer from '@/components/Layout/Footer';
import BottomNav from '@/components/ExpertPanel/Bottomnav/bottomnav';
import Link from 'next/link';

const ExpertDetail = () => {
  const [expert, setExpert] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState("1:1");
  const [price, setPrice] = useState(350);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({
    today: [],
    tomorrow: [],
    nextDate: []
  });

  // Date formatting functions
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
          setError('Error fetching expert details.');
          setLoading(false);
        }
      };
      fetchExpertData();
    }
  }, []);

  const handleConsultationChange = (type) => {
    setSelectedConsultation(type);
    setSelectedTime(null);
    setPrice(type === "1:4" ? 150 : 350);
  };

  const handleTimeSelection = (day, time) => {
    const currentSelectedSlots = selectedTimeSlots[day];
    if (currentSelectedSlots.includes(time)) {
      setSelectedTimeSlots({
        ...selectedTimeSlots,
        [day]: currentSelectedSlots.filter(t => t !== time)
      });
    } else if (currentSelectedSlots.length < 5) {
      setSelectedTimeSlots({
        ...selectedTimeSlots,
        [day]: [...currentSelectedSlots, time]
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-[20%] hidden md:block">
          <Sidebar />
        </aside>

        <div className="w-full md:w-[80%] flex flex-col">
        <div className="hidden md:block">
          <NavSearch />
        </div>
        <div className="min-h-screen w-full bg-white py-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Expert Info */}
              <div className="bg-[#F8F7F3] rounded-3xl p-6 flex flex-col items-center shadow">
                <img
                  src={expert.photoFile || '/default-image.png'}
                  alt={expert.firstName}
                  className="w-full max-w-[350px] h-[450px] object-cover rounded-2xl shadow-md"
                />
                <div className="mt-6 text-center w-full">
                  <h2 className="text-3xl font-semibold text-gray-900">
                    {expert.firstName} {expert.lastName}
                  </h2>
                  <p className="text-[#9C9C9C] mt-1">{expert.designation || 'Expert'}</p>
                  <div className="flex items-center justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-[#FFA629]" />
                    ))}
                    <span className="ml-2 text-[#FFA629] font-semibold text-sm">{expert.rating || 5.0}</span>
                  </div>
                </div>

                {/* About Me */}
                <div className="w-full mt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">About Me</h3>
                    <FaInstagram className="text-xl text-gray-600 cursor-pointer hover:text-gray-900" />
                  </div>
                  <p className="text-sm text-black whitespace-pre-line mt-4">{expert.experience || 'No bio available.'}</p>
                  <h4 className="text-md font-semibold mt-4 flex items-center">
                    <span className="text-yellow-500 text-lg mr-2">💡</span> Strengths:
                  </h4>
                  <ul className="list-none mt-2 space-y-1">
                    {expert.strengths?.map((strength, index) => (
                      <li key={index} className="text-gray-700 flex items-center text-sm">
                        <span className="text-yellow-500 mr-2">✔</span> {strength}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-900 transition">
                    See More
                  </button>
                </div>
              </div>

              {/* Right Column - Updated Components */}
              <div className="space-y-6">
                {showTimeSelection ? (
                  <>
                    <Link href="/expertaboutme">
                      <button className="py-2 px-4 bg-black text-white rounded-md shadow mb-6">
                        Back
                      </button>
                    </Link>
                    <div className="bg-white p-6 rounded-xl">
                      <h3 className="text-4xl font-semibold mb-4">Book a video call</h3>
                      <p className="mb-4 font-semibold text-xl">Select one of the available time slots below:</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {['Quick - 15min', 'Regular - 30min', 'Extra - 45min', 'All Access - 60min'].map((time) => (
                          <button
                            key={time}
                            className={`py-2 px-4 ${selectedTime === time ? 'bg-black text-white' : 'bg-[#F8F7F3] text-black'} rounded-md shadow`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>

                      {/* Time Slots for Each Day */}
                      {[['Today', todayStr, 'today'], ['Tomorrow', tomorrowStr, 'tomorrow'], ['Next Date', nextDateStr, 'nextDate']].map(([label, dateStr, dayKey]) => (
                        <div key={dayKey} className="mb-8">
                          <h4 className="font-semibold py-4 text-xl">{`${label} (${dateStr})`}</h4>
                          <div className="grid grid-cols-3 gap-3">
                            {['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time) => (
                              <button
                                key={time}
                                className={`py-2 px-3 text-sm ${selectedTimeSlots[dayKey].includes(time) ? 'bg-black text-white' : 'bg-white text-black'} rounded-xl border`}
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
                        <Link href='/userlogin'>
                          <button className="py-3 px-12 bg-black text-white rounded-md hover:bg-gray-900 transition">
                            Request
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Consultation Cards */}
                    <div className="space-y-8">
                      {['1:1', '1:4'].map((type) => (
                        <div key={type} className="bg-[#F8F7F3] p-6 rounded-xl">
                          <div className="bg-black text-white p-2 rounded-t-xl w-max mb-4">
                            <h3 className="text-2xl font-semibold">Book A Video Call</h3>
                          </div>
                          <h2 className="text-2xl font-semibold mb-2">{type} Video Consultation</h2>
                          <p className="text-xl text-gray-700 mb-4">
                            Book a {type} video consultation & get personalized advice
                          </p>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xl font-semibold">Starting at ${type === '1:4' ? 150 : 350}</p>
                              <p className="text-[#7E7E7E] text-sm">
                                Next available - <span className="text-[#0D70E5]">4:30am on 3/25</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => <FaStar key={i} className="text-[#FFA629]" />)}
                            </div>
                          </div>

                          <div className="flex items-center justify-center mt-6 gap-4">
                            <Gift className="h-8 w-8 text-[#0D70E5]" />
                            <button
                              className="bg-[#0D70E5] text-white py-3 px-16 rounded-md hover:bg-[#0A58C2] transition"
                              onClick={() => {
                                handleConsultationChange(type);
                                setShowTimeSelection(true);
                              }}
                            >
                              See Time
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Plan Section */}
                    <div className="bg-white border rounded-xl shadow-md p-6 mt-8">
                      <div className="bg-black text-white px-4 py-2 rounded-md inline-block mb-4">
                        Select Plan #1
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        Growing A Successful Business - 1:1 Mentoring (VIP Access)
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {[
                          '1:1 Chat (Unlimited)',
                          '1:1 Video Calls (120 Min / Month)',
                          'Real World Advice On Physical Retail, Managing Multiple Locations, Franchising, And More',
                          'Lessons on Branding, Narrative, Local Marketing, Delightful Customer Service, Hiring, And More',
                          'How To Launch And Grow A Successful Product Line',
                          'Invite To The Intro CEO Day In LA (Must Subscribe For 12 Months or More)'
                        ].map((item, index) => (
                          <li key={index} className="text-sm">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
       
          <WhatToExpectExpertPanel />
          {/* <ScheduleQuickCallsExpertPanel /> */}
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