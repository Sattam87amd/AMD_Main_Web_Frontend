'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon, UserPlusIcon } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";

const UserToExpertBooking = () => {
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

  // const [expertData, setExpertData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   mobileNumber: '',
  //   email: '',
  //   note: '',
  //   promoCode: '',
  // });

  const [sessionData, setSessionData] = useState(null);
  const [consultingExpert, setConsultingExpert] = useState(null);
  const [bookingData, setBookingData]=useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    note: '',
    promoCode: '',
  })
  const [noteError, setNoteError] = useState(""); // Error message for note
  const [noteWordCount, setNoteWordCount] = useState(0); // Word count
  const [token, setToken] = useState(null); // Ensure localStorage access only on client
  const router = useRouter();

  // Wait until component is mounted
  useEffect(() => {
    const expertData = localStorage.getItem("expertData");
    if (expertData) {
      setConsultingExpert(JSON.parse(expertData));
    }

    const bookingData = localStorage.getItem("bookingData");
    if (bookingData) {
      setBookingData(JSON.parse(bookingData));
    }

    const storedSessionData = localStorage.getItem("sessionData");
    if (storedSessionData) {
      setSessionData(JSON.parse(storedSessionData));
    }

    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      console.warn("⚠️ No user token found in localStorage.");
    }
    setToken(userToken);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  }, [bookingData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "note") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      setNoteWordCount(wordCount);
      setNoteError(""); // Clear error when user starts typing
    }
  };

  const handleBookingRequest = async () => {
    if (!sessionData) {
      alert('No session data found.');
      return;
    }

    if (noteWordCount < 25) {
      setNoteError("Note must contain at least 25 words.");
      alert("✍️ Your note must be at least 25 words.");
      return;
    }

    const fullBookingData = {
      expertId: consultingExpert?._id,
      areaOfExpertise: sessionData?.areaOfExpertise || "Home",
      sessionDate: sessionData?.sessionDate || "",
      sessionTime: sessionData?.sessionTime || "",
      duration: sessionData?.duration || "",
      firstName: bookingData?.firstName,
      lastName: bookingData?.lastName,
      email: bookingData?.email,
      phone: bookingData?.mobileNumber,
      note:bookingData?.note,

    };

    // console.log("Booking Data:", fullBookingData);

    if (!consultingExpert?._id || !sessionData?.areaOfExpertise || !sessionData?.sessionDate || !sessionData?.sessionTime) {
      alert('Please fill in all required fields before submitting the booking.');
      return;
    }

    try {
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        "http://localhost:5070/api/session/usertoexpertsession",
        fullBookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Booking successful:", response.data);
      alert("Session booked successfully!");
      localStorage.removeItem("sessionData", "bookingData", "consultingExpertData")
      router.push('/userpanel/videocall');
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert(`Booking failed: ${error.response?.data?.message || error.message}`);
    }
  };


  if (!consultingExpert) return <div>Loading...</div>;

  return (
    <div className="w-full mx-8 mt-8 px-6 md:px-10 py-[6rem]">
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

           <div>
                                     <p className="text-xl font-semibold">SAR {consultingExpert.price} • Session</p>
                                     <div className="flex items-center mt-2 gap-2 text-[#FFA629]">
                                       {[...Array(5)].map((_, i) => {
                                         const rating = consultingExpert.averageRating || 0; // Use 0 as a fallback if expert.rating is falsy (undefined, null, etc.)
                                         
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

        {/* Divider */}
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
                  value={bookingData.firstName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={bookingData.lastName}
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
                  value={bookingData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>

            </div>
              {/* Note Input with Word Count and Validation */}
              <div className="relative">
                <label className="block text-sm mb-1">Note</label>
                <textarea
                  name="note"
                  placeholder="Write something about yourself in minimum 25 words..."
                  value={bookingData.note}
                  onChange={handleInputChange}
                  className="w-full h-[120px] border flex justify-center items-center rounded px-3 py-2 text-sm"
                />
                <div className="absolute bottom-2 right-3 text-xs text-gray-500">
                  {noteWordCount} word{noteWordCount !== 1 && 's'}
                </div>
                {noteError && (
                  <p className="text-red-500 text-xs mt-1">{noteError}</p>
                )}
              </div>
          </div>

          <div className="flex justify-center">
            <div className="mb-6 md:w-1/2 rounded-lg">
              <div className="flex">
                <input
                  type="text"
                  name="promoCode"
                  value={bookingData.promoCode}
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

          <div className="flex justify-center">
            <button
              onClick={handleBookingRequest}
              className="w-32 bg-black text-white rounded-full px-8 py-3 text-sm font-medium"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserToExpertBooking;
