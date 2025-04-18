"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CiClock2 } from "react-icons/ci";
import { FaUser, FaUserTie } from "react-icons/fa";
import { MessagesSquare, Video } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserVideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [myBookings, setMyBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorBookings, setErrorBookings] = useState(null);

  useEffect(() => {
    const fetchBookingsAndSessions = async () => {
      try {
        setLoadingBookings(true);
        const token = localStorage.getItem("userToken");

        if (!token) {
          setErrorBookings("Token is required");
          return;
        }

        const bookingsResponse = await axios.get(
          "http://localhost:5070/api/session/Userbookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Add sessionType property to each booking if it doesn't exist
        const bookingsWithType = (bookingsResponse.data || []).map(booking => ({
          ...booking,
          sessionType: booking.sessionType || "User To Expert" // Default type if not present
        }));
        setMyBookings(bookingsWithType);
      } catch (error) {
        setErrorBookings("No bookings found for this user.");
        console.error("Error fetching data:", error);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookingsAndSessions();
  }, []);

  const handleRateClick = (booking) => {
    // Implement rating functionality
    toast.info("Rating functionality to be implemented");
  };

  return (
    <div className="w-full mx-auto py-4 px-2 mt-2 md:max-w-6xl md:py-10 md:px-4">
      <ToastContainer />

      {/* Tabs */}
      <div className="flex space-x-2 mb-3 md:mb-6">
        <button
          className={`px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm font-medium rounded ${
            activeTab === "bookings" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </button>
      </div>

      {/* Content Container */}
      <div className="space-y-2 md:space-y-4">
        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-2 md:space-y-4">
            {loadingBookings ? (
              <div className="text-xs md:text-base text-center">Loading bookings...</div>
            ) : errorBookings ? (
              <div className="text-xs md:text-base text-center text-red-500">{errorBookings}</div>
            ) : myBookings.length === 0 ? (
              <div className="text-xs md:text-base text-center text-gray-500">No Bookings Yet</div>
            ) : (
              myBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col p-2 md:flex-row md:items-center md:justify-between md:p-4 border rounded-lg shadow-sm"
                >
                  {/* Mobile: Compact layout */}
                  <div className="md:hidden w-full">
                    {/* Header with Date and Session Type */}
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <div className="bg-gray-100 px-1 py-1 rounded text-center">
                          <p className="text-xs text-gray-500">
                            {new Date(booking.sessionDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <span className="text-xs bg-slate-200 px-2 py-1 rounded">
                          {booking.sessionType}
                        </span>
                      </div>
                      <div className="flex items-center text-xs">
                        <CiClock2 className="text-xs mr-1" />
                        <span className="text-gray-500">{booking.sessionTime}</span>
                        <span className="ml-1 text-gray-500">({booking.duration})</span>
                      </div>
                    </div>

                    {/* Names and Status */}
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-xs">
                        <p className="text-gray-700">
                          <FaUser className="inline mr-1" size={10} />
                          {booking.firstName} {booking.lastName}
                        </p>
                        <p className="text-gray-700">
                          <FaUserTie className="inline mr-1" size={10} />
                          {booking?.expertId?.firstName}{" "}
                          {booking?.expertId?.lastName}
                        </p>
                      </div>
                      <div>
                        {booking.status === "confirmed" ? (
                          <span className="text-green-500 text-xs font-medium">
                            Confirmed
                          </span>
                        ) : booking.status === "unconfirmed" ? (
                          <span className="text-red-500 text-xs font-medium">
                            Unconfirmed
                          </span>
                        ) : booking.status === "rejected" ? (
                          <span className="text-red-500 text-xs font-medium">
                            Rejected
                          </span>
                        ) : booking.status === "completed" ? (
                          <span className="text-green-700 text-xs font-medium">
                            Completed
                          </span>
                        ) : booking.status === "Rating Submitted" ? (
                          <span className="text-green-700 text-xs font-medium">
                            Rating Submitted
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-1 mt-1">
                      {booking.status === "confirmed" && (
                        <>
                          <button className="px-2 py-1 border rounded text-xs flex items-center gap-1">
                            <MessagesSquare className="w-3 h-3" />
                            <span>Chat</span>
                          </button>
                          
                          {booking.zoomMeetingLink ? (
                            <a
                              href={booking.zoomMeetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1"
                            >
                              <Video className="w-3 h-3" />
                              <span>Join</span>
                            </a>
                          ) : (
                            <span className="text-yellow-500 text-xs">
                              Link not ready
                            </span>
                          )}
                        </>
                      )}
                      
                      {booking.status === "completed" && (
                        <button
                          className="px-2 py-1 text-white bg-blue-500 rounded text-xs"
                          onClick={() => handleRateClick(booking)}
                        >
                          Rate
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Desktop: Original layout */}
                  <div className="hidden md:flex md:items-center md:w-full">
                    {/* Left Side (Date & Details) */}
                    <div className="flex items-center space-x-4 flex-grow">
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
                          <p className="text-sm text-gray-500 mr-5">
                            {booking.duration}
                          </p>
                          {/* Session Type */}
                          <p className="text-sm text-gray-500 bg-slate-200 px-3">
                            {booking.sessionType}
                          </p>
                        </div>
                        {/* User and Expert Details */}
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700">
                            <FaUser className="inline mr-1" />
                            Client: {booking.firstName} {booking.lastName}
                          </p>
                          <p className="text-sm font-medium text-gray-700 mt-1">
                            <FaUserTie className="inline mr-1" />
                            Expert: {booking?.expertId?.firstName}{" "}
                            {booking?.expertId?.lastName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side (Status & Actions) */}
                    <div className="flex items-center justify-end space-x-3 ml-auto">
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
                              <button className="px-4 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2">
                                <Video className="w-5 h-5" />
                                <span>Join</span>
                              </button>
                            </a>
                          ) : (
                            <span className="text-yellow-500 text-sm">
                              Zoom link not ready
                            </span>
                          )}
                        </>
                      ) : booking.status === "unconfirmed" ? (
                        <span className="text-red-500 text-sm font-medium">
                          Unconfirmed
                        </span>
                      ) : booking.status === "rejected" ? (
                        <span className="text-red-500 text-sm font-medium">
                          Rejected
                        </span>
                      ) : booking.status === "completed" ? (
                        <button
                          className="px-4 py-1 text-white bg-blue-500 rounded"
                          onClick={() => handleRateClick(booking)}
                        >
                          Rate
                        </button>
                      ) : booking.status === "Rating Submitted" ? (
                        <span className="text-green-700 text-sm font-medium">
                          Rating Submitted
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVideoCall;