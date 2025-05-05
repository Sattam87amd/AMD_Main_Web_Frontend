"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CiClock2 } from "react-icons/ci";
import { MessagesSquare, Video, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { FaBook, FaMobile, FaUser, FaUserTie } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rate from "@/components/Rate/Rate.jsx";

const VideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [mySessions, setMySessions] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [errorBookings, setErrorBookings] = useState(null);
  const [errorSessions, setErrorSessions] = useState(null);
  const [showRateComponent, setShowRateComponent] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [expandedNotes, setExpandedNotes] = useState({});

  // const [selectedDate, setSelectedDate] = useState("");  // Store selected date
  // const [selectedTime, setSelectedTime] = useState("");  // Store selected time

  const [sessionState, setSessionState] = useState({});

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [cancellationReasons, setCancellationReasons] = useState([
    { id: 1, reason: "Schedule conflict", checked: false },
    { id: 2, reason: "Found alternative solution", checked: false },
    { id: 3, reason: "Expert not suitable for my needs", checked: false },
    { id: 4, reason: "Technical issues", checked: false },
    { id: 5, reason: "Cost concerns", checked: false },
    { id: 6, reason: "Other", checked: false },
  ]);
  const [otherReason, setOtherReason] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [sessionToCancel, setSessionToCancel] = useState(null);
  const [loadingCancel, setLoadingCancel] = useState(false);
// Add this at the beginning of your VideoCall component
useEffect(() => {
  const restoreToken = () => {
    // First check if there's a token in localStorage
    const expertToken = localStorage.getItem("expertToken");
    
    if (!expertToken) {
      // If not in localStorage, try to get it from sessionStorage
      const tempToken = sessionStorage.getItem("tempExpertToken");
      if (tempToken) {
        // If found in sessionStorage, restore it to localStorage
        localStorage.setItem("expertToken", tempToken);
        // Optionally clear sessionStorage
        sessionStorage.removeItem("tempExpertToken");
      } else {
        // If still no token, try to get a fresh one
        refreshExpertToken();
      }
    }
  };
  
  // Function to get a fresh token using the refresh endpoint
  const refreshExpertToken = async () => {
    try {
      const response = await axios.post(
        "https://amd-api.code4bharat.com/api/expertauth/refresh-token"
      );
      
      if (response.data && response.data.token) {
        localStorage.setItem("expertToken", response.data.token);
        console.log("Token refreshed successfully");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setErrorBookings("Authentication error. Please log in again.");
      setErrorSessions("Authentication error. Please log in again.");
    }
  };
  
  restoreToken();
}, []);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoadingBookings(true);
        const token = localStorage.getItem("expertToken");
        if (!token) {
          setErrorBookings("Token is required");
          return;
        }

        const bookingsResponse = await axios.get(
          "https://amd-api.code4bharat.com/api/session/mybookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMyBookings(bookingsResponse?.data || []);
      } catch (err) {
        setErrorBookings("No bookings found for this expert.");
      } finally {
        setLoadingBookings(false);
      }
    };

    const fetchSessions = async () => {
      try {
        setLoadingSessions(true);
        const token = localStorage.getItem("expertToken");
        if (!token) {
          setErrorSessions("Token is required");
          return;
        }

        const sessionsResponse = await axios.get(
          "https://amd-api.code4bharat.com/api/session/getexpertsession",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const combinedSessions = [
          ...(sessionsResponse?.data.expertSessions || []).map((session) => ({
            ...session,
            sessionType: "Expert To Expert",
          })),
          ...(sessionsResponse?.data.userSessions || []).map((session) => ({
            ...session,
            sessionType: "User To Expert",
          })),
        ];

        // pull the first slot’s date/time into top-level fields
        const normalized = combinedSessions.map((s) => ({
          ...s,
          sessionDate: s.slots?.[0]?.selectedDate,
          sessionTime: s.slots?.[0]?.selectedTime,
        }));
        setMySessions(normalized);
      } catch (err) {
        setErrorSessions("No sessions found.");
      } finally {
        setLoadingSessions(false);
      }
    };

    fetchBookings();
    fetchSessions();
  }, []);

  const handleRateClick = (booking) => {
    setShowRateComponent(true);
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setShowRateComponent(false);
    setSelectedBooking(null);
  };
  const isJoinEnabled = (slots, duration) => {
    // Check for valid slots array with at least one slot
    if (!Array.isArray(slots)) {
      console.error("Invalid slots format");
      return false;
    }
  
    if (slots.length === 0) {
      console.error("No slots available");
      return false;
    }
  
    // Get first valid slot with both date and time
    const validSlot = slots.find(slot => 
      slot.selectedDate && slot.selectedTime
    );
  
    if (!validSlot) {
      console.error("No valid slots found");
      return false;
    }
  
    // Parse session datetime
    const sessionDateTime = new Date(
      `${validSlot.selectedDate}T${convertTo24Hour(validSlot.selectedTime)}`
    );
  
    if (isNaN(sessionDateTime)) {
      console.error("Invalid date/time format");
      return false;
    }
  
    const now = new Date();
    const diffMinutes = (sessionDateTime - now) / 60000;
    return diffMinutes <= 2 && diffMinutes >= -duration;
  };
  
  // Helper function to convert time to 24-hour format
  const convertTo24Hour = (timeString) => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    
    hours = parseInt(hours);
    if (period.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
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

  const handleAccept = async (sessionId) => {
    // Get the selected date and time from sessionState for the given sessionId
    const { selectedDate, selectedTime } = sessionState[sessionId] || {};

    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and a time before accepting.");
      return;
    }

    try {
      const token = localStorage.getItem("expertToken");
      if (!token) {
        toast.error("Token is required");
        return;
      }

      // Log the selectedDate and selectedTime for debugging
      console.log(selectedDate, selectedTime);

      const response = await axios.put(
        `https://amd-api.code4bharat.com/api/session/accept`,
        { id: sessionId, selectedDate, selectedTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the session status to "confirmed"
      const updatedSessions = mySessions.map((session) =>
        session._id === sessionId
          ? { ...session, status: "confirmed" }
          : session
      );
      setMySessions(updatedSessions);

      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to accept the session");
      console.log(err);
    }
  };


  const handleDecline = async (sessionId) => {
    try {
      const token = localStorage.getItem("expertToken");
      if (!token) {
        toast.error("Token is required");
        return;
      }

      const response = await axios.put(
        `https://amd-api.code4bharat.com/api/session/decline/${sessionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedSessions = mySessions.map((session) =>
        session._id === sessionId ? { ...session, status: "rejected" } : session
      );
      setMySessions(updatedSessions);
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to decline the session");
    }
  };

  const toggleNoteExpand = (id) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatNote = (note) => {
    if (!note) return [];

    try {
      // Make sure note is a string before calling split
      const noteStr = String(note);
      return noteStr
        .split(".")
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length > 0)
        .map((sentence) => `${sentence}.`);
    } catch (error) {
      console.error("Error formatting note:", error);
      return [];
    }
  };

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

  // Check if note is long (more than 100 characters)
  const isNoteLong = (note) => note && note.length > 100;

  // Helper function to get status styles
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

  // Open the cancellation modal
  const handleCancelClick = (session) => {
    setSessionToCancel(session);
    setShowCancelModal(true);

    // Reset states when opening modal
    setCancellationReasons((prevReasons) =>
      prevReasons.map((reason) => ({ ...reason, checked: false }))
    );
    setOtherReason("");
    setTermsAccepted(false);
  };

  // Handle reason selection (only one reason can be selected)
  const handleReasonChange = (id) => {
    setCancellationReasons((prevReasons) =>
      prevReasons.map((reason) =>
        reason.id === id
          ? { ...reason, checked: !reason.checked } // Toggle the selected reason
          : { ...reason, checked: false } // Uncheck all other reasons
      )
    );
  };

  // Proceed to the terms modal
  const handleNextStep = () => {
    const hasSelectedReason = cancellationReasons.some((reason) => reason.checked);
    const isOtherSelected = cancellationReasons.find((r) => r.id === 6)?.checked;

    if (!hasSelectedReason) {
      toast.error("Please select at least one reason for cancellation");
      return;
    }

    if (isOtherSelected && !otherReason.trim()) {
      toast.error("Please provide details for 'Other' reason");
      return;
    }

    setShowCancelModal(false);
    setShowTermsModal(true);
  };

  const handleCancelSession = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions to proceed");
      return;
    }
    
    try {
      setLoadingCancel(true);
      
      // Prepare cancellation data
      const selectedReasons = cancellationReasons
        .filter(reason => reason.checked)
        .map(reason => reason.reason);
      
      const cancellationData = {
        sessionId: sessionToCancel._id,
        reasons: selectedReasons,
        otherReason: cancellationReasons.find(r => r.id === 6)?.checked ? otherReason : ""
      };
      
      const token = localStorage.getItem("expertToken");
      await axios.post(
        "https://amd-api.code4bharat.com/api/cancelsession/cancel",
        cancellationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update state for both bookings and sessions
      if (activeTab === "bookings") {
        setMyBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === sessionToCancel._id 
              ? { ...booking, status: "cancelled" } 
              : booking
          )
        );
      } else {
        setMySessions(prevSessions => 
          prevSessions.map(session => 
            session._id === sessionToCancel._id 
              ? { ...session, status: "cancelled" } 
              : session
          )
        );
      }
      
      setShowTermsModal(false);
      toast.success("Session cancelled successfully");
      
    } catch (error) {
      console.error("Error cancelling session:", error);
      toast.error("Failed to cancel session. Please try again.");
    } finally {
      setLoadingCancel(false);
    }
  };

  return (
    <div className="w-full mx-auto py-6 px-4 mt-2 md:max-w-6xl md:py-10 md:px-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Video Consultations</h1>
        <p className="text-gray-600 mt-2">Manage your upcoming and past consultation sessions</p>
      </div>

      {/* Tabs with Shadow and Animation */}
      <div className="flex justify-center space-x-4 mb-6 md:mb-10 bg-white rounded-lg p-2 shadow-md">
        <button
          className={`px-5 py-2 text-sm md:text-base font-medium rounded-md transition-all duration-300 ${activeTab === "bookings"
            ? "bg-black text-white shadow-md transform scale-105"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </button>
        <button
          className={`px-5 py-2 text-sm md:text-base font-medium rounded-md transition-all duration-300 ${activeTab === "sessions"
            ? "bg-black text-white shadow-md transform scale-105"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab("sessions")}
        >
          My Sessions
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
                            {new Date(booking.slots.sessionDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                day: "numeric",
                              }
                            )}
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
                        <span className="ml-1 text-gray-500">
                          ({booking.duration})
                        </span>
                      </div>
                    </div>

                    {/* Names and Status */}
                    <div className="flex justify-between items-center mb-3 bg-gray-50 p-2 rounded-md">
                      <div className="text-xs">
                        <p className="text-gray-700 mb-1">
                          <FaUser className="inline mr-1 text-blue-500" size={12} />
                          <span className="font-medium">Client:</span> {booking.firstName} {booking.lastName}
                        </p>
                        <p className="text-gray-700">
                          <FaUserTie className="inline mr-1 text-blue-500" size={12} />
                          <span className="font-medium">Expert:</span> {booking.consultingExpertID.firstName}{" "}
                          {booking.consultingExpertID.lastName}
                        </p>
                      </div>
                      <div>
                        <span className={`${getStatusStyle(booking.status)} text-xs font-medium px-2 py-1 bg-gray-100 rounded-full`}>
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
                            <div key={date} className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
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
                                  <span key={index} className="text-xs bg-white px-2 py-1 rounded-md text-gray-700">
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

                          {/* Cancel Button */}
                          <button
                            className="px-3 py-2 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 flex items-center gap-1"
                            onClick={() => handleCancelClick(booking)}
                          >
                            <XCircle className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
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
                        Booking with {booking?.consultingExpertID?.firstName} {booking?.consultingExpertID?.lastName}
                      </h2>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CiClock2 className="mr-1 text-blue-500" />
                          {booking.sessionTime} ({booking.duration})
                        </div>
                        <span className="bg-blue-50 px-3 py-1 rounded-full text-blue-600">
                          {booking.sessionType}
                        </span>
                        <span className={`${getStatusStyle(booking.status)} px-3 py-1 rounded-full ${booking.status === "confirmed" ? "bg-green-50" : booking.status === "completed" ? "bg-green-50" : "bg-gray-100"}`}>
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
                                <span>{booking.firstName} {booking.lastName}</span>
                              </p>
                              <p className="text-sm font-medium text-gray-700 flex items-center">
                                <FaUserTie className="mr-2 text-blue-500" />
                                <span className="text-gray-500 w-16">Expert:</span>
                                <span>{booking.consultingExpertID.firstName} {booking.consultingExpertID.lastName}</span>
                              </p>
                            </div>
                          </div>

                          {/* Available Time Slots */}
                          <div className="flex-1">
                            {booking.status === "unconfirmed"
                              ? <h3 className="text-sm font-semibold text-gray-700 mb-3">Requested Slots</h3>
                              : <h3 className="text-sm font-semibold text-gray-700 mb-3">Booked Slots</h3>
                            }
                            <div className="flex flex-wrap gap-3">
                              {Object.entries(groupByDate(booking.slots?.[0] || [])).map(([date, times]) => {
                                const parsedDate = new Date(date);
                                return (
                                  <div key={date} className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                    <p className="text-sm font-medium text-gray-700">
                                      {!isNaN(parsedDate)
                                        ? parsedDate.toLocaleDateString("en-US", {
                                          weekday: "short",
                                          day: "numeric",
                                          month: "short",
                                        })
                                        : "null"}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {times.map((time, index) => (
                                        <span key={index} className="text-xs bg-white px-2 py-1 rounded-md text-gray-700">
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
                              <button
                                className="w-full px-4 py-2 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 flex items-center gap-1"
                                onClick={() => handleCancelClick(booking)}
                              >
                                <span>Cancel</span>
                              </button>
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

        {/* My Sessions Tab - For Experts to Accept/Decline */}
        {activeTab === "sessions" && (
          <div className="space-y-4 md:space-y-6">
            {loadingSessions ? (
              <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your sessions...</p>
              </div>
            ) : errorSessions ? (
              <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <div className="text-red-500 text-lg mb-2">⚠️</div>
                <p className="text-red-500">{errorSessions}</p>
              </div>
            ) : mySessions.length === 0 ? (
              <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4">🎥</div>
                <p className="text-gray-500 text-lg">No Sessions Yet</p>
                <p className="text-gray-400 mt-2">Your scheduled sessions will appear here</p>
              </div>
            ) : (
              mySessions.map((session) => (
                <div
                  key={session._id}
                  className="bg-white p-4 md:p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Mobile: Compact layout */}
                  <div className="md:hidden w-full">
                    {/* Header with Session Type and Status */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-50 px-3 py-2 rounded-md text-center">
                          <p className="text-xs text-gray-500">
                            {new Date(session.sessionDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                          {session.sessionType}
                        </span>
                      </div>
                      <span className={`${getStatusStyle(session.status)} text-xs font-medium px-2 py-1 bg-gray-100 rounded-full`}>
                        {session.status === "confirmed"
                          ? "Confirmed"
                          : session.status === "unconfirmed"
                            ? "Pending"
                            : session.status === "rejected"
                              ? "Rejected"
                              : session.status === "completed"
                                ? "Completed"
                                : session.status}
                      </span>
                    </div>

                    {/* Time and Duration */}
                    <div className="flex items-center text-xs mb-3 bg-gray-50 p-2 rounded-md">
                      <CiClock2 className="text-sm mr-1 text-blue-500" />
                      <span className="text-gray-700 font-medium">
                        {session.sessionTime}
                      </span>
                      <span className="ml-1 text-gray-500">
                        ({session.duration})
                      </span>
                    </div>

                    {/* Names */}
                    <div className="mb-3 bg-gray-50 p-2 rounded-md">
                      <div className="text-xs">
                        <p className="text-gray-700 mb-1">
                          <FaUser className="inline mr-1 text-blue-500" size={12} />
                          <span className="font-medium">Client:</span> {session?.firstName || "N/A"} {session?.lastName || ""}
                        </p>
                        {/* <p className="text-gray-700">
                          <FaUserTie className="inline mr-1 text-blue-500" size={12} />
                          <span className="font-medium">Expert:</span> {session.expertID?.firstName || "N/A"}{" "}
                          {session.expertID?.lastName || ""}
                        </p> */}
                      </div>
                    </div>

                    {/* Session Notes - Mobile */}
                    {session.sessionNotes && session.sessionNotes.length > 0 && (
                      <div className="mb-3">
                        <div
                          className="bg-gray-50 p-3 rounded-md text-xs relative"
                          onClick={() => toggleNoteExpand(session._id)}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium text-gray-700">Session Notes</h3>
                            {isNoteLong(session.sessionNotes) && (
                              <button className="text-blue-500 focus:outline-none">
                                {expandedNotes[session._id] ? (
                                  <ChevronUp size={14} />
                                ) : (
                                  <ChevronDown size={14} />
                                )}
                              </button>
                            )}
                          </div>
                          <div
                            className={`${isNoteLong(session.sessionNotes) &&
                              !expandedNotes[session._id]
                              ? "line-clamp-2"
                              : ""
                              }`}
                          >
                            <ul className="list-disc pl-4 space-y-1 text-gray-600">
                              {formatNote(session.sessionNotes).map(
                                (note, idx) => (
                                  <li key={idx}>{note}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Date and Time Selection - Mobile */}
                    {session.status === "unconfirmed" && (
                      <div className="mb-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">Select Date</label>
                            <select
                              className="w-full text-xs border rounded-md p-2"
                              value={sessionState[session._id]?.selectedDate || ""}
                              onChange={(e) => handleDateChange(session._id, e.target.value)}
                            >
                              <option value="">Choose a date</option>
                              {Object.keys(groupByDate(session.slots || [])).map((date, index) => {
                                const parsedDate = new Date(date);
                                return (
                                  <option key={index} value={date}>
                                    {!isNaN(parsedDate)
                                      ? parsedDate.toLocaleDateString("en-US", {
                                        weekday: "short",
                                        day: "numeric",
                                        month: "short",
                                      })
                                      : "null"}
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          <div>
                            <label className="text-xs font-medium text-gray-700 block mb-1">Select Time</label>
                            <select
                              className="w-full text-xs border rounded-md p-2"
                              value={sessionState[session._id]?.selectedTime || ""}
                              onChange={(e) => handleTimeChange(session._id, e.target.value)}
                              disabled={!sessionState[session._id]?.selectedDate}
                            >
                              <option value="">Choose a time</option>
                              {Object.entries(groupByDate(session.slots || []))
                                .filter(([date]) => date === sessionState[session._id]?.selectedDate)
                                .map(([date, times]) =>
                                  times.map((time, index) => (
                                    <option key={index} value={time}>
                                      {time}
                                    </option>
                                  ))
                                )}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-3">
                      {session.status === "unconfirmed" && (
                        <>
                          <button
                            className="px-3 py-2 border border-gray-300 rounded-md text-xs hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => handleDecline(session._id)}
                          >
                            Decline
                          </button>
                          <button
                            className="px-3 py-2 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors duration-200"
                            onClick={() => handleAccept(session._id)}
                            disabled={!sessionState[session._id]?.selectedDate || !sessionState[session._id]?.selectedTime}
                          >
                            Accept
                          </button>

                        </>
                      )}

                      {session.status === "confirmed" && (
                        <>
                          <button className="px-3 py-2 border border-gray-300 rounded-md text-xs flex items-center gap-1 hover:bg-gray-50 transition-colors duration-200">
                            <MessagesSquare className="w-3 h-3 text-blue-500" />
                            <span>Chat</span>
                          </button>

                          {session.zoomMeetingLink ? (
                            <a
                              href={session.zoomMeetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 flex items-center gap-1"
                              style={{
                                opacity: isJoinEnabled(
                                  session.slots,
                                  parseInt(session.duration)
                                )
                                  ? 1
                                  : 0.5,
                                pointerEvents: isJoinEnabled(
                                  session.slots,
                                  parseInt(session.duration)
                                )
                                  ? "auto"
                                  : "none",
                              }}
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
                    </div>
                  </div>

                  {/* Desktop: Modified layout */}
                  <div className="hidden md:block">
                    <div className="border-b pb-4 mb-4">
                      <div className="flex justify-between">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          {session.sessionType === "Expert To Expert"
                            ? `Consultation with Expert ${session.expertID?.firstName || "N/A"} ${session.expertID?.lastName || ""}`
                            : `Consultation with ${session?.firstName || "N/A"} ${session?.lastName || ""}`}
                        </h2>
                        <span className={`${getStatusStyle(session.status)} px-3 py-1 h-fit rounded-full text-sm ${session.status === "confirmed" ? "bg-green-50" : session.status === "completed" ? "bg-green-50" : "bg-gray-100"}`}>
                          {session.status === "confirmed"
                            ? "Confirmed"
                            : session.status === "unconfirmed"
                              ? "Pending"
                              : session.status === "rejected"
                                ? "Rejected"
                                : session.status === "completed"
                                  ? "Completed"
                                  : session.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CiClock2 className="mr-1 text-blue-500" />
                          {session.sessionTime || "To be confirmed"} ({session.duration})
                        </div>
                        <span className="bg-blue-50 px-3 py-1 rounded-full text-blue-600">
                          {session.sessionType}
                        </span>
                        <span className="bg-gray-50 px-3 py-1 rounded-full text-gray-600">
                          {new Date(session.sessionDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                      {/* Left Side - Details */}
                      <div className="col-span-8">
                        <div className="flex items-start gap-8 mb-6">
                          {/* People Details */}
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">People</h3>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <FaUser className="mr-2 text-blue-500" />
                                <span className="text-gray-500 w-16">Client:</span>
                                <span>{session?.firstName || "N/A"} {session?.lastName || ""}</span>
                              </p>
                              <p className="text-sm font-medium text-gray-700 flex items-center">
                                <FaMobile className="mr-2 text-blue-500" />
                                <span className="text-gray-500 w-16">Mobile:</span>
                                <span>{session?.phone} </span>
                              </p>

                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700 border-2 rounded-[5px] mt-4 justify-between p-2 flex">
                                <div className="flex flex-col">
                                  <span className="text-gray-500 w-16">Note:</span>
                                  <ul className="w-full list-disc pl-5">
                                    {session?.note &&
                                      session?.note
                                        .split(".")  // Split the note by periods
                                        .map((sentence, index) => {
                                          const trimmedSentence = sentence.trim();
                                          if (trimmedSentence) {
                                            return (
                                              <li key={index} className="text-gray-700">
                                                {trimmedSentence}.
                                              </li>
                                            );
                                          }
                                          return null;
                                        })}
                                  </ul>
                                </div>

                              </p>


                            </div>
                          </div>


                          {/* Select Date and Time - Desktop */}
                          {session.status === "unconfirmed" ? (
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Date & Time</h3>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Date</label>
                                    <select
                                      id="date"
                                      className="w-full text-sm border rounded-md p-2 outline-none cursor-pointer"
                                      value={sessionState[session._id]?.selectedDate || ""}
                                      onChange={(e) => handleDateChange(session._id, e.target.value)}
                                    >
                                      <option value="">Select a Date</option>
                                      {Object.keys(groupByDate(session.slots?.[0] || []))
                                        .map((date, index) => {
                                          const parsedDate = new Date(date);
                                          return (
                                            <option key={index} value={date}>
                                              {parsedDate.toLocaleDateString("en-US", {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "short",
                                              })}
                                            </option>
                                          );
                                        })}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">Time</label>
                                    <select
                                      id="time"
                                      className="w-full text-sm border rounded-md p-2 outline-none cursor-pointer"
                                      value={sessionState[session._id]?.selectedTime || ""}
                                      onChange={(e) => handleTimeChange(session._id, e.target.value)}
                                      disabled={!sessionState[session._id]?.selectedDate}
                                    >
                                      <option value="">Select a Time</option>
                                      {Object.entries(groupByDate(session.slots?.[0] || []))
                                        .filter(([date]) => date === sessionState[session._id]?.selectedDate)
                                        .map(([date, times]) =>
                                          times.map((time, index) => (
                                            <option key={index} value={time}>
                                              {time}
                                            </option>
                                          ))
                                        )}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-gray-700 mb-3">Accepted Slot</h3>
                              <div className="flex flex-wrap gap-3">
                                {Object.entries(groupByDate(session.slots?.[0] || [])).map(([date, times]) => {
                                  const parsedDate = new Date(date);
                                  return (
                                    <div key={date} className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                                      <p className="text-sm font-medium text-gray-700">
                                        {!isNaN(parsedDate)
                                          ? parsedDate.toLocaleDateString("en-US", {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "short",
                                          })
                                          : "null"}
                                      </p>
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {times.map((time, index) => (
                                          <span key={index} className="text-xs bg-white px-2 py-1 rounded-md text-gray-700">
                                            {time}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Session Notes - Desktop */}
                        {session.sessionNotes && session.sessionNotes.length > 0 && (
                          <div className="mt-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Session Notes</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                                {formatNote(session.sessionNotes).map((note, idx) => (
                                  <li key={idx}>{note}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Side - Actions */}
                      <div className="col-span-4">
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-3">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">Actions</h3>

                          {session.status === "unconfirmed" && (
                            <>
                              <button
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-all duration-200"
                                onClick={() => handleDecline(session._id)}
                              >
                                Decline Request
                              </button>
                              <button
                                className={`w-full px-4 py-2 text-white rounded-md text-sm transition-all duration-200 ${sessionState[session._id]?.selectedDate && sessionState[session._id]?.selectedTime
                                  ? "bg-blue-500 hover:bg-blue-600"
                                  : "bg-gray-300 cursor-not-allowed"
                                  }`}
                                onClick={() => {
                                  // Only call handleAccept with sessionId, selectedDate, and selectedTime
                                  handleAccept(session._id, sessionState[session._id]?.selectedDate, sessionState[session._id]?.selectedTime);
                                }}
                                disabled={!sessionState[session._id]?.selectedDate || !sessionState[session._id]?.selectedTime}
                              >
                                Accept Request
                              </button>
                            </>
                          )}

                          {session.status === "confirmed" && (
                            <>
                              <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-200">
                                <MessagesSquare className="w-4 h-4 text-blue-500" />
                                <span>Chat with {session.expertID ? "Expert" : "Client"}</span>
                              </button>

                              {session.zoomMeetingLink ? (
                                <a
                                  href={session.zoomMeetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full"
                                >
                                  <button className="w-full px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
                                    style={{
                                      opacity: isJoinEnabled(
                                        session.slots,
                                        parseInt(session.duration)
                                      )
                                        ? 1
                                        : 0.5,
                                      pointerEvents: isJoinEnabled(
                                        session.slots,
                                        parseInt(session.duration)
                                      )
                                        ? "auto"
                                        : "none",
                                    }}>
                                    <Video className="w-4 h-4" />
                                    <span>Join Zoom Meeting</span>
                                  </button>
                                </a>
                              ) : (
                                <div className="w-full px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-600 flex items-center justify-center gap-2">
                                  <span>Zoom link coming soon</span>
                                </div>
                              )}

                              {/* Cancel Button */}
                              <button
                                className="px-3 py-2 text-xs rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 flex justify-center items-center gap-1"
                                onClick={() => handleCancelClick(session)}
                              >
                                <XCircle className="w-3 h-3" />
                                <span>Cancel</span>
                              </button>
                            </>
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
      </div>

      {/* Rating Modal */}
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
              sessionID={selectedBooking._id}
              expertID={selectedBooking.consultingExpertID._id}
              onClose={closeModal}
            />
          </div>
        </div>

      )}

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cancel Session</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowCancelModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">Please select your reason(s) for cancellation:</p>
              <div className="space-y-3">
                {cancellationReasons.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <input
                      id={`reason-${item.id}`}
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={item.checked}
                      onChange={() => handleReasonChange(item.id)}
                    />
                    <label htmlFor={`reason-${item.id}`} className="ml-2 block text-sm text-gray-700">
                      {item.reason}
                    </label>
                  </div>
                ))}
              </div>

              {cancellationReasons.find((r) => r.id === 6)?.checked && (
                <div className="mt-4">
                  <label htmlFor="other-reason" className="block text-sm font-medium text-gray-700 mb-1">
                    Please specify your reason:
                  </label>
                  <textarea
                    id="other-reason"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Please provide details..."
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-3 hover:bg-gray-300 transition-colors duration-200"
                onClick={() => setShowCancelModal(false)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cancellation Terms</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowTermsModal(false)}
              >
                ✕
              </button>
            </div>

          //Terms & Conditions

            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-md mb-6 max-h-60 overflow-y-auto">
                <h3 className="font-medium text-gray-800 mb-2">Terms and Conditions for Cancellation</h3>
                <p className="text-sm text-gray-600 mb-3">Please read the following terms carefully:</p>
                <ol className="text-sm text-gray-600 list-decimal list-inside space-y-2">
                  <li>Cancellations made within 24 hours of the scheduled session may be subject to a cancellation fee.</li>
                  <li>If you cancel more than 24 hours before your scheduled session, you will receive a full refund.</li>
                  <li>Expert's availability for rescheduling is not guaranteed after cancellation.</li>
                  <li>Multiple cancellations may affect your ability to book future sessions.</li>
                  <li>For emergency cancellations, please contact customer support directly.</li>
                  <li>Refunds will be processed within 5-7 business days to the original payment method.</li>
                  <li>We reserve the right to review each cancellation on a case-by-case basis.</li>
                </ol>
              </div>

              <div className="mt-4">
                <div className="flex items-start">
                  <input
                    id="accept-terms"
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                  />
                  <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                    I have read and agree to the cancellation terms and conditions
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-3 hover:bg-gray-300 transition-colors duration-200"
                onClick={() => setShowTermsModal(false)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={handleCancelSession}
                disabled={loadingCancel}
              >
                {loadingCancel ? "Cancelling..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;