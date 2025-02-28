"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Default styling for the phone input
import { Inter } from "next/font/google";
import { useState, useRef } from "react";
import { FaLink } from "react-icons/fa";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function Page() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

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

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      document.getElementById("file-display").value = fileName;
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
          <div className="absolute top-[calc(100%+0.3in)] left-4 w-[355px] h-[78px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
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
        <div className="h-[calc(65%+1in)] bg-[#F8F7F3] flex items-end justify-center relative">
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
            width={580}
            height={600}
            className="object-contain z-20"
          />

          {/* Appointment Card */}
          <div className="absolute bottom-[calc(14px+0.8in)] right-[calc(8px+1.3in)] w-[355px] h-[80px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
            <LuNotepadText className="text-white text-[50px] mr-2" />
            <div>
              <h2 className="text-white font-medium text-xl">Book an appointment</h2>
              <p className="text-white text-lg font-extralight">Call/text/video/inperson</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="w-full md:w-2/3 bg-white flex flex-col items-center justify-center relative ">
        {/* Mobile Logo - Hidden on medium and larger screens */}
        <div className="absolute top-6 left-5 md:hidden">
          <Image src="/AMD_mobile_logo.png" alt="Mobile Logo" width={60} height={40} />
        </div>

        <div className="w-[93%] py-8 mt-10 md:mt-0">
          <h1 className="text-3xl md:text-[45px] font-bold mb-10 md:my-14 text-center">Please Enter Your Info</h1>

          <form>
            <div className="grid gap-6 gap-x-10 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="placeholder:text-black placeholder:font-semibold border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="last_name" className="placeholder:text-black placeholder:font-semibold block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="placeholder:text-black placeholder:font-semibold border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm text-gray-500 dark:text-gray">
                  Mobile number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="placeholder:text-black placeholder:font-semibold border border-gray-300 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+966 5XX XXX"
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
              <div>
                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                  Email
                </label>
                <input
                  type="url"
                  id="Email"
                  className="placeholder:text-black placeholder:font-semibold border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="flowbite.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Social Media Link
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="text"
                  className="border-gray-300 text-gray-900 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <FaLink className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Area of Expertise
              </label>
              <input
                type="text"
                id="text"
                className="placeholder:text-right border  border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0/100"
                required
              />
            </div>

            {/* Professional Certifications Section */}
            <div className="mb-6">
              <label htmlFor="professional-certifications" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Professional Certifications
              </label>
              <div className="flex items-center gap-0">
                <input
                  type="file"
                  id="professional-certifications"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <input
                  type="text"
                  id="file-display"
                  className="border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="No file chosen"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-2.5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Upload
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                Experience
              </label>
              <input
                type="text"
                id="text"
                className="placeholder:text-right border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0/100"
                required
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="h-12 text-md text-white bg-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-16 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;