"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { Inter } from "next/font/google";
import { useState } from "react";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  // Handle Phone Input
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    setPhone(value);

    if (value.length > 10) {
      setPhoneError("Phone number cannot be more than 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  // Handle OTP Input
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (value.length <= 4) {
      setOtp(value);
      setOtpError("");
    } else {
      setOtpError("OTP cannot be more than 4 digits.");
    }
  };

  return (
    <div className={`min-h-screen flex ${interFont.variable}`}>
      <div className="w-1/2 flex flex-col relative">
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

      {/* Right Section with Form */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h1 className="text-3xl font-extrabold text-center">Login</h1>
          <p className="text-center text-[#878787] mt-2">
            And{" "}
            <Link href="/signup" className="text-[#EA2B2B] font-semibold">
              Sign up
            </Link>
          </p>

          {/* Login Form */}
          <div className="mt-8 space-y-8">
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <span className="px-3 py-2">+91</span>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="9324248830"
                  maxLength={10}
                  className="w-full px-4 py-2 focus:outline-none"
                />
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                maxLength={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
              {otpError && <p className="text-red-500 text-xs mt-1">{otpError}</p>}
            </div>

            <button
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              disabled={phone.length !== 10 || otp.length !== 4}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
