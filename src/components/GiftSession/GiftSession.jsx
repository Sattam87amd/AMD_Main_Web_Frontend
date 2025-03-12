"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { Gift, ArrowLeft } from "lucide-react";

function GiftSession() {
  const router = useRouter();
  const amounts = [200, 500, 750, 1000];
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountClick = (amount) => {
    if (selectedAmount === amount) {
      setSelectedAmount(null); // Unselect if already selected
    } else {
      setSelectedAmount(amount);
      setCustomAmount(""); // Clear custom amount on selecting preset
    }
  };

  const handleContinue = () => {
    router.push("/buygiftsession");
  };

  const renderGiftCard = () => (
    <div className="w-full bg-white p-6 rounded-xl md:border mx-1 md:mx-10 relative">
      {/* Back Button and Logo (Visible only on mobile) */}
      <div className="md:hidden">
        <button
          className="absolute top-2 left-2 z-10 p-2"
          onClick={() => router.push('/home')}
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>

        <div className="flex justify-center pt-8 mb-4">
          <Image src="/AMD_logo.png" alt="AMD Logo" width={250} height={40} />
        </div>
      </div>

      {/* Icon and Heading */}
      <div className="flex flex-col items-center space-y-2 mt-10 mb-12">
        <Gift strokeWidth={0.9} className="w-10 h-10 md:w-14 md:h-14 text-black" />
        <h2 className="text-lg font-semibold">Send a gift card</h2>
        <p className="text-[#3B9AB8] text-center text-sm md:text-xl">
          Gift a session to a friend, family, <br />
          or coworker
        </p>
      </div>

      {/* Amount Selection */}
      <div className="mt-5">
        <h3 className="text-lg md:text-2xl font-semibold">Buy a giftcard</h3>
        <p className="text-black text-sm md:text-xl mb-6">Please select an amount</p>

        <div className="grid grid-cols-3 gap-3 md:grid-cols-5 mt-4 mb-9">
          {amounts.map((amount) => (
            <button
              key={amount}
              className={`p-3 text-center font-semibold transition-all ${
                selectedAmount === amount ? "bg-black text-white" : "bg-[#D9D9D9] text-black"
              }`}
              onClick={() => handleAmountClick(amount)}
            >
              ${amount}
            </button>
          ))}

          {/* Custom Input */}
          <input
            type="number"
            className="p-3 border border-gray-400 text-center w-full focus:outline-none"
            placeholder="$Custom"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null); // Clear selected amount on entering custom amount
            }}
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-6 flex justify-center pb-8">
        <button
          className="w-56 bg-black text-white py-3 rounded-2xl font-normal disabled:opacity-50"
          disabled={!selectedAmount && !customAmount}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Image Section */}
      <div className="hidden md:flex w-1/2 flex-col relative">
        {/* Top Section with AMD Logo */}
        <div className="h-[35%] bg-[#EDECE8] flex items-center justify-center relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Image src="/AMD_logo.png" alt="AMD Logo" width={190} height={190} />
          </div>

          {/* Experts Card */}
          <div className="absolute top-full left-4 w-[355px] h-[78px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
            <IoIosSearch className="text-white text-[50px] mr-2" />
            <div>
              <h2 className="text-white font-light text-2xl">Professional Experts</h2>
              <p className="text-white text-xs font-extralight">
                Expert Guidance from the Best in the Industry
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section with Arab Woman Image */}
        <div className="h-[65%] bg-[#F8F7F3] flex items-end justify-center relative">
          <div className="absolute top-0 left-0 w-full">
            <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#EDECE8"
                fillOpacity="1"
                d="M0,192L120,165.3C240,139,480,85,720,85C960,85,1200,139,1320,165.3L1440,192V0H0Z"
              ></path>
            </svg>
          </div>
          <Image
            src="/ArabWomanLogin.svg"
            alt="Arab Woman"
            width={490}
            height={600}
            className="object-contain z-20"
          />

          {/* Appointment Card */}
          <div className="absolute bottom-14 right-8 w-[355px] h-[78px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
            <LuNotepadText className="text-white text-[50px] mr-2" />
            <div>
              <h2 className="text-white font-medium text-xl">Book an appointment</h2>
              <p className="text-white text-lg font-extralight">Call/text/video/inperson</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: GiftCard Content */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center">
        {renderGiftCard()}
      </div>
    </div>
  );
}

export default GiftSession;
