"use client";

import { useState, useEffect } from "react";

const UserVideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [myBookings, setMyBookings] = useState([]);
  const [mySessions, setMySessions] = useState([]);

  // Dummy Data (to be replaced with API later)
  useEffect(() => {
    const dummyBookings = [
      { id: 1, day: "Thu", date: "15", time: "09:00am - 09:30am", consultant: "Stephine Claire", status: "Confirmed" },
      { id: 2, day: "Fri", date: "16", time: "09:00am - 09:30am", consultant: "Ralph Edwards", status: "Not Confirmed" },
      { id: 3, day: "Mon", date: "19", time: "09:00am - 09:30am", consultant: "Darlene Robertson", status: "Not Confirmed" },
    ];

    const dummySessions = [
      { id: 1, day: "Thu", date: "15", time: "09:00am - 09:30am", user: "Stephine Claire" },
      { id: 2, day: "Fri", date: "16", time: "09:00am - 09:30am", user: "Ralph Edwards" },
      { id: 3, day: "Mon", date: "19", time: "09:00am - 09:30am", user: "Darlene Robertson" },
    ];

    localStorage.setItem("myBookings", JSON.stringify(dummyBookings));
    localStorage.setItem("mySessions", JSON.stringify(dummySessions));

    setMyBookings(dummyBookings);
    setMySessions(dummySessions);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 mt-20 ">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium rounded ${
            activeTab === "bookings" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded ${
            activeTab === "sessions" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("sessions")}
        >
          My Sessions
        </button>
      </div>

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {myBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              {/* Left Side (Date and Details) */}
              <div className="flex items-center space-x-4">
                <div className="text-center bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-xs">{booking.day}</p>
                  <p className="text-lg font-bold">{booking.date}</p>
                </div>
                <div>
                  <p className="text-sm">{booking.time}</p>
                  <p className="text-sm font-medium">👤 {booking.consultant}</p>
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
            <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              {/* Left Side (Date and Details) */}
              <div className="flex items-center space-x-4">
                <div className="text-center bg-gray-100 px-3 py-2 rounded-lg">
                  <p className="text-xs">{session.day}</p>
                  <p className="text-lg font-bold">{session.date}</p>
                </div>
                <div>
                  <p className="text-sm">{session.time}</p>
                  <p className="text-sm font-medium">👤 {session.user}</p>
                </div>
              </div>

              {/* Right Side (Accept/Decline Buttons) */}
              <div className="flex space-x-2">
                <button className="px-4 py-1 border rounded text-green-500 text-sm">Accept</button>
                <button className="px-4 py-1 border rounded text-red-500 text-sm">Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserVideoCall;
