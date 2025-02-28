"use client";

import Image from "next/image";

const HowItWork = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 md:gap-24 p-6 bg-[#EDECE8] justify-center items-center">
      {/* Left Side Cards */}
      <div className="space-y-8 md:space-y-12">
        {/* How It Works Card (Empty Section) */}
        <div className="p-4 md:p-8 w-full md:w-[600px] md:min-h-[360px] overflow-hidden">
        <h2 className="text-xl md:text-5xl font-semibold md:tracking-wide md:font-bold text-black md:mt-20">How It Works</h2>
      <p className="text-lg md:text-xl font-medium text-gray-800 mt-2">
        Easily Set Up Your Profile, Customize Your Schedule, Share Your Booking Link, 
        And Start Hosting Expert Video Consultations—All In Just A Few Steps!
      </p>
        </div>

        {/* Create Your Profile Card */}
        <div className="bg-black text-white p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden">
          <Image src="/girlimage.png" alt="Instant Access" width={100} height={80} className="mb-6" />
          <h3 className="text-xl md:text-3xl font-bold">Create Your profile</h3>
          <p className="text-sm md:text-lg mt-4 leading-relaxed">
          Upload a professional photo, write a compelling bio highlighting your expertise, and set your session price to showcase your value to potential clients.
          </p>
        </div>

        {/* Share Your Booking Link Card */}
        <div className="bg-white p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden ">
          <Image src="/phone.png" alt="100% Secure Payments" width={100} height={80} className="mb-6" />
          <h3 className="text-xl md:text-3xl font-bold">Share Your Booking Link</h3>
          <p className="text-sm md:text-lg text-gray-600 mt-4 leading-relaxed">
          Maximize your reach by promoting your personalized booking page across social media, websites, email newsletters, and professional networks to attract more clients.
          </p>
        </div>
      </div>

      {/* Right Side Cards */}
      <div className="space-y-8 md:space-y-12 md:mt-32">
        {/* Set Your Schedule Card */}
        <div className="bg-white p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden">
          <Image src="/book.png" alt="Top Industry Experts" width={100} height={80} className="mb-6" />
          <h3 className="text-xl md:text-3xl font-bold">Set Your Schedule</h3>
          <p className="text-sm md:text-lg text-gray-600 mt-4 leading-relaxed">
          Customize your availability by selecting preferred time slots that fit your routine, ensuring a seamless balance between work and flexibility.
          </p>
        </div>

        {/* Flexible Scheduling Card */}
        <div className="bg-white p-4 md:p-8 shadow-md w-full md:w-[600px] md:min-h-[360px] overflow-hidden">
          <Image src="/study.png" alt="Flexible Scheduling" width={100} height={80} className="mb-6" />
          <h3 className="text-xl md:text-3xl font-bold">Connect Via Video Calls</h3>
          <p className="text-sm md:text-lg text-gray-600 mt-4 leading-relaxed">
          Host high-quality video consultations in a seamless and interactive environment, providing expert guidance while delivering real value to your audience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
