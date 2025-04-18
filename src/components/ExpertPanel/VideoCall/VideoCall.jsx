"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CiClock2 } from "react-icons/ci";
import { MessagesSquare, Video, ChevronDown, ChevronUp } from "lucide-react";
import { FaUser, FaUserTie } from "react-icons/fa";
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
          "http://localhost:5070/api/session/mybookings",
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
          "http://localhost:5070/api/session/getexpertsession",
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

        setMySessions(combinedSessions);
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

  const isJoinEnabled = (sessionDate, sessionTime, duration) => {
    const [hours, minutes] = sessionTime.split(":").map(Number);
    const sessionDateTime = new Date(sessionDate);
    sessionDateTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    const diff = (sessionDateTime - now) / 60000; // Difference in minutes
    return diff <= 2 && diff >= -duration;
  };

  const handleAccept = async (sessionId) => {
    try {
      const token = localStorage.getItem("expertToken");
      if (!token) {
        toast.error("Token is required");
        return;
      }

      const response = await axios.put(
        `http://localhost:5070/api/session/accept/${sessionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedSessions = mySessions.map((session) =>
        session._id === sessionId
          ? { ...session, status: "confirmed" }
          : session
      );
      setMySessions(updatedSessions);
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to accept the session");
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
        `http://localhost:5070/api/session/decline/${sessionId}`,
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
    setExpandedNotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Note formatter for bullet points
  const formatNote = (note) => {
    if (!note) return [];
    return note.split(".")
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0)
      .map(sentence => `${sentence}.`);
  };

  // Check if note is long (more than 100 characters)
  const isNoteLong = (note) => note && note.length > 100;

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
        <button
          className={`px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm font-medium rounded ${
            activeTab === "sessions" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("sessions")}
        >
          My Sessions
        </button>
      </div>

      {/* Content Container */}
      <div className="space-y-2 md:space-y-4 max-h-[calc(100vh-120px)] md:max-h-none">
        {/* My Bookings Tab */}
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
                    {/* Header with Session Type and Date */}
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
                          {booking.consultingExpertID.firstName}{" "}
                          {booking.consultingExpertID.lastName}
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
                              Zoom link not ready
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

                  {/* Desktop: Modified layout with status and buttons on right */}
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
                        {/* User and Consultant Details */}
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700">
                            <FaUser className="inline mr-1" />
                            Client: {booking.firstName} {booking.lastName}
                          </p>
                          <p className="text-sm font-medium text-gray-700 mt-1">
                            <FaUserTie className="inline mr-1" />
                            Expert: {booking.consultingExpertID.firstName}{" "}
                            {booking.consultingExpertID.lastName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side (Status & Actions) - Now positioned correctly */}
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

        {/* My Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="space-y-2 md:space-y-4">
            {loadingSessions ? (
              <div className="text-xs md:text-base text-center">Loading sessions...</div>
            ) : errorSessions ? (
              <div className="text-xs md:text-base text-center text-red-500">{errorSessions}</div>
            ) : mySessions.length === 0 ? (
              <div className="text-xs md:text-base text-center text-gray-500">
                No Upcoming Sessions
              </div>
            ) : (
              mySessions.map((session) => (
                <div
                  key={session._id}
                  className="p-2 md:p-4 border rounded-lg shadow-sm bg-white hover:shadow-md md:hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Mobile: Compact layout */}
                  <div className="md:hidden">
                    {/* Header with Session Type and Date */}
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <div className="bg-gray-100 px-1 py-1 rounded text-center">
                          <p className="text-xs text-gray-500">
                            {new Date(session.sessionDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <span className="text-xs bg-slate-200 px-2 py-1 rounded">
                          {session.sessionType}
                        </span>
                      </div>
                      <div className="flex items-center text-xs">
                        <CiClock2 className="text-xs mr-1" />
                        <span className="text-gray-500">{session.sessionTime}</span>
                        <span className="ml-1 text-gray-500">({session.duration})</span>
                      </div>
                    </div>

                    {/* Names and Status */}
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-xs">
                        <p className="text-gray-700">
                          <FaUser className="inline mr-1" size={10} />
                          {session.firstName} {session.lastName}
                        </p>
                      </div>
                      <div>
                        {session.status === "confirmed" ? (
                          <span className="text-green-500 text-xs font-medium">
                            Accepted
                          </span>
                        ) : session.status === "unconfirmed" ? (
                          <span className="text-yellow-500 text-xs font-medium">
                            Pending
                          </span>
                        ) : session.status === "rejected" ? (
                          <span className="text-red-500 text-xs font-medium">
                            Rejected
                          </span>
                        ) : session.status === "completed" ? (
                          <span className="text-green-700 text-xs font-medium">
                            Completed
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-1 mt-1">
                      {session.status === "confirmed" && (
                        <>
                          <button className="px-2 py-1 border rounded text-xs flex items-center gap-1">
                            <MessagesSquare className="w-3 h-3" />
                            <span>Chat</span>
                          </button>
                          
                          {session.zoomMeetingLink ? (
                            <a
                              href={session.zoomMeetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1"
                            >
                              <Video className="w-3 h-3" />
                              <span>Join</span>
                            </a>
                          ) : (
                            <span className="text-yellow-500 text-xs">
                              Zoom link not ready
                            </span>
                          )}
                        </>
                      )}
                      
                      {session.status === "unconfirmed" && (
                        <>
                          <button
                            className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-all duration-200"
                            onClick={() => handleAccept(session._id)}
                          >
                            Accept
                          </button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-all duration-200"
                            onClick={() => handleDecline(session._id)}
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </div>

                    {/* Note Section - Mobile with Bullet Points and Read More */}
                    {session.note && (
                      <div className="mt-2 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-700">Note:</p>
                        {isNoteLong(session.note) && (
                          <button 
                            onClick={() => toggleNoteExpand(session._id)}
                            className="text-blue-500 flex items-center"
                          >
                            {expandedNotes[session._id] ? (
                              <>Show Less <ChevronUp className="w-3 h-3 ml-1" /></>
                            ) : (
                              <>Read More <ChevronDown className="w-3 h-3 ml-1" /></>
                            )}
                          </button>
                        )}
                        </div>
                        
                        {isNoteLong(session.note) && !expandedNotes[session._id] ? (
                          <p className="text-gray-600">{session.note.substring(0, 100)}...</p>
                        ) : (
                          <ul className="list-disc pl-4 text-gray-600 mt-1">
                            {formatNote(session.note).map((item, idx) => (
                              <li key={idx} className="mb-1">{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Desktop: Modified layout with status and buttons on right */}
                  <div className="hidden md:block">
                    <div className="flex items-center">
                      {/* Left Side - Session Info */}
                      <div className="flex items-center space-x-4 flex-grow">
                        <div className="text-center bg-gray-100 px-3 py-2 rounded-lg shadow-md">
                          <p className="text-xs text-gray-500">
                            {new Date(session.sessionDate).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </p>
                          <p className="text-lg font-bold">
                            {new Date(session.sessionDate).toLocaleDateString("en-US", {
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <div className="flex">
                            <CiClock2 className="mt-[3px] mr-1" />
                            <p className="text-sm text-gray-500 mr-5">
                              {session.sessionTime}
                            </p>
                            <p className="text-sm text-gray-500 mr-5">
                              {session.duration}
                            </p>
                            {/* Session Type */}
                            <p className="text-sm text-gray-500 bg-slate-200 px-3">
                              {session.sessionType}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-700 mt-2">
                            <FaUser className="inline mr-1" />
                            {session.firstName} {session.lastName}
                          </p>
                        </div>
                      </div>

                      {/* Right Side - Status and Actions */}
                      <div className="flex items-center justify-end space-x-3 ml-auto">
                        {session.status === "confirmed" ? (
                          <>
                            <span className="text-green-500 text-sm font-medium">
                              Accepted
                            </span>
                            <button className="px-4 py-1 border rounded text-sm flex items-center space-x-2">
                              <MessagesSquare className="w-5 h-5" />
                              <span>Chat</span>
                            </button>
                            {session.zoomMeetingLink ? (
                              <a
                                href={session.zoomMeetingLink}
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
                        ) : session.status === "unconfirmed" ? (
                          <>
                            <button
                              className="px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-all duration-200"
                              onClick={() => handleAccept(session._id)}
                            >
                              Accept
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-all duration-200"
                              onClick={() => handleDecline(session._id)}
                            >
                              Decline
                            </button>
                          </>
                        ) : session.status === "rejected" ? (
                          <span className="text-red-500 text-sm font-medium">
                            Rejected
                          </span>
                        ) : session.status === "completed" ? (
                          <span className="text-green-700 text-sm font-medium">
                            Completed
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Note Section for Desktop */}
                    {session.note && (
                      <div className="mt-4 max-w-[60%]">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Note:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          {formatNote(session.note).map((item, idx) => (
                            <li key={idx} className="mb-1">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal for Rate Component */}
      {showRateComponent && selectedBooking && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-64 md:w-96">
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 md:top-2 md:right-2 text-lg md:text-xl font-bold"
            >
              X
            </button>
            <Rate
              booking={selectedBooking}
              setShowRateComponent={setShowRateComponent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;