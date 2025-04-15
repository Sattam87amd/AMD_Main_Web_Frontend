"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CiClock2 } from "react-icons/ci";
import { FaUser, FaUserTie } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserVideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [myBookings, setMyBookings] = useState([]);
  const [mySessions, setMySessions] = useState([]);

  // Fetch data from API (replace with actual API endpoints)
  // Fetch data from API (replace with actual API endpoints)
  useEffect(() => {
    const fetchBookingsAndSessions = async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (token) {
          // Fetch bookings data
          const bookingsResponse = await axios.get(
            "http://localhost:5070/api/session/Userbookings",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMyBookings(bookingsResponse.data);

          
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookingsAndSessions();
  }, []);
  

  return (
    <div className="w-full max-w-8xl mx-left py-10 px-4 mt-20 ">
      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {myBookings.map((booking) => (
            <div
              key={booking._id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
            >
              {/* Left Side (Date & Details) */}
              <div className="flex items-center space-x-4">
                <div className="text-center bg-gray-100 px-3 py-2 rounded-lg shadow-md">
                  <p className="text-xs text-gray-500">
                    {new Date(booking.sessionDate).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <p className="text-lg font-bold">
                    {new Date(booking.sessionDate).toLocaleDateString("en-US", {
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <div>
                    <div className="flex ">
                      <div>
                        <CiClock2 className="mt-[3px] mr-1" />
                      </div>
                      <p className="text-sm text-gray-500 mr-5">
                        {booking.sessionTime}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.duration}
                      </p>
                    </div>
                  </div>
                  {/* User and Consultant Details */}
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700">
                      <FaUser className="inline mr-1" />
                      Client: {booking.firstName} {booking.lastName}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      <FaUserTie className="inline mr-1" />
                      Expert: {booking?.expertId.firstName}{" "}
                      {booking?.expertId.lastName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side (Status & Chat) */}
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    booking.status === "Confirmed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.status}
                </span>
                <button
                  className={`px-4 py-1 border rounded text-sm ${
                    booking.status === "Not Confirmed"
                      ? "hidden"
                      : "text-green-500"
                  }`}
                >
                  💬 Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserVideoCall;
