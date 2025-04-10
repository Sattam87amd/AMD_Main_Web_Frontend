"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon, UserPlusIcon } from "lucide-react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const UserBooking = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    bookingType: "individual",
    inviteFriend: "",
    promoCode: "",
    selectedSessions: [],
  });

  const [sessions] = useState([
    {
      day: "Thu",
      date: "27 Feb",
      timeSlots: [
        { id: "thu-1", time: "08:00 AM-08:15 AM", selected: false },
        { id: "thu-2", time: "08:20 AM-08:35 AM", selected: false },
      ],
    },
    {
      day: "Fri",
      date: "28 Feb",
      timeSlots: [
        { id: "fri-1", time: "08:00 AM-08:15 AM", selected: false },
        { id: "fri-2", time: "09:00 AM-09:15 AM", selected: false },
        { id: "fri-3", time: "09:20 AM-09:35 AM", selected: false },
      ],
    },
  ]);

  useEffect(() => {
    const savedData = localStorage.getItem("bookingData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(userData));
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const router = useRouter()
  return (
    <div className="w-full mx-8 mt-8 px-6 md:px-10 py-[6rem]">
      <div className="flex flex-col  md:flex-row gap-10">
        
        {/* Left Section (Profile & Sessions) */}
        <div className="w-full md:w-1/2  flex flex-col items-center text-center md:text-left">
          {/* Profile Image */}
          <div className="w-32 h-38 md:w-[14rem] md:h-[16rem] rounded-lg overflow-hidden shadow-md">
            <Image
              src="/image.png"
              alt="Darrell Steward"
              width={224}
              height={224}
              className="object-cover"
            />
          </div>

          {/* Expert Info */}
          <div className="mt-4 md:mt-6 bg-[#F8F7F3] px-4 md:p-6 rounded-lg shadow-md w-full">
            <h1 className="text-xl md:text-2xl font-bold">Darrell Steward</h1>
            <p className="text-gray-500 text-sm md:text-base">Tech Entrepreneur + Investor</p>
            
            {/* Ratings */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-sm font-semibold">5.0</span>
            </div>

            {/* Sessions */}
            <div className="mt-4">
              <p className="font-medium mb-2 text-gray-700 ">Sessions -</p>
              {sessions.map((session, idx) => (
                <div key={idx} className="mb-3">
                  <p className="text-sm font-medium text-gray-700">
                    {session.day}, {session.date}
                  </p>
                  <div className="flex flex-wrap  gap-2 mt-1">
                    {session.timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        className="px-4 py-1 text-xs md:text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-red-500 text-xs md:text-sm mt-2">
                Note: Can add up to 5 sessions at different time slots. Any 1 time slot might get selected.
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Line (Only on MD Screens) */}
        <span className="hidden md:block border h-auto"><hr /></span>

        {/* Right Section (Booking Form) */}
        <div className="w-full h-1/2 md:w-1/2 p-6 relative">
          <div className="border rounded-lg p-6 relative mb-4 shadow-sm">

            {/* Change Button */}
            <button className="absolute top-4 right-4 text-sm border rounded-lg px-3 py-1 -translate-y-8 bg-white">
              Change
            </button>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={userData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Booking Type */}
          {/* <div className="flex items-center justify-center gap-6 mb-6 space-x-8 md:space-x-40">
            <label className="flex items-center">
              <input
                type="radio"
                name="bookingType"
                value="individual"
                checked={userData.bookingType === "individual"}
                onChange={handleInputChange}
                className="mr-2 accent-black "
              />
              Individual
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="bookingType"
                value="group"
                checked={userData.bookingType === "group"}
                onChange={handleInputChange}
                className="mr-2 accent-black "
              />
              Group
            </label>
          </div> */}

          {/* Invite Friend (Only for Group) */}
          {userData.bookingType === "group" && (
            <div className="mb-6">
              <label className="block text-sm mb-1">Invite a Friend</label>
              <div className="relative">
                <input
                  type="text"
                  name="inviteFriend"
                  value={userData.inviteFriend}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm pr-10"
                  placeholder="Enter friend's email or phone"
                />
                <UserPlusIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>
          )}


           {/* Apply Promo Code Section (Added Back) */}
           <div className="flex justify-center" >
  <div className="mb-6 md:w-1/2 rounded-lg ">
    {/* <label className="block text-sm mb-1">Promo Code</label>  */}
    <div className="flex my-6">
      <input
        type="text"
        name="promoCode"
        value={userData.promoCode}
        onChange={handleInputChange}
        className="w-full border rounded-l px-3 py-2 text-black text-sm "
        placeholder="Enter promo code"
      />
      <button className="bg-black text-white px-4 py-2 text-sm rounded-r">
        Apply
      </button>
    </div>
  </div>
  </div>


          {/* Book Button */}
          <div className="flex justify-center">
            <button type="button" onClick={() => router.push('/userpanel/userprofile')}
            className="w-32 bg-black text-white rounded-full px-8 py-3  text-sm font-medium">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBooking;
