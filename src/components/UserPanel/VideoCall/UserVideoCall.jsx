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

  useEffect(() => {
    const fetchBookingsAndSessions = async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (token) {
          const bookingsResponse = await axios.get(
            "https://amd-api.code4bharat.com/api/session/Userbookings",
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
    <div className="w-full max-w-8xl mx-left py-10 px-4 ">
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
      </div>

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {myBookings.length === 0 ? (
            <p className="text-left text-black text-lg ">No bookings found</p>
          ) : (
            myBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
              >
                {/* Left Side */}
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
                    <div className="flex">
                      <CiClock2 className="mt-[3px] mr-1" />
                      <p className="text-sm text-gray-500 mr-5">
                        {booking.sessionTime}
                      </p>
                      <p className="text-sm text-gray-500">{booking.duration}</p>
                    </div>
                    {/* Details */}
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">
                        <FaUser className="inline mr-1" />
                        Client: {booking.firstName} {booking.lastName}
                      </p>
                      <p className="text-sm font-medium text-gray-700 mt-1">
                        <FaUserTie className="inline mr-1" />
                        Expert: {booking?.expertId?.firstName} {booking?.expertId?.lastName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side (Session Type, Status & Zoom Join) */}
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {booking.status === "confirmed" ? (
                      <>
                        <span className="text-green-500 text-sm font-medium">
                          Confirmed
                        </span>
                        <button className="px-4 py-1 border rounded text-sm flex items-center space-x-2">
                          <MessagesSquare className="w-5 h-5" />
                          <span>Chat</span>
                        </button>
                        {booking.zoomMeetingLink ? (
                          <a
                            href={booking.zoomMeetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="px-4 py-1 text-sm rounded ml-2 bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2">
                              <Video className="w-5 h-5" />
                              <span>Join</span>
                            </button>
                          </a>
                        ) : (
                          <span className="text-yellow-500 text-sm ml-2">
                            Zoom link not ready
                          </span>
                        )}
                      </>
                    ) : booking.status === "unconfirmed" ? (
                      <>
                        <span className="text-red-500 text-sm font-medium">
                          Unconfirmed
                        </span>
                      </>
                    ) : booking.status === "rejected" ? (
                      <>
                        <span className="text-red-500 text-sm font-medium">
                          Rejected
                        </span>
                      </>
                    ) : booking.status === "completed" ? (
                      <>
                        <button
                          className="px-4 py-1 text-white bg-blue-500 rounded"
                          onClick={() => handleRateClick(booking)}
                        >
                          Rate
                        </button>
                      </>
                    ) : booking.status === "Rating Submitted" ? (
                      <>
                        <span className="text-green-700 text-sm font-medium">
                          Rating Submitted
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserVideoCall;
