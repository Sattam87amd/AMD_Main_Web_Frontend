"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const UserVideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [myBookings, setMyBookings] = useState([]);
  const [mySessions, setMySessions] = useState([]);

  // Fetch data from API (replace with actual API endpoints)
  useEffect(() => {
    const fetchBookingsAndSessions = async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (token) {
          // Fetch bookings data
          const bookingsResponse = await axios.get("http://localhost:5070/api/usersession/Userbookings", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setMyBookings(bookingsResponse.data);

          // Fetch sessions data
          const sessionsResponse = await axios.get("http://localhost:5070/api/usersession/sessions", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setMySessions(sessionsResponse.data);
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
            <div key={booking._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              {/* Left Side (Date and Details) */}
              <div className="flex items-center space-x-4">
                <div className="text-center bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-xs">{booking.day}</p>
                  <p className="text-lg font-bold">{booking.date}</p>
                </div>
                <div>
                  <p className="text-sm">{booking.sessionTime}</p> {/* Display Time as it was before */}
                  <p className="text-sm font-medium">👤 {booking.consultant?.firstName} {booking.consultant?.lastName}</p> {/* Consultant's Name */}
                </div>
              </div>

              {/* Right Side (Status & Chat) */}
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    booking.status === "Confirmed" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {booking.status}
                </span>
                <button className={`px-4 py-1 border rounded text-sm ${
                    booking.status === "Not Confirmed" ?  "hidden" : "text-green-500" }`}>💬 Chat</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          {mySessions.map((session) => (
            <div key={session._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              {/* Left Side (Date and Details) */}
              <div className="flex items-center space-x-4">
                <div className="text-center bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-xs">{session.day}</p>
                  <p className="text-lg font-bold">{session.date}</p>
                </div>
                <div>
                  <p className="text-sm">{session.sessionTime}</p> {/* Display Time as it was before */}
                  <p className="text-sm font-medium">👤 {session.user?.firstName} {session.user?.lastName}</p> {/* User's Name */}
                </div>
              </div>

              {/* Right Side (Accept/Decline Buttons) */}
              {/* <div className="flex space-x-2">
                <button className="px-4 py-1 border rounded text-green-500 text-sm">Accept</button>
                <button className="px-4 py-1 border rounded text-red-500 text-sm">Decline</button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserVideoCall;
