"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import {
  FaUser,
  FaGift,
  FaComments,
  FaTrashAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { MdOutlineFeedback } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import PaymentMethods from "./PaymentMethod";
import DiscountCode from "./DiscountCode";
import GiftCard from "./GiftCard";
import BuyGiftCard from "./BuyGiftCard";
import ExpertContactUs from "./ExpertContactUs";
import PaymentHistory from "./PaymentHistory";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSection = () => {
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [expertStatus, setExpertStatus] = useState("pending"); // Assuming default status is pending

  const [profileData, setProfileData] = useState({
    photoFile: "",
    firstName: "",
    lastName: "",
    phone: "", // Set default value to an empty string
    email: "thakur@.com",
  });

  const [expertId, setExpertId] = useState(""); // Will be set from expertToken

  // Fetch expertId from localStorage
  useEffect(() => {
    const expertToken = localStorage.getItem("expertToken");

    if (expertToken) {
      try {
        // Assuming the expertToken contains the _id directly (if it's JWT)
        const decodedToken = JSON.parse(atob(expertToken.split(".")[1])); // Decode JWT token
        const expertId = decodedToken._id;
        setExpertId(expertId); // Set the expertId to state
      } catch (error) {
        console.error("Error parsing expertToken:", error);
        toast.error("Expert token not found in localStorage");
      }
    }
  }, []);

  // Fetch expert details by ID on component mount
  useEffect(() => {
    if (expertId) {
      const fetchExpertDetails = async () => {
        try {
          const response = await axios.get(
            `https://amd-api.code4bharat.com/api/expertauth/${expertId}`
          );
          const {
            photoFile,
            firstName,
            lastName,
            phone = "",
            email,
            status
          } = response.data.data; // Default empty string for phone
          
          setProfileData({
            firstName,
            lastName,
            phone, // Assign phone with a default value if missing
            email,
            photoFile, // Ensure the photoFile is added to profileData
          });
          
          // Set expert status if available
          if (status) {
            setExpertStatus(status);
          }
        } catch (error) {
          console.error("Error fetching expert details:", error);
          toast.error("Error fetching expert details");
        }
      };

      fetchExpertDetails();
    }
  }, [expertId]); // The effect runs when the expert ID changes

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    
    try {
      // Make API call to update user profile
      const response = await axios.put(
        `https://amd-api.code4bharat.com/api/expertauth/updateexpert/${expertId}`,
        {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          email: profileData.email
        }
      );
      
      if (response.data.success) {
        setIsEditing(false);
        setSuccessMessage("Changes Saved!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        toast.error(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  // Function to handle nav item clicks
  const handleNavClick = (itemName) => {
    // Only allow Profile and Deactivate account to be clickable
    if (itemName === "Profile" || itemName === "Deactivate account") {
      setSelectedSection(itemName);
    } else {
      // Show toast for other items
      toast.info("This feature is only available for approved experts.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Array of navigation items
  const navItems = [
    { name: "Profile", icon: FaUser, enabled: true },
    { name: "Payment Methods", icon: FiDollarSign, enabled: false },
    { name: "Do you have code?", icon: FaGift, enabled: false },
    { name: "Gift Card", icon: FaGift, enabled: false },
    { name: "Contact Us", icon: FaComments, enabled: false },
    { name: "Payment History", icon: FiDollarSign, enabled: false },
    { name: "Give us Feedback", icon: MdOutlineFeedback, enabled: false },
    { name: "Deactivate account", icon: FaTrashAlt, enabled: true },
  ];

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
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name)}
              className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition ${
                selectedSection === item.name
                  ? "bg-black text-white"
                  : item.enabled 
                    ? "hover:bg-gray-200 text-[#7E7E7E]" 
                    : "text-[#7E7E7E] cursor-pointer" // Keep cursor pointer for toast feedback
                }`}
            >
              <item.icon
                className={
                  selectedSection === item.name ? "text-white" : "text-[#7E7E7E]"
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4 md:space-x-6">
                {/* Only render the image if the photoFile is a valid URL */}
                {profileData.photoFile ? (
                  <div className="rounded-full border-2 border-white ">
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                      <Image
                        src={profileData.photoFile}
                        alt="profile"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-[100px] h-[100px] rounded-full bg-gray-300" />
                )}
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-[#434966]">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-500">India</p>
                  <p className="text-sm text-amber-600">
                    Status: {expertStatus === "pending" ? "Pending Approval" : expertStatus}
                  </p>
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
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""
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
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone" // Fixed to match your state variable name
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""
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
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                />
              </div>

              {/* Save Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={!isEditing}
                  className={`text-white font-medium rounded-2xl text-sm px-6 md:px-16 py-2.5 text-center ${isEditing
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

        {/* Deactivate account */}
        {selectedSection === "Deactivate account" && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Deactivate Account</h2>
            <p>Are you sure you want to deactivate your account?</p>
            {/* Add deactivation functionality here */}
            <div className="mt-6">
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-6 py-2.5">
                Deactivate Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default ProfileSection;