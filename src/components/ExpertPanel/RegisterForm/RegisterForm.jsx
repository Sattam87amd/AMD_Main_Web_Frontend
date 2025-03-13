"use client";

import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { Inter } from "next/font/google";
import { useState, useRef } from "react";
import { FiLink } from "react-icons/fi";
import { useRouter } from "next/navigation";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [areaOfExpertise, setAreaOfExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Validate required fields
  const handleValidation = () => {
    let tempErrors = {};

    if (!firstName) tempErrors.firstName = "First name is required.";
    if (!lastName) tempErrors.lastName = "Last name is required.";
    if (!mobile) tempErrors.mobile = "Mobile number is required.";
    if (!email) tempErrors.email = "Email address is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle file input change with 256 KB max limit
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 256 * 1024) {
        // File too large
        setErrors((prev) => ({
          ...prev,
          file: "Max 256 kb files can be uploaded",
        }));
        document.getElementById("file-display").value = "";
      } else {
        // Valid file
        document.getElementById("file-display").value = file.name;
        setErrors((prev) => ({ ...prev, file: "" }));
      }
    }
  };

  // Handle form submission & route to /experts
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent actual page reload
    if (handleValidation()) {
      router.push("/experts");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className={`min-h-screen flex overflow-hidden ${interFont.variable}`}>
      {/* Left Side Section (Hidden on small screens, visible on md+) */}
      <div className="hidden md:flex w-1/2 flex-col relative">
        {/* Top Section with AMD Logo */}
        <div className="h-[35%] bg-[#EDECE8] flex items-center justify-center relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Image src="/AMD_logo.png" alt="AMD Logo" width={190} height={190} />
          </div>
          {/* Experts Card */}
          <div className="absolute top-72 left-4 w-[355px] h-[78px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
            <IoIosSearch className="text-white text-[50px] mr-2" />
            <div>
              <h2 className="text-white font-light text-2xl">
                Professional Experts
              </h2>
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
              <h2 className="text-white font-medium text-xl">
                Book an appointment
              </h2>
              <p className="text-white text-lg font-extralight">
                Call/text/video/inperson
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Section with Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-start relative">
        <div className="w-[93%] py-8">
          <h1 className="text-3xl md:text-[40px] font-bold mt-2 pb-10 text-center">
            Please Enter Your Info
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Row 1: First/Last Name */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors({ ...errors, firstName: "" });
                  }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Basim"
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors({ ...errors, lastName: "" });
                  }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Thakur"
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Row 2: Mobile/Email */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-500">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    setMobile(numericValue);
                    setErrors({ ...errors, mobile: "" });
                  }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="+91 892 345 6789"
                  required
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "" });
                  }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="basim@gmail.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Social Media Link */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-500">
                Social Media Link
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
                  placeholder="https://your-social-link"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FiLink className="text-black" />
                </span>
              </div>
            </div>

            {/* Area of Expertise (100-char limit with dynamic counter) */}
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-medium text-gray-500">
                Area of Expertise
              </label>
              <input
                type="text"
                maxLength={100}
                value={areaOfExpertise}
                onChange={(e) => setAreaOfExpertise(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
                
              />
              <span className="absolute right-2 top-10 text-xs text-gray-500">
                {100 - areaOfExpertise.length}/100
              </span>
            </div>

            {/* Professional Certifications (max 256 kb) */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-500">
                Professional Certifications
              </label>
              <div className="flex">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                <input
                  type="text"
                  id="file-display"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
                  placeholder=""
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2.5"
                >
                  Upload
                </button>
              </div>
              {errors.file && (
                <p className="text-[#CF1313] text-sm mt-1">{errors.file}</p>
              )}
            </div>

            {/* Experience (100-char limit with dynamic counter) */}
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-medium text-gray-500">
                Experience
              </label>
              <input
                type="text"
                maxLength={100}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
                
              />
              <span className="absolute right-2 top-10 text-xs text-gray-500">
                {100 - experience.length}/100
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="h-12 w-44 text-md text-white bg-black hover:bg-gray-800 font-medium rounded-xl md:rounded-2xl text-sm flex items-center justify-center"
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

export default RegisterForm;
