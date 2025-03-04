"use client";

import { useState } from "react";
import Image from "next/image";
import { LuPencilLine } from "react-icons/lu";
import { FiAtSign } from "react-icons/fi";

const EditExpertProfile = () => {
  // State to track the active sidebar section
  const [selectedSection, setSelectedSection] = useState("Edit Profile");
  // Editing mode state
  const [isEditing, setIsEditing] = useState(false);
  // Notifications toggle
  const [isEnabled, setIsEnabled] = useState(false);

  // Expert basic info
  const [expertData, setExpertData] = useState({
    firstName: "Basim",
    lastName: "Thakur",
    expertise: "Software Development",
    country: "India",
  });

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    name: "Basim Thakur",
    dateOfBirth: "20/07/2003",
    age: "21",
    phoneNumber: "+91 9087654321",
    email: "thakur@gmail.com",
    bio: "Entrepreneur",
  });

  // About Me
  const [aboutMe, setAboutMe] = useState({
    description:
      "Co-Founder Of Reddit. First Batch Of Y Combinator (Summer 2005) And Led The Company To A Sale To Condé Nast In 2006, Returned As Exec Chair In 2014 To Help Lead The Turnaround, Then Left In 2018 To Do Venture Capital Full-time.\n\nI'm An Investor In Startups —Almost Always At The Earliest Possible Stage— First As An Angel Investor, Then Co-Founder Of Initialized, Before Splitting The Firm In Half To Found Seven Seven Six.",
    advice: [
      "Startup Struggles",
      "Customer Retention/Service",
      "The Beauty Industry",
      "Product Development",
      "Branding & PR",
      "How To Get Products Into Retail",
      "Hiring",
      "Franchising",
      "Mergers & Acquisitions",
      "Growth",
      "Thinking Outside The Box",
    ],
  });

  // Social Media
  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
  });

  const handleSocialMediaChange = (e) => {
    setSocialMedia({ ...socialMedia, [e.target.name]: e.target.value });
  };

  // Sidebar Menu Items
  const menuItems = [
    { name: "Edit Profile" },
    { name: "Enable Charity" },
    { name: "Edit what to Expect" },
    { name: "Edit example questions" },
    { name: "Social Media Links" }, // Let's assume you want this in the same menu
    { name: "Availability", isHeader: true },
    { name: "Set my preferred availability" },
    { name: "Connect my calendar" },
    { name: "Group Sessions" },
    { name: "Offerings", isHeader: true },
    { name: "1:1 Video session prices" },
    { name: "Available session lengths" },
  ];

  // Handlers to toggle "editing" for the profile
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col md:flex-row border rounded-xl overflow-hidden bg-white min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white p-6 border-r md:h-[800px]">
        <h2 className="text-lg font-semibold pb-4 border-b mb-3 text-black">
          Settings
        </h2>
        <nav className="space-y-6">
          {menuItems.map((item) =>
            item.isHeader ? (
              <h3 key={item.name} className="text-black mt-4">
                {item.name}
              </h3>
            ) : (
              <button
                key={item.name}
                onClick={() => setSelectedSection(item.name)}
                className={`flex items-center justify-between w-full text-left p-2 rounded-lg transition md:gap-3 ${
                  selectedSection === item.name
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 text-[#7A7D84]"
                }`}
              >
                <span className="flex items-center gap-3">{item.name}</span>
                <span className="md:hidden">&gt;</span>
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Right Side Content */}
      <div className="flex-1 p-6 md:p-8 bg-white space-y-6">
        {/* --------------------------------------- */}
        {/* EDIT PROFILE SECTION */}
        {selectedSection === "Edit Profile" && (
          <>
            {/* ---------- Profile Card ---------- */}
            <div className="bg-white rounded-2xl p-6 border border-gray-300">
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <Image
                    src="/guyhawkins.png"
                    alt="Expert Profile"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                  />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-[#434966]">
                      {expertData.firstName} {expertData.lastName}
                    </h3>
                    <p className="text-gray-500">{expertData.expertise}</p>
                    <p className="text-gray-500">{expertData.country}</p>
                  </div>
                </div>

                {isEditing ? (
                  <button
                    className="border border-[#434966] px-4 py-2 text-white font-medium bg-black rounded-lg flex items-center gap-2"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="border border-[#434966] px-4 py-2 text-[#434966] font-medium rounded-lg flex items-center gap-2"
                    onClick={handleEditClick}
                  >
                    Edit <LuPencilLine className="text-black h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* ---------- Personal Information ---------- */}
            <div className="bg-white rounded-2xl p-6 border border-gray-300">
              <div className="flex flex-row items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#434966]">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.keys(personalInfo).map((key) => (
                  <div key={key}>
                    <label className="block text-[#7A7D84] text-sm font-medium mb-1">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <p className="text-[#434966] font-semibold">
                      {personalInfo[key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- About Me Section ---------- */}
            <div className="bg-white rounded-2xl p-6 border border-gray-300">
              <div className="flex flex-row items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">About Me</h3>
              </div>
              <p className="text-[#434966]">{aboutMe.description}</p>
              <h3 className="mt-4 text-md font-semibold text-black">
                Things I Can Advice On:
              </h3>
              <ul className="text-[#434966]">
                {aboutMe.advice.map((item, index) => (
                  <li key={index}>- {item}</li>
                ))}
              </ul>
            </div>

            {/* ---------- General Settings ---------- */}
            <div className="bg-white rounded-2xl p-6 border border-gray-300">
              <h3 className="text-lg font-semibold text-[#232323] mb-4">
                General
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-black font-medium">Notifications</span>
                </div>
                {/* Toggle Switch */}
                <label className="inline-flex items-center cursor-pointer">
                  <span className="text-sm text-gray-500 mr-3">
                    Enable Notifications
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isEnabled}
                    onChange={() => setIsEnabled(!isEnabled)}
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full transition ${
                      isEnabled ? "bg-black" : "bg-gray-200"
                    } peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black`}
                  >
                    <div
                      className={`absolute top-[2px] left-[2px] bg-white border-gray-300 border w-5 h-5 rounded-full transition-all ${
                        isEnabled ? "translate-x-full border-white" : ""
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </>
        )}

        {/* --------------------------------------- */}
        {/* SOCIAL MEDIA LINKS SECTION */}
        {selectedSection === "Social Media Links" && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-black mb-4">
              Social Media Links
            </h3>

            {[
              { label: "Instagram", name: "instagram" },
              { label: "Twitter", name: "twitter" },
              { label: "LinkedIn", name: "linkedin" },
              { label: "YouTube", name: "youtube" },
              { label: "TikTok", name: "tiktok" },
            ].map((social) => (
              <div key={social.name} className="mb-4">
                <label className="block mb-2 text-sm font-medium text-black">
                  {social.label} username
                </label>
                <div className="relative">
                  {/* @ Icon */}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiAtSign className="text-gray-500" />
                  </div>
                  {/* Input Field */}
                  <input
                    type="text"
                    name={social.name}
                    value={socialMedia[social.name]}
                    onChange={handleSocialMediaChange}
                    placeholder="@ username (optional)"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5"
                  />
                </div>
              </div>
            ))}
            <button className="w-full bg-black text-white text-sm font-semibold py-2.5 rounded-lg mt-4">
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditExpertProfile;
