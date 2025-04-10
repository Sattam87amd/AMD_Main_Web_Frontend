"use client";

import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");  // New state for gender
  const [errors, setErrors] = useState({});

  // Validation for required fields
  const handleValidation = () => {
    let tempErrors = {};

    if (!email) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Invalid email format.";
    }

    if (!firstName) {
      tempErrors.firstName = "First name is required.";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      tempErrors.firstName = "First name can only contain letters.";
    }

    if (!lastName) {
      tempErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      tempErrors.lastName = "Last name can only contain letters.";
    }

    if (!gender) {
      tempErrors.gender = "Gender is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission - Now routes to /expertpanel/registerform
  const handleSubmit = () => {
    if (handleValidation()) {
      // Save data to localStorage
      localStorage.setItem("registerData", JSON.stringify({ firstName, lastName, email, gender }));
      router.push("/expertpanel/registerform"); // Navigate to the register form
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
        <div className="h-[75%] bg-[#F8F7F3] flex items-end justify-center relative">
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
            className="object-contain z-20 "
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
        <div className="w-full max-w-md p-8 -mt-20 md:-mt-0">
          <h1 className="text-[29px] md:text-[35px] font-extrabold text-center">Please Enter Your Info</h1>

          {/* Registration Form */}
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
                className="w-full px-4 py-3 border rounded-lg focus:outline-8 focus:border-black"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z]/g, ""); // Remove numbers and special characters
                  setFirstName(value);
                  setErrors({ ...errors, firstName: "" });
                }}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-8 focus:border-black"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z]/g, ""); // Remove numbers and special characters
                  setLastName(value);
                  setErrors({ ...errors, lastName: "" });
                }}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-8 focus:border-black"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            {/* Gender Dropdown */}
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setErrors({ ...errors, gender: "" });
                }}
                className="w-full px-4 py-3 border rounded-lg focus:outline-8 focus:border-black"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to Say">Prefer not to say</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>

            <button
              className={`w-full py-3 rounded-lg transition ${
                email && firstName && lastName && gender
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!email || !firstName || !lastName || !gender}
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
