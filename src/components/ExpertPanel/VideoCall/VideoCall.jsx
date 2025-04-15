"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CiClock2 } from "react-icons/ci";
import { FaUser, FaUserTie } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [mySessions, setMySessions] = useState([]); // Combined sessions state
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching Sessions...');
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("expertToken");
        if (!token) {
          setError("Token is required");
          return;
        }
  
        const [bookingsResponse, sessionsResponse] = await Promise.all([
          axios.get("http://localhost:5070/api/session/mybookings", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:5070/api/session/getexpertsession", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
  
        // Combining expert and user sessions into one
        const combinedSessions = [
          ...sessionsResponse?.data.expertSessions || [],
          ...sessionsResponse?.data.userSessions || [],
        ];
  
        setMyBookings(bookingsResponse?.data || []);
        setMySessions(combinedSessions);
      } catch (err) {
        setError("No Bookings Found");
      } finally {
        setLoading(false);
      }
    };
  
    fetchSessions();
  }, []);

  const isJoinEnabled = (sessionDate, sessionTime, duration) => {
    const [hours, minutes] = sessionTime.split(":").map(Number);
    const sessionDateTime = new Date(sessionDate);
    sessionDateTime.setHours(hours, minutes, 0, 0); // Set the session time on the sessionDate

    const now = new Date();
    const diff = (sessionDateTime - now) / 60000; // Difference in minutes
    return diff <= 2 && diff >= -duration; // Join if within 2-minute window or during session
  };

  // Handle session accept
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

      // Update session status in state
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

  // Handle session decline
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

      // Update session status in state
      const updatedSessions = mySessions.map((session) =>
        session._id === sessionId
          ? { ...session, status: "rejected" }
          : session
      );
      setMySessions(updatedSessions);
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to decline the session");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }



  if (error) {
    return (
      <div className="w-full md:max-w-6xl max-w-4xl mx-auto py-10 px-4 mt-20 md:mt-0">
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
        {error}
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-6xl max-w-4xl mx-auto py-10 px-4 mt-20 md:mt-0">
      {/* Toast notifications */}
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
          {myBookings.length === 0 ? (
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
                      {new Date(booking.sessionDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                        }
                      )}
                    </p>
                    <p className="text-lg font-bold">
                      {new Date(booking.sessionDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                        }
                      )}
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
                      <p className="text-sm text-gray-500">
                        {booking.duration}
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

                {/* Right Side (Status & Zoom Join) */}
                <div className="flex items-center space-x-4">
                  {booking.status === "confirmed" ? (
                    <>
                      <span className="text-green-500 text-sm font-medium">
                        Confirmed
                      </span>
                      <button className="px-4 py-1 border rounded text-sm">
                        💬 Chat
                      </button>
                      {booking.zoomMeetingLink ? (
                        <a
                          href={booking.zoomMeetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="px-4 py-1 text-sm rounded ml-2 bg-blue-500 text-white hover:bg-blue-600">
                            🎥 Join
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
                      <button className="px-4 py-1 border rounded text-sm">
                        💬 Chat
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* My Sessions Tab */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          {mySessions.length === 0 ? (
            <div className="text-center text-gray-500">
              No Upcoming Sessions
            </div>
          ) : (
            mySessions.map((session) => (
              <div
                key={session._id}
                className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-xl transition-shadow duration-300"
              >
                {/* Upper Section (Date & Time, Name) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center bg-gray-100 px-3 py-2 rounded-lg shadow-md">
                      <p className="text-xs text-gray-500">
                        {new Date(session.sessionDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                          }
                        )}
                      </p>
                      <p className="text-lg font-bold">
                        {new Date(session.sessionDate).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                          }
                        )}
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
                      </div>
                      <p className="text-sm font-medium text-gray-700 mt-2">
                        <FaUser className="inline mr-1" />
                        {session.firstName} {session.lastName}
                      </p>
                    </div>
                  </div>

                  {/* Right Side (Accept/Decline Buttons or Status) */}
                  <div className="flex items-center space-x-4">
                    {session.status === 'confirmed' ? (
                      <>
                        <span className="text-green-500 text-sm font-medium">Accepted</span>
                        <button className="px-4 py-1 border rounded text-sm">💬 Chat</button>
                        {session.zoomMeetingLink ? (
                          <a
                            href={session.zoomMeetingLink} // Direct link to the meeting
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="px-4 py-1 text-sm rounded ml-2 bg-blue-500 text-white hover:bg-blue-600">
                              🎥 Join
                            </button>
                          </a>
                        ) : (
                          <span className="text-yellow-500 text-sm ml-2">Zoom link not ready</span>
                        )}
                      </>
                    ) : session.status === 'rejected' ? (
                      <span className="text-red-500 text-sm font-medium">Rejected</span>
                    ) : (
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
                    )}
                  </div>
                </div>

                {/* Note Section (Below Date/Name) */}
                {session.note && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Note:
                    </p>
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
