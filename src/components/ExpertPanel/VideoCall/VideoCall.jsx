"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CiClock2 } from "react-icons/ci";
import { MessagesSquare, Video } from "lucide-react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rate from "@/components/Rate/Rate.jsx"; // Import the Rate component

const VideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  // Separate states for loading and errors for both tabs
  const [mySessions, setMySessions] = useState([]); 
  const [myBookings, setMyBookings] = useState([]);

  // Loading and error states for each tab
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [errorBookings, setErrorBookings] = useState(null);
  const [errorSessions, setErrorSessions] = useState(null);

  const [showRateComponent, setShowRateComponent] = useState(false); 
  const [selectedBooking, setSelectedBooking] = useState(null); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoadingBookings(true);
        const token = localStorage.getItem("expertToken");
        if (!token) {
          setErrorBookings("Token is required");
          return;
        }

        const bookingsResponse = await axios.get("http://localhost:5070/api/session/mybookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

        const sessionsResponse = await axios.get("http://localhost:5070/api/session/getexpertsession", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const combinedSessions = [
          ...(sessionsResponse?.data.expertSessions || []).map((session) => ({
            ...session,
            sessionType: "Expert To Expert",
          })),
          ...(sessionsResponse?.data.userSessions || []).map((session) => ({
            ...session,
            sessionType: "UserToExpert",
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
    sessionDateTime.setHours(hours, minutes, 0, 0); // Set the session time on the sessionDate

    const now = new Date();
    const diff = (sessionDateTime - now) / 60000; // Difference in minutes
    return diff <= 2 && diff >= -duration;
  };

  const handleAccept = async (sessionId) => {
    try {
      const token = localStorage.getItem("expertToken");
      if (!token) {
        setError("Token is required");
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
        setError("Token is required");
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

  return (
    <div className="w-full md:max-w-6xl max-w-4xl mx-auto py-10 px-4 mt-20 md:mt-0">
      <ToastContainer />

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

      {/* My Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {loadingBookings ? (
            <div>Loading bookings...</div>
          ) : errorBookings ? (
            <div className="text-center text-red-500">{errorBookings}</div>
          ) : myBookings.length === 0 ? (
            <div className="text-center text-gray-500">No Bookings Yet</div>
          ) : (
            myBookings.map((booking) => (
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
                    <div className="flex ">
                      <div>
                        <CiClock2 className="mt-[3px] mr-1" />
                      </div>
                      <p className="text-sm text-gray-500 mr-5">
                        {booking.sessionTime}
                      </p>
                      <p className="text-sm text-gray-500">{booking.duration}</p>
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

                {/* Right Side (Status & Zoom Join) */}
                <div className="flex items-center space-x-4">
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
                      <button className="px-4 py-1 border rounded text-sm flex items-center space-x-2">
                        <MessagesSquare className="w-5 h-5" />
                        <span>Chat</span>
                      </button>
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
            ))
          )}
        </div>
      )}

      {/* Modal for Rate Component */}
      {showRateComponent && selectedBooking && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl font-bold"
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

      {/* My Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          {loadingSessions ? (
            <div>Loading sessions...</div>
          ) : errorSessions ? (
            <div className="text-center text-red-500">{errorSessions}</div>
          ) : mySessions.length === 0 ? (
            <div className="text-center text-gray-500">No Upcoming Sessions</div>
          ) : (
            mySessions.map((session) => (
              <div
                key={session._id}
                className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Add session type display */}
              <div className="text-center bg-gray-100 px-3 py-2 rounded-lg shadow-md">
                <p className="text-xs text-gray-500">
                  {session.sessionType} {/* Display session type */}
                </p>
                <p className="text-lg font-bold">
                  {new Date(session.sessionDate).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
              </div>
              <div>
                {/* Other session details */}
                <div className="flex">
                  <CiClock2 className="mt-[3px] mr-1" />
                  <p className="text-sm text-gray-500 mr-5">
                    {session.sessionTime}
                  </p>
                  <p className="text-sm text-gray-500 mr-5">{session.duration}</p>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-2">
                  <FaUser className="inline mr-1" />
                  {session.firstName} {session.lastName}
                </p>
              </div>
            </div>

            {/* Accept/Decline/Status Logic */}
            <div className="flex items-center space-x-4">
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
              ) :  session.status === "rejected" ? (
                <>
                  <span className="text-red-500 text-sm font-medium">
                    Rejected
                  </span>
                </>
              ) : session.status === "completed" ? (
                <>
                  <span className="text-green-700 text-sm font-medium">
                    Completed
                  </span>
                </>
              ) : session.status === "Rating Submitted" ? (
                <>
                  <span className="text-green-700 text-sm font-medium">
                    Rating Submitted
                  </span>
                </>
              ) : session.status === "unconfirmed" ?(
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
              ):null}
            </div>
          </div>

          {/* Note Section */}
          {session.note && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Note:</p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {session.note.split(".").map((sentence, index) => {
                  const trimmed = sentence.trim();
                  return trimmed ? <li key={index}>{trimmed}.</li> : null;
                })}
              </ul>
            </div>
          )}
        </div>
      ))
    )}
  </div>
)}
    </div>
  );
};

export default VideoCall;
