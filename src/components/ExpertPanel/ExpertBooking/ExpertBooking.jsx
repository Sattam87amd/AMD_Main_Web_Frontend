'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { UserPlusIcon, Clock, Calendar, MapPin, CheckCircle } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpertBooking = () => {
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
  const [noteError, setNoteError] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
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

    if (name === "note") {
      setNoteError("");
      setWordCount(value.trim().split(/\s+/).length);
    }
  };

  const storeTokenBeforePayment = () => {
    const expertToken = localStorage.getItem("expertToken");
    if (expertToken) {
      sessionStorage.setItem("tempExpertToken", expertToken);
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

    setNoteError("");

    const fullBookingData = {
      ...sessionData,
      firstName: expertData.firstName,
      lastName: expertData.lastName,
      mobile: expertData.mobileNumber,
      email: expertData.email,
      note: expertData.note,
      bookingType: expertData.bookingType,
      inviteFriend: expertData.inviteFriend,
      promoCode: expertData.promoCode,
    };

    storeTokenBeforePayment();
   
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("expertToken");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        "https://amd-api.code4bharat.com/api/session/experttoexpertsession",
        fullBookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem('pendingSessionId', response.data.session._id);
      localStorage.removeItem('sessionData');
      localStorage.removeItem('consultingExpertData');
      localStorage.removeItem('bookingData');

      toast.info("Redirecting to payment gateway...", {
        position: "bottom-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.href = response.data.paymentUrl;
      }, 2000);

    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);

      toast.error(`Booking failed: ${error.response?.data?.message || error.message}`, {
        position: "bottom-center",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const groupByDate = (slots) => {
    return slots.reduce((grouped, slot) => {
      const date = slot.selectedDate;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
      return grouped;
    }, {});
  };

  if (!consultingExpert) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#F8F7F3]">
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Section - Expert Profile */}
        <div className="w-full md:w-2/5 bg-[#F8F7F3] p-8">
          <div className="flex flex-col items-center">
            {/* Expert Image */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
              <Image
                src={consultingExpert?.photoFile || '/guyhawkins.png'}
                alt={`${consultingExpert?.firstName} ${consultingExpert?.lastName}`}
                fill
                className="object-cover object-top"
              />
            </div>
            
            {/* Expert Info */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {consultingExpert?.firstName} {consultingExpert?.lastName}
              </h1>
              <p className="text-gray-500 font-medium mb-2">{consultingExpert?.designation || "Expert"}</p>
              
              {/* Rating Stars */}
              <div className="flex items-center justify-center gap-1 text-[#FFA629] mb-4">
                {[...Array(5)].map((_, i) => {
                  const rating = consultingExpert.averageRating || 0;
                  const isFilled = i < Math.floor(rating);
                  const isHalf = i === Math.floor(rating) && rating % 1 !== 0;
                  return (
                    <FaStar
                      key={i}
                      className={`${isFilled || isHalf ? "text-[#FFA629]" : "text-gray-300"} text-xl`}
                    />
                  );
                })}
                <span className="ml-2 text-sm font-medium">{consultingExpert.averageRating || 4.8}/5</span>
              </div>
              
              {/* Expert Bio Card */}
              <div className="bg-white rounded-lg p-4 shadow-md mb-6">
                <p className="text-gray-700 text-sm">
                  {consultingExpert?.bio || "Experienced professional dedicated to helping clients achieve their goals through personalized consultation and expert guidance."}
                </p>
              </div>
            </div>

            {/* Session Info */}
            <div className="w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-black" />
                Selected Sessions
              </h2>
              
              {sessionData?.slots && Object.entries(groupByDate(sessionData.slots)).map(([date, slots], idx) => (
                <div key={idx} className="mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => (
                      <div key={slot.id} className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
                        <Clock className="w-4 h-4 mr-2 text-gray-600" />
                        {slot.selectedTime}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-amber-700 text-xs">
                  <strong>Note:</strong> You can add up to 5 sessions at different time slots. Any 1 time slot might get selected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Booking Form */}
        <div className="w-full md:w-3/5 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Booking</h2>
          
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={expertData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={expertData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={expertData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={expertData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">About You</label>
              <textarea
                name="note"
                placeholder="Please share a bit about yourself and what you hope to gain from this session (minimum 25 words)..."
                value={expertData.note}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm h-32 focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
              {noteError && (
                <p className="text-red-500 text-xs mt-1 font-medium">{noteError}</p>
              )}
              <div className="flex justify-between items-center mt-2">
                <div className={`text-xs ${wordCount >= 25 ? 'text-green-600' : 'text-gray-500'}`}>
                  {wordCount >= 25 ? (
                    <span className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Minimum word count met
                    </span>
                  ) : (
                    <span>Minimum 25 words required</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Words: {wordCount}</p>
              </div>
            </div>
          </div>
          
          {/* Promo Code */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Promotional Discount</h3>
            <div className="flex">
              <input
                type="text"
                name="promoCode"
                value={expertData.promoCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-l-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="Enter promo code if you have one"
              />
              <button className="bg-black text-white px-6 py-3 text-sm font-medium rounded-r-lg hover:bg-gray-800 transition">
                Apply
              </button>
            </div>
          </div>
          
          {/* Book Button */}
          <div className="flex justify-center">
            <button
              onClick={handleBookingRequest}
              disabled={isSubmitting}
              className={`w-full md:w-2/3 bg-black text-white rounded-full py-4 text-base font-medium transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800 hover:shadow-lg'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Complete Booking"
              )}
            </button>
          </div>
          
          {/* Additional Info */}
          <p className="text-center text-xs text-gray-500 mt-4">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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