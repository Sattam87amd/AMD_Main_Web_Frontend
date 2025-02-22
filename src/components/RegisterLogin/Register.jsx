"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Default styling for the phone input
import { Inter } from "next/font/google";
import { useState } from "react";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});

  // Validation for required fields
  const handleValidation = () => {
    let tempErrors = {};

    if (!email) tempErrors.email = "Email address is required.";
    if (!firstName) tempErrors.firstName = "First name is required.";
    if (!lastName) tempErrors.lastName = "Last name is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (handleValidation()) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className={`min-h-screen flex ${interFont.variable}`}>
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

      {/* Right Section with Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center relative">
        {/* Mobile Logo - Hidden on medium and larger screens */}
        <div className="absolute top-6 left-5 md:hidden">
          <Image src="/AMD_mobile_logo.png" alt="Mobile Logo" width={60} height={40} />
        </div>

        <div className="w-full max-w-md p-8">
          <h1 className="text-3xl md:text-[35px] font-extrabold text-center">Please Enter Your Info</h1>

          {/* Login Form */}
          <div className="mt-8 space-y-8">
            <div>
              <label className="block text-sm font-medium">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors({ ...errors, firstName: "" });
                }}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors({ ...errors, lastName: "" });
                }}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            <button
              className={`w-full py-3 rounded-lg transition ${
                email && firstName && lastName
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!email || !firstName || !lastName}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
