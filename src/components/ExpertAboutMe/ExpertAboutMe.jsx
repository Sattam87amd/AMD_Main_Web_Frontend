"use client";

import React from "react";
import { FaStar } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa"; // Instagram Icon

const ExpertAboutMe = () => {
  const profile = {
    name: "Darrell Steward",
    designation: "Tech Entrepreneur + Investor",
    image: "/guyhawkins.png",
    rating: 5.0,
    about: `Co-Founder of Reddit. First Batch of Y Combinator (Summer 
    2005) and led the company to a sale to Conde Nast in 2006, 
    Returned as Executive Chair in 2014 to help lead the turnaround, then left in 2018 to do venture capital full-time.

    I'm an investor in startups—almost always at the earliest 
    possible stage—first as an angel investor, then co-founder 
    of Initialized, before splitting the firm in half to found Seven 
    Seven Six.

    I'm an investor in startups—almost always at the earliest 
    possible stage—first as an angel investor, then co-founder 
    of Initialized, before splitting the firm in half to found Seven 
    Seven Six.`,

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

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center md:px-6 py-12">
      {/* Profile Card */}
      <div className="bg-[#F8F7F3] rounded-3xl w-[90%] mt-20 md:mt-0 max-w-7xl p-6 md:p-10 flex flex-col md:flex-row gap-10">
        
        {/* Left: Profile Image & Info */}
        <div className="md:w-[35%] flex flex-col items-start">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-[400px] h-[450px] object-cover rounded-2xl shadow-md"
          />
          <div className="text-start mt-4">
            <h2 className="text-3xl text-gray-900">{profile.name}</h2>
            <p className="text-[#9C9C9C] text-base mt-1">{profile.designation}</p>
            <div className="flex items-center justify-start mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-[#FFA629]" />
              ))}
              <span className="ml-2 text-[#FFA629] font-semibold text-sm">{profile.rating}</span>
            </div>
          </div>
        </div>

        {/* Right: About Me Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl md:text-[44px] pb-4 pl-0 md:pl-64 text-gray-900">
              About Me
            </h3>
            <FaInstagram className="text-gray-500 text-xl md:text-[40px] cursor-pointer hover:text-gray-700" />
          </div>

          {/* Render About Text with Proper Spacing */}
          <p className="text-black text-sm md:text-base  pl-0 md:pl-64 leading-relaxed mt-4 whitespace-pre-line">
            {profile.about}
          </p>

          {/* Strengths Section */}
          <h4 className="text-md font-semibold mt-4 pl-0 md:pl-64 flex items-center">
            <span className="text-yellow-500 text-lg mr-2">💡</span> Strengths:
          </h4>
          <ul className="list-none mt-2 space-y-1 pl-0 md:pl-64">
            {profile.strengths.map((strength, index) => (
              <li key={index} className="text-gray-700 flex items-center text-sm">
                <span className="text-yellow-500 mr-2">✔</span> {strength}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Book a Video Call Button Aligned Left */}
      <div className="w-[90%] flex justify-start mt-10 pl-0 md:pl-10">
        <button className="bg-[#EDECE8] text-black font-semibold py-4 px-14 rounded-lg hover:bg-gray-300 transition">
          Book a Video Call
        </button>
      </div>
    </div>
  );
};

export default ExpertAboutMe;
