'use client';
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Gift } from 'lucide-react'; // Gift Icon from lucide-react
import { useRouter } from 'next/navigation';

const ExpertAboutMe = () => {
  const [selectedConsultation, setSelectedConsultation] = useState("1:1");
  const [price, setPrice] = useState(350); // Dynamic Price for 1:1 consultation

  const profile = {
    name: "Darrell Steward",
    designation: "Tech Entrepreneur + Investor",
    image: "/guyhawkins.png",
    rating: 5.0,
    about: ` Co-founder of Reddit. First batch of Y Combinator (Summer 2005) and led the company to a sale to Condé Nast in 2006, returned as Exec Chair in 2014 to help lead the turnaround, then left in 2018 to do venture capital fullti
     I’m an investor in startups —almost always at the earliest possible stage— first as an angel investor, then co-founder of Initialized, before splitting the firm in half to found Seven Seven Six.
      I’m an investor in startups —almost always at the earliest possible stage— first as an angel investor, then co-founder of Initialized, before splitting the firm in half to found Seven Seven Six.`,
    strengths: [
      "Startups",
      "Investing",
      "Company Culture",
      "Early Stage Marketing",
      "Growth Tactics",
      "Operations",
      "Fundraising",
      "Hiring & Managing",
    ],
  };

  const router = useRouter();

  const handleConsultationChange = (type) => {
    setSelectedConsultation(type);
    if (type === "1:4") {
      setPrice(150); // Update price dynamically for 1:4 consultation
    } else {
      setPrice(350); // Update price dynamically for 1:1 consultation
    }
  };

  const navigateToTimeSelection = () => {
    // Assuming the next page is for time selection, navigate accordingly
    router.push('/time-selection');
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex items-start gap-8">
        {/* Left Side: Profile & About */}
        <div className="bg-[#F8F7F3] rounded-3xl p-6 shadow flex-1">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-[300px] object-cover rounded-xl"
          />
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-[#9C9C9C] mt-1">{profile.designation}</p>
            <div className="flex items-center mt-2 text-[#FFA629]">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="ml-2 font-semibold text-sm">{profile.rating}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg md:text-3xl font-semibold">About Me</h3>
            <p className="text-sm md:text-xl text-black mt-3">{profile.about}</p>
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition">
              See More
            </button>
          </div>
        </div>

        {/* Vertical Line */}
        <div className="hidden md:block border-l-2 border-gray-300 h-full"></div>

        {/* Right Side: Consultancy Cards */}
        <div className="rounded-3xl p-6 flex-1 space-y-8">
          {/* 1:1 Video Consultation */}
          <div className="bg-[#F8F7F3] p-6 rounded-xl ">
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
                <p className="text-[#7E7E7E] text-base font-semibold">Next available - <span className="text-[#0D70E5]">4:30am on 3/25</span></p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-[#FFA629] ml-3" />
                  ))}
                  <span className="ml-2 text-[#FFA629] font-semibold text-sm ">{profile.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4 gap-8">
              <Gift className="h-8 w-8" />
              <button className="bg-[#0D70E5] text-white py-3 px-24 rounded-md hover:bg-[#0A58C2]" onClick={navigateToTimeSelection}>
                See Time
              </button>
            </div>
          </div>

          {/* 1:4 Video Consultation */}
          <div className="bg-[#F8F7F3] p-6 rounded-xl ">
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
                <p className="text-[#7E7E7E] text-base font-semibold">Next available - <span className="text-[#0D70E5]">5:00pm on 3/25</span></p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-[#FFA629] ml-3" />
                  ))}
                  <span className="ml-2 text-[#FFA629] font-semibold text-sm ">{profile.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4 gap-8">
              <Gift className="h-8 w-8" />
              <button className="bg-[#0D70E5] text-white py-3 px-24 rounded-md hover:bg-[#0A58C2]" onClick={navigateToTimeSelection}>
                See Time
              </button>
            </div>
          </div>

          {/* Text for Selecting a Plan */}
          <p className="text-[#A6A6A6] text-center">------or select a plan------</p>

          {/* Plan Selection */}
          <div className="bg-[#F8F7F3] p-6 rounded-xl ">
            <div className="bg-black text-white p-4 rounded-t-xl max-w-max">
              <h3 className="text-2xl font-semibold">Select Plan #1</h3>
            </div>
            <div className="text-2xl py-4">
              <h2 className="font-medium">Growing a successful business - <br />
              1:1 Mentoring (VIP Access)</h2>
            </div>

            <div>
              <h3 className="text-xl font-semibold">What's included:</h3>
            </div>
            <ul className="list-disc pl-6">
              <li>1:1 Chat (Unlimited)</li>
              <li>1:1 Video Calls (120 min / month)</li>
              <li>Real world advice on physical retail, managing multiple locations, franchising, and more</li>
              <li>Lessons on branding, narrative, local marketing, delightful customer service, hiring, and more</li>
              <li>How to launch and grow a successful product line</li>
              <li>Invite to the Intro CEO Day in LA (must subscribe for 12 months or more)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertAboutMe;
