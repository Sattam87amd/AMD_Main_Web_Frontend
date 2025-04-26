"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CiClock2 } from "react-icons/ci";
import { FaUser, FaUserTie } from "react-icons/fa";
import { MessagesSquare, Video } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rate from "@/components/Rate/Rate.jsx";

const UserVideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [myBookings, setMyBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorBookings, setErrorBookings] = useState(null);
  const [showRateComponent, setShowRateComponent]= useState(false)
  const[selectedBooking, setSelectedBooking] = useState("")

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
          "https://amd-api.code4bharat.com/api/session/Userbookings",
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

  const groupByDate = (slotsArray) => {
    const slots = Array.isArray(slotsArray) ? slotsArray : [];
    return slots.reduce((acc, slot) => {
      const date = slot.selectedDate;
      if (!date) return acc;
  
      if (!acc[date]) acc[date] = [];
      acc[date].push(slot.selectedTime);
      return acc;
    }, {});
  };

  const handleDateChange = (sessionId, date) => {
    setSessionState(prevState => ({
      ...prevState,
      [sessionId]: {
        ...prevState[sessionId],
        selectedDate: date,
        selectedTime: "",  // Reset the time when the date changes
      }
    }));
  };

  
  const handleTimeChange = (sessionId, time) => {
    setSessionState(prevState => ({
      ...prevState,
      [sessionId]: {
        ...prevState[sessionId],
        selectedTime: time,
      }
    }));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-500";
      case "unconfirmed":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      case "completed":
        return "text-green-700";
      case "Rating Submitted":
        return "text-green-700";
      default:
        return "text-gray-500";
    }
  };
  
  


  const handleRateClick = (booking) => {
    setShowRateComponent(true);
    setSelectedBooking(booking);
  };
  
  const closeModal = () => {
    setShowRateComponent(false);
    setSelectedBooking(null);
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
<div className="space-y-4 md:space-y-6 max-h-[calc(100vh-220px)] md:max-h-none overflow-y-auto pb-10">
  {/* My Bookings Tab */}
  {activeTab === "bookings" && (
    <div className="space-y-4 md:space-y-6">
      {loadingBookings ? (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      ) : errorBookings ? (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-red-500">{errorBookings}</p>
        </div>
      ) : myBookings.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-gray-500 text-lg">No Bookings Yet</p>
          <p className="text-gray-400 mt-2">Your upcoming bookings will appear here</p>
        </div>
      ) : (
        myBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-4 md:p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Mobile: Compact layout */}
            <div className="md:hidden w-full">
              {/* Header with Session Type and Date */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 px-3 py-2 rounded-md text-center">
                    <p className="text-xs text-gray-500">
                      {new Date(booking.slots.sessionDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                    {booking.sessionType}
                  </span>
                </div>
                <div className="flex items-center text-xs bg-gray-50 px-2 py-1 rounded-md">
                  <CiClock2 className="text-sm mr-1 text-blue-500" />
                  <span className="text-gray-700 font-medium">
                    {booking.slots.sessionTime}
                  </span>
                  <span className="ml-1 text-gray-500">({booking.duration})</span>
                </div>
              </div>

              {/* Names and Status */}
              <div className="flex justify-between items-center mb-3 bg-gray-50 p-2 rounded-md">
                <div className="text-xs">
                  <p className="text-gray-700 mb-1">
                    <FaUser className="inline mr-1 text-blue-500" size={12} />
                    <span className="font-medium">Client:</span> {booking?.firstName} {booking?.lastName}
                  </p>
                  <p className="text-gray-700">
                    <FaUserTie className="inline mr-1 text-blue-500" size={12} />
                    <span className="font-medium">Expert:</span> {booking.consultingExpertID?.firstName}{" "}
                    {booking.consultingExpertID?.lastName}
                  </p>
                </div>
                <div>
                  <span
                    className={`${getStatusStyle(booking.status)} text-xs font-medium px-2 py-1 bg-gray-100 rounded-full`}
                  >
                    {booking.status === "confirmed"
                      ? "Confirmed"
                      : booking.status === "unconfirmed"
                      ? "Unconfirmed"
                      : booking.status === "rejected"
                      ? "Rejected"
                      : booking.status === "completed"
                      ? "Completed"
                      : booking.status === "Rating Submitted"
                      ? "Rating Submitted"
                      : booking.status}
                  </span>
                </div>
              </div>

              {/* Dates and Times Section - Mobile */}
              <div className="mb-3">
                <h3 className="text-sm font-semibold mb-2">Available Slots:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(groupByDate(booking.slots?.[0] || [])).map(([date, times]) => {
                    const parsedDate = new Date(date);
                    return (
                      <div
                        key={date}
                        className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                      >
                        <p className="text-xs text-gray-500 font-medium">
                          {!isNaN(parsedDate)
                            ? parsedDate.toLocaleDateString("en-US", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })
                            : null}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {times.map((time, index) => (
                            <span
                              key={index}
                              className="text-xs bg-white px-2 py-1 rounded-md text-gray-700"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-3">
                {booking.status === "confirmed" && (
                  <>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-xs flex items-center gap-1 hover:bg-gray-50 transition-colors duration-200">
                      <MessagesSquare className="w-3 h-3 text-blue-500" />
                      <span>Chat</span>
                    </button>

                    {booking.zoomMeetingLink ? (
                      <a
                        href={booking.zoomMeetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center gap-1"
                      >
                        <Video className="w-3 h-3" />
                        <span>Join Meeting</span>
                      </a>
                    ) : (
                      <span className="text-yellow-500 text-xs px-3 py-2 bg-yellow-50 rounded-md">
                        Zoom link coming soon
                      </span>
                    )}
                  </>
                )}

                {booking.status === "completed" && (
                  <button
                    className="px-3 py-2 text-white bg-blue-500 rounded-md text-xs hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => handleRateClick(booking)}
                  >
                    Rate Session
                  </button>
                )}
              </div>
            </div>

            {/* Desktop: Modified layout with status and buttons on right */}
            <div className="hidden md:block">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Consultation with {booking?.firstName || ""} {booking?.lastName || ""}
                </h2>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CiClock2 className="mr-1 text-blue-500" />
                    {booking.sessionTime} ({booking.duration})
                  </div>
                  <span className="bg-blue-50 px-3 py-1 rounded-full text-blue-600">
                    {booking.sessionType}
                  </span>
                  <span
                    className={`${getStatusStyle(booking.status)} px-3 py-1 rounded-full ${
                      booking.status === "confirmed" ? "bg-green-50" : "bg-gray-100"
                    }`}
                  >
                    {booking.status === "confirmed"
                      ? "Confirmed"
                      : booking.status === "unconfirmed"
                      ? "Unconfirmed"
                      : booking.status === "rejected"
                      ? "Rejected"
                      : booking.status === "completed"
                      ? "Completed"
                      : booking.status === "Rating Submitted"
                      ? "Rating Submitted"
                      : booking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                {/* Left Side - Details & Selected Slot */}
                <div className="col-span-8">
                  <div className="flex items-start gap-8 mb-6">
                    {/* People Details */}
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">People</h3>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <FaUser className="mr-2 text-blue-500" />
                          <span className="text-gray-500 w-16">Client:</span>
                          <span>{booking?.firstName || ""} {booking?.lastName || ""}</span>
                        </p>
                        <p className="text-sm font-medium text-gray-700 flex items-center">
                          <FaUserTie className="mr-2 text-blue-500" />
                          <span className="text-gray-500 w-16">Expert:</span>
                          <span>{booking?.expertId?.firstName || ""} {booking?.expertId?.lastName || ""}</span>
                        </p>
                      </div>
                    </div>

                    {/* Available Time Slots */}
                    <div className="flex-1">
                      {booking.status === "unconfirmed" ? (
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Requested Slots</h3>
                      ) : (
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Booked Slots</h3>
                      )}
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(groupByDate(booking.slots?.[0] || [])).map(([date, times]) => {
                          const parsedDate = new Date(date);
                          return (
                            <div
                              key={date}
                              className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                            >
                              <p className="text-sm font-medium text-gray-700">
                                {!isNaN(parsedDate)
                                  ? parsedDate.toLocaleDateString("en-US", {
                                      weekday: "short",
                                      day: "numeric",
                                      month: "short",
                                    })
                                  : "Invalid Date"}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {times.map((time, index) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-white px-2 py-1 rounded-md text-gray-700"
                                  >
                                    {time}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Actions */}
                <div className="col-span-4">
                  <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Actions</h3>
                    {booking.status === "unconfirmed" && (
                      <>
                        <p className="text-gray-400">Waiting for Confirmation</p>
                      </>
                    )}

                    {booking.status === "confirmed" && (
                      <>
                        <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-200">
                          <MessagesSquare className="w-4 h-4 text-blue-500" />
                          <span>Chat with {booking.userID ? "Expert" : "Client"}</span>
                        </button>

                        {booking.zoomMeetingLink ? (
                          <a
                            href={booking.zoomMeetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                          >
                            <button className="w-full px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105">
                              <Video className="w-4 h-4" />
                              <span>Join Zoom Meeting</span>
                            </button>
                          </a>
                        ) : (
                          <div className="w-full px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-600 flex items-center justify-center gap-2">
                            <span>Zoom link coming soon</span>
                          </div>
                        )}
                      </>
                    )}

                    {booking.status === "completed" && (
                      <button
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md text-sm hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                        onClick={() => handleRateClick(booking)}
                      >
                        Rate This Session
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )}
  {showRateComponent && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Rate Your Session</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </div>
              <Rate
                booking={selectedBooking}
                setShowRateComponent={setShowRateComponent}
              />
            </div>
          </div>
  
        )}
</div>
</div>)}

export default UserVideoCall;