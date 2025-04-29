'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserToExpertBooking = () => {
  const [sessionData, setSessionData] = useState(null);
  const [consultingExpert, setConsultingExpert] = useState(null);
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    note: '',
    promoCode: '',
  });
  const [noteError, setNoteError] = useState(""); // Error message for note
  const [noteWordCount, setNoteWordCount] = useState(0); // Word count
  const [token, setToken] = useState(null); // Ensure localStorage access only on client
  const router = useRouter();

  // Wait until component is mounted
  useEffect(() => {
    const expertData = localStorage.getItem('expertData');
    if (expertData) {
      setConsultingExpert(JSON.parse(expertData));
    }

    const storedSessionData = localStorage.getItem('sessionData');
    if (storedSessionData) {
      setSessionData(JSON.parse(storedSessionData));
    }

    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      router.push('/userlogin')
    }
    setToken(userToken);
  }, []);

  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
  }, [bookingData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'note') {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
      setNoteWordCount(wordCount);
      setNoteError(''); // Clear error when user starts typing
    }
  };

  const handleBookingRequest = async () => {
    if (!sessionData) {
      toast.error('No session data found.');
      return;
    }

    if (noteWordCount < 25) {
      setNoteError('Note must contain at least 25 words.');
      toast.error('✍️ Your note must be at least 25 words.');
      return;
    }

    const fullBookingData = {
      expertId: consultingExpert?._id,
      areaOfExpertise: sessionData?.areaOfExpertise || "Home",
      slots: sessionData?.slots || [],
      duration: sessionData?.duration || "",
      firstName: bookingData?.firstName,
      lastName: bookingData?.lastName,
      email: bookingData?.email,
      phone: bookingData?.mobileNumber,
      note: bookingData?.note,
    };

    if (
      !consultingExpert?._id ||
      !sessionData?.areaOfExpertise ||
      !sessionData.slots
    ) {
      toast.error('Please fill in all required fields before submitting the booking.');
      return;
    }

    try {
      if (!token) throw new Error('No authentication token found');

      const response = await axios.post(
        'https://amd-api.code4bharat.com/api/session/usertoexpertsession',
        fullBookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Session booked successfully!');
      localStorage.removeItem('sessionData');
      localStorage.removeItem('bookingData');
      localStorage.removeItem('consultingExpertData');

      
    } catch (error) {
      console.error('Booking error:', error.response?.data || error.message);
      toast.error(`Booking failed: ${error.response?.data?.message || error.message}`);
    }

    router.push('/userpanel/videocall');
  };

  // Group time slots by date
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

  if (!consultingExpert) return <div>Loading...</div>;

  return (
    <div className="w-full mx-8 mt-8 px-6 md:px-10 py-[6rem]">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left">
          <div className="relative aspect-[3/4] w-32 md:w-[14rem] rounded-lg overflow-hidden shadow-md">
            <Image
              src={consultingExpert?.photoFile || '/guyhawkins.png'}
              alt={`${consultingExpert?.firstName} ${consultingExpert?.lastName}`}
              fill
              className="object-cover object-top"
            />
          </div>


          <div className="mt-4 md:mt-6 bg-[#F8F7F3] px-4 md:p-6 rounded-lg shadow-md w-full">
            <h1 className="text-xl md:text-2xl font-bold">
              {consultingExpert?.firstName} {consultingExpert?.lastName}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">{consultingExpert?.areaOfExpertise || 'Expert'}</p>

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
                      className={isFilled || isHalf ? 'text-[#FFA629]' : 'text-gray-300'} // Full or empty star color
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium mb-2 text-gray-700">Sessions -</p>
              {sessionData?.slots && Object.entries(groupByDate(sessionData?.slots)).map(([date, slots], idx) => (
                <div key={idx} className="mb-3">
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}, {date}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {slots.map((slot) => (
                      <button
                        key={slot.selectedTime}
                        className="px-4 py-1 text-xs md:text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
                      >
                        {slot.selectedTime}
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
