'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { UserPlusIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpertBooking = () => {
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

  const [consultingExpert, setConsultingExpert] = useState(null);
  const [expertData, setExpertData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    note: '',
    bookingType: 'individual',
    inviteFriend: '',
    promoCode: ''
  });

  const [sessionData, setSessionData] = useState(null);
  const [noteError, setNoteError] = useState(""); // ⛔ Note validation error state
  const [isSubmitting, setIsSubmitting] = useState(false); // To track if the booking is in progress
  const [wordCount, setWordCount] = useState(0); // To track word count
  const router = useRouter();

  useEffect(() => {
    const expertData = localStorage.getItem("consultingExpertData");
    if (expertData) {
      setConsultingExpert(JSON.parse(expertData));
    }
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("bookingData");
    if (savedData) {
      setExpertData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(expertData));
  }, [expertData]);

  useEffect(() => {
    const storedSessionData = localStorage.getItem('sessionData');
    if (storedSessionData) {
      setSessionData(JSON.parse(storedSessionData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpertData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear note error when editing note
    if (name === "note") {
      setNoteError("");
      setWordCount(value.trim().split(/\s+/).length); // Update word count
    }
  };

  const handleBookingRequest = async () => {
    if (!sessionData) {
      toast.error("No session data found.");
      return;
    }

    const noteWords = expertData.note.trim().split(/\s+/);
    if (noteWords.length < 25) {
      setNoteError("Note must contain at least 25 words.");
      return;
    }

    setNoteError(""); // Clear any previous error if passed

    const fullBookingData = {
      ...sessionData,
      firstName: expertData.firstName,
      lastName: expertData.lastName,
      mobile: expertData.mobileNumber,
      email: expertData.email,
      note: expertData.note
    };

    try {
      setIsSubmitting(true); // Start animation (processing state)
      const token = localStorage.getItem("expertToken");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        "http://amd-api.code4bharat.com/api/session/experttoexpertsession",
        fullBookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Booking successful:", response.data);
      localStorage.removeItem("sessionData", "bookingData", "expertData")
      // Show success message with a delay before redirection
      toast.success("Session booked successfully! Redirecting to video call...", {
        position: "bottom-center",
        autoClose: 3000, // Show for 3 seconds
      });

      // Redirect after delay
      setTimeout(() => {
        router.push('/expertpanel/videocall');
      }, 3000); // Redirect after 3 seconds

    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      toast.error(`Booking failed: ${error.response?.data?.message || error.message}`, {
        position: "bottom-center",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false); // End animation (reset processing state)
    }
  };

  if (!consultingExpert) return <div>Loading...</div>;

  return (
    <div className="w-full mx-8 md:mx-0 mt-8 px-6 py-[6rem] md:py-0">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left">
          <div className="w-32 h-38 md:w-[14rem] md:h-[16rem] rounded-lg overflow-hidden shadow-md">
            <Image
              src={consultingExpert?.photoFile || "/guyhawkins.png"}
              alt={`${consultingExpert?.firstName} ${consultingExpert?.lastName}`}
              width={224}
              height={224}
              className="object-cover"
            />
          </div>

          <div className="mt-4 md:mt-6 bg-[#F8F7F3] px-4 md:p-6 rounded-lg shadow-md w-full">
            <h1 className="text-xl md:text-2xl font-bold">
              {consultingExpert?.firstName} {consultingExpert?.lastName}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">{consultingExpert?.designation || "Expert"}</p>

    <div className="flex items-center mt-2 gap-2 text-[#FFA629]">
  {[...Array(5)].map((_, i) => {
    const rating = consultingExpert.averageRating || 0; // Use 0 as a fallback if consultingExpert.averageRating.rating is falsy (undefined, null, etc.)
    
    const isFilled = i < Math.floor(rating); // If the index is less than the rating
    const isHalf = i === Math.floor(rating) && rating % 1 !== 0; // If the rating has a decimal and we are at the exact index
    return (
      <FaStar
        key={i}
        className={isFilled || isHalf ? "text-[#FFA629]" : "text-gray-300"} // Full or empty star color
      />
    );
  })}
</div>

            <div className="mt-4">
              <p className="font-medium mb-2 text-gray-700">Sessions -</p>
              {sessions.map((session, idx) => (
                <div key={idx} className="mb-3">
                  <p className="text-sm font-medium text-gray-700">
                    {session.day}, {session.date}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
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

        <span className="hidden md:block border h-auto">
          <hr />
        </span>

        {/* Right Section */}
        <div className="w-full h-1/2 md:w-1/2 p-6 relative">
          <div className="border rounded-lg p-6 relative mb-4 shadow-md">
            <button className="absolute top-4 right-4 text-sm border rounded px-3 py-1 -translate-y-8 bg-white">
              Change
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={expertData.firstName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={expertData.lastName}
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
                  value={expertData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={expertData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Note</label>
              <textarea
                name="note"
                placeholder="Write something about yourself in minimum 25 words..."
                value={expertData.note}
                onChange={handleInputChange}
                className="w-full h-[120px] border flex justify-center items-center rounded px-3 py-2 text-sm"
              />
              {noteError && (
                <p className="text-red-500 text-xs mt-1">{noteError}</p>
              )}
              <p className="text-xs text-gray-500 mt-2 text-end">Words: {wordCount}</p>
            </div>
          </div>

          {/* Booking Type */}
          <div className="flex items-center justify-center gap-6 mb-6 space-x-8 md:space-x-40">
            <label className="flex items-center">
              <input
                type="radio"
                name="bookingType"
                value="individual"
                checked={expertData.bookingType === "individual"}
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
                checked={expertData.bookingType === "group"}
                onChange={handleInputChange}
                className="mr-2 accent-black "
              />
              Group
            </label>
          </div>

          {/* Invite Friend */}
          {expertData.bookingType === "group" && (
            <div className="mb-6">
              <label className="block text-sm mb-1">Invite a Friend</label>
              <div className="relative">
                <input
                  type="text"
                  name="inviteFriend"
                  value={expertData.inviteFriend}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm pr-10"
                  placeholder="Enter friend's email or phone"
                />
                <UserPlusIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>
          )}

          {/* Promo Code */}
          <div className="flex justify-center">
            <div className="mb-6 md:w-1/2 rounded-lg">
              <div className="flex">
                <input
                  type="text"
                  name="promoCode"
                  value={expertData.promoCode}
                  onChange={handleInputChange}
                  className="w-full border rounded-l px-3 py-2 text-sm"
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
            <button
              onClick={handleBookingRequest}
              className={`w-32 bg-black text-white rounded-full px-8 py-3 text-sm font-medium ${isSubmitting ? 'animate-pulse' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Book"}
            </button>
          </div>
        </div>
      </div>


      {/* Toastify container */}
      <ToastContainer
  position="bottom-right" // Change this from bottom-center to top-right
  autoClose={5000} // Adjust auto-close timing as needed
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
    </div>
  );
};

export default ExpertBooking;
