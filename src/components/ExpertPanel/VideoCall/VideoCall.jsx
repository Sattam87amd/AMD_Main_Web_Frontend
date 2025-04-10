"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CiClock2 } from "react-icons/ci";

const VideoCall = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [mySessions, setMySessions] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);

        // Retrieve the token from localStorage
        const token = localStorage.getItem("expertToken");

        if (!token) {
          setError("Token is required");
          return;
        }

        // Choose the endpoint based on activeTab
        const endpoint =
          activeTab === "bookings" ? "http://localhost:8000/api/session/mybookings" : "http://localhost:8000/api/session/getexpertsession";
        
        // Fetching expert-to-expert session data with the token
        const sessionsResponse = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        // Update the state with fetched data
        if (activeTab === "bookings") {
          setMyBookings(sessionsResponse.data);
        } else {
          setMySessions(sessionsResponse.data);
        }
      } catch (err) {
        setError("No Bookings Found");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [activeTab]); // Re-fetch when the activeTab changes

  const isJoinEnabled = (sessionDate, sessionTime, duration) => {
    const [hours, minutes] = sessionTime.split(":").map(Number);
    const sessionDateTime = new Date(sessionDate);
    sessionDateTime.setHours(hours, minutes, 0, 0); // Set the session time on the sessionDate

    const now = new Date();
    console.log("Current Time:", now);
    console.log("Session Time:", sessionDateTime);

    const diff = (sessionDateTime - now) / 60000; // Difference in minutes
    console.log("Time Difference (in minutes):", diff);

    return diff <= 2 && diff >= -duration; // Join is enabled if within the 2-minute window before or during the session
  };

  // Handle session accept action
  const handleAccept = async (sessionId) => {
    try {
      const token = localStorage.getItem("expertToken");

      if (!token) {
        setError("Token is required");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/session/accept/${sessionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update session status in state
      const updatedSessions = mySessions.map((session) => {
        if (session._id === sessionId) {
          return { ...session, status: "confirmed" };
        }
        return session;
      });
      setMySessions(updatedSessions);
      alert(response.data.message); // Optional: Display success message
    } catch (err) {
      setError("Failed to accept the session");
    }
  };

  // Handle session decline action
  const handleDecline = async (sessionId) => {
    try {
      const token = localStorage.getItem("expertToken");

      if (!token) {
        setError("Token is required");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/session/decline/${sessionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update session status in state
      const updatedSessions = mySessions.map((session) => {
        if (session._id === sessionId) {
          return { ...session, status: "rejected" };
        }
        return session;
      });
      setMySessions(updatedSessions);
      alert(response.data.message); // Optional: Display success message
    } catch (err) {
      setError("Failed to decline the session");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full md:max-w-6xl max-w-4xl mx-auto py-10 px-4 mt-20 md:mt-0 ">
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
      <div className="text-center text-gray-500">No Bookings</div>
    ) : (
      myBookings.map((booking) => (
        <div key={booking._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
          {/* Left Side (Date and Details) */}
          <div className="flex items-center space-x-4">
            <div className="text-center bg-gray-100 px-3 py-2 rounded-lg shadow-md">
              <p className="text-xs text-gray-500">
                {new Date(booking.sessionDate).toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <p className="text-lg font-bold">
                {new Date(booking.sessionDate).toLocaleDateString("en-US", { day: "numeric" })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                👤 {booking.firstName} {booking.lastName}
                
              </p>
            </div>
          </div>

          {/* Right Side (Confirm/Unconfirm Status & Zoom Join Button) */}
          <div className="flex items-center space-x-4">
            {booking.status === "confirmed" ? (
              <>
                {/* Display green "Confirmed" status */}
                <span className="text-green-500 text-sm font-medium">Confirmed</span>
                <button className="px-4 py-1 border rounded text-sm">💬 Chat</button>

                {/* Display Zoom Join Button */}
                {booking.zoomMeetingLink ? (
                  <a
                    href={booking.zoomMeetingLink} // Direct link to the meeting
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
            ) : booking.status === "unconfirmed" ? (
              <>
                {/* Display red "Unconfirmed" status */}
                <span className="text-red-500 text-sm font-medium">Unconfirmed</span>
                <button className="px-4 py-1 border rounded text-sm">💬 Chat</button>
              </>
            ) : (
              <></>
            )}
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
            <div className="text-center text-gray-500">No Upcoming Sessions</div>
          ) : (
            mySessions.map((session) => (
              <div key={session._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white hover:shadow-xl transition-shadow duration-300">
                {/* Left Side (Date and Details) */}
                <div className="flex items-center space-x-4">
                  <div className="text-center bg-gray-100 px-3 py-2 rounded-lg shadow-md">
                    <p className="text-xs text-gray-500">{new Date(session.sessionDate).toLocaleDateString('en-US', { weekday: 'short'})}</p>
                    <p className="text-lg font-bold">{new Date(session.sessionDate).toLocaleDateString('en-US', { day: 'numeric' })}</p>
                  </div>
                  <div>
                    <div className="flex">
                      <div><CiClock2 className="mt-[3px] mr-1" /></div>
                      <p className="text-sm text-gray-500 mr-5">{session.sessionTime}</p>
                      <p className="text-sm text-gray-500">{session.duration}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-700">👤 {session.firstName} {session.lastName}</p>
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
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default VideoCall;
