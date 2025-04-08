"use client";

import { useState } from "react";
import {
  FaUser,
  FaGift,
  FaComments,
  FaTrashAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineFeedback } from "react-icons/md";
import { CiSettings } from "react-icons/ci"; 
import UserExpertContactUs from "./UserExpertContactUs";
import UserBuyGiftCard from "./UserBuyGiftCard";
import UserDiscountCode from "./UserDiscountCode";
import UserPaymentMethods from "./UserPaymentMethods";
import UserGiftCard from "./UserGiftCard";
import UserPaymentHistory from "./UserPaymentHistory";

const UserProfileSection = () => {
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [profileData, setProfileData] = useState({
    firstName: "Basim",
    lastName: "Thakur",
    mobileNumber: "+919876543210",
    email: "thakur@gmail.com",
  });

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSuccessMessage("Changes Saved!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="flex flex-col md:flex-row border rounded-xl overflow-hidden bg-white m-4 md:m-8">
      {/* Sidebar - Hidden on Small Screens, Visible on Medium+ */}
      <aside className="hidden md:block w-64 bg-white p-6 border-r h-[800px]">
        {/* Updated Settings Heading with Icon */}
        <h2 className="flex items-center justify-between text-lg font-semibold pb-4 border-b mb-3">
          <span>Settings</span>
          <CiSettings className="text-3xl text-[#7E7E7E]" />
        </h2>

        <nav className="space-y-6">
          {[
            { name: "Profile", icon: FaUser },
            { name: "Payment Methods", icon: FiDollarSign },
            { name: "Do you have code?", icon: FaGift },
            { name: "Gift Card", icon: FaGift },
            { name: "Contact Us", icon: FaComments },
            { name: "Payment History", icon: FiDollarSign },
            { name: "Give us Feedback", icon: MdOutlineFeedback },
            { name: "Sign Out", icon: BiLogOut },
            { name: "Deactivate account", icon: FaTrashAlt },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setSelectedSection(item.name)}
              className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition ${
                selectedSection === item.name
                  ? "bg-black text-white"
                  : "hover:bg-gray-200 text-[#7E7E7E]"
              }`}
            >
              <item.icon
                className={
                  selectedSection === item.name
                    ? "text-white"
                    : "text-[#7E7E7E]"
                }
              />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Profile Section */}
        {selectedSection === "Profile" && (
          <div className="mt-6">
            <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex i  tems-center space-x-4 md:space-x-6">
                <img
                  src="/guyhawkins.png"
                  alt="profile"
                  className="w-16 h-16 rounded-full"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-[#434966]">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-500">India</p>
                </div>
              </div>
              <button
                className="border border-[#434966] px-4 md:px-5 py-2 text-[#434966] font-semibold rounded-lg flex items-center gap-2"
                onClick={handleEditClick}
              >
                Edit <LuPencilLine className="text-black h-5 w-5" />
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 flex items-center text-green-600 font-medium">
                <FaCheckCircle className="mr-2" /> {successMessage}
              </div>
            )}

            {/* Profile Form */}
            <form
              className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
              onSubmit={handleSaveClick}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={profileData.mobileNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Save Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={!isEditing}
                  className={`text-white font-medium rounded-2xl text-sm px-6 md:px-16 py-2.5 text-center ${
                    isEditing
                      ? "bg-black hover:bg-gray-900 focus:ring-gray-300"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Payment Methods */}
        {selectedSection === "Payment Methods" && <UserPaymentMethods />}

        {/* Discount Code */}
        {selectedSection === "Do you have code?" && <UserDiscountCode />}

        {/* Gift Card */}
        {selectedSection === "Gift Card" && (
          <UserGiftCard onContinue={() => setSelectedSection("BuyGiftCard")} />
        )}

        {/* Buy Gift Card */}
        {selectedSection === "BuyGiftCard" && <UserBuyGiftCard />}

        {/* Contact Us */}
        {selectedSection === "Contact Us" && <UserExpertContactUs />}

         {/* Payment History */}
        {selectedSection === "Payment History" && <UserPaymentHistory />}
      </div>
    </div>
  );
};

export default UserProfileSection;
