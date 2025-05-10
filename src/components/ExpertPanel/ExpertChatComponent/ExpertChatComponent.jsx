"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaRegPaperPlane, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { useExpertChatStore } from "@/store/expertChatStore";

const ExpertChatComponent = () => {
  const [text, setText] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const messagesContainerRef = useRef(null);
  const menuRef = useRef(null);

  const store = useExpertChatStore();

  const {
    experts,
    selectedExpert,
    messages,
    isExpertsLoading,
    loggedInExpert,
    isMessagesLoading,
    getExperts,
    selectExpert,
    isExpertOnline,
    getExpertMessages,
    sendExpertMessage,
    deleteExpertMessage,
  } = store;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendExpertMessage = async (e) => {
    e.preventDefault();

    const messageText = (text ?? "").toString().trim();
    if (!messageText) return;

    try {
      await sendExpertMessage(messageText);
      setText("");
    } catch (error) {
      console.error("Failed to send expert message:", error);
    }
  };

  const handleDeleteClick = async (messageId) => {
    try {
      setIsDeleting(true);
      // Make sure messageId is being passed to your deleteExpertMessage function
      await deleteExpertMessage(messageId);
      setShowMenu(null);
    } catch (error) {
      console.error("Failed to delete expert message:", error);
      // Show a toast notification here for error feedback
    } finally {
      setIsDeleting(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  // Fetch experts on component mount
  useEffect(() => {
    getExperts();
  }, []);

  // Fetch messages when selected expert changes
  useEffect(() => {
    if (selectedExpert?._id) {
      getExpertMessages(selectedExpert._id);
    }
  }, [selectedExpert?._id]);

  // Format timestamp (add this utility function)
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isExpertsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Loading experts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-auto bg-gray-100 p-4 md:p-6 gap-6">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 space-y-6">
        <div className="p-5 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Expert Chat</h2>
          <p className="text-sm text-gray-600">
            Connect with other experts to collaborate on cases and share knowledge.
          </p>
        </div>

        <div className="flex">
          <button
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium shadow-md"
            onClick={() => getExperts && getExperts()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh Expert List
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium text-gray-700">Available Experts</h3>
          </div>
          <div className="p-3 overflow-y-auto h-[400px] custom-scrollbar">
            {experts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p>No experts available</p>
                <p className="text-sm text-gray-400 mt-1">Check back later</p>
              </div>
            ) : (
              experts.map((expert) => (
                <motion.div
                  key={expert._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectExpert && selectExpert(expert)}
                  className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer transition-all ${
                    selectedExpert?._id === expert._id
                      ? "bg-blue-50 border-2 border-blue-500"
                      : "hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={expert.photoFile || "/expert-avatar.png"}
                      alt={`${expert.firstName} ${expert.lastName}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    {isExpertOnline?.(expert._id) && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {expert.firstName} {expert.lastName}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isExpertOnline?.(expert._id) 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {isExpertOnline?.(expert._id) ? "Online" : "Offline"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{expert.specialization || "Expert"}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="w-full md:w-3/4">
        {selectedExpert ? (
          <div className="h-[650px] bg-white rounded-xl shadow-lg flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg shadow-sm">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={selectedExpert.photoFile || "/expert-avatar.png"}
                    alt={`${selectedExpert.firstName} ${selectedExpert.lastName}`}
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-200"
                  />
                  {isExpertOnline?.(selectedExpert._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {selectedExpert.firstName} {selectedExpert.lastName}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <span className="mr-2">{selectedExpert.specialization || "Expert"}</span>
                    <span className={`w-2 h-2 rounded-full inline-block mr-1 ${isExpertOnline?.(selectedExpert._id) ? "bg-green-500" : "bg-gray-400"}`}></span>
                    <span>{isExpertOnline?.(selectedExpert._id) ? "Online" : "Offline"}</span>
                  </p>
                </div>
              </div>
              <div>
                <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" 
              ref={messagesContainerRef}
              style={{ scrollBehavior: 'smooth' }}
            >
              {isMessagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading messages...</p>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-center">No messages yet</p>
                  <p className="text-sm text-center text-gray-400 mt-1">Start a conversation with {selectedExpert.firstName}</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${msg.senderId === loggedInExpert._id ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex flex-col max-w-[75%]">
                      <div
                        className={`relative px-4 py-3 rounded-lg shadow-sm ${
                          msg.senderId === loggedInExpert._id
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-800 border border-gray-200"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                        
                        {msg.senderId === loggedInExpert._id && (
                          <div className="absolute top-1 right-1" ref={showMenu === msg._id ? menuRef : null}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(showMenu === msg._id ? null : msg._id);
                              }}
                              className="p-1 text-white opacity-80 hover:opacity-100 rounded-full"
                            >
                              <FaEllipsisV size={14} />
                            </button>
                            
                            {showMenu === msg._id && (
                              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200 py-1">
                                <button
                                  onClick={() => setEditingMessage(msg)}
                                  className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
                                >
                                  <FaEdit className="mr-2 text-gray-600" /> Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(msg._id)}
                                  disabled={isDeleting}
                                  className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600"
                                >
                                  {isDeleting ? (
                                    <>
                                      <div className="w-3 h-3 mr-3 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                                      Deleting...
                                    </>
                                  ) : (
                                    <>
                                      <FaTrash className="mr-2" /> Delete
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <span className={`text-xs text-gray-500 mt-1 ${
                        msg.senderId === loggedInExpert._id ? "text-right mr-2" : "ml-2"
                      }`}>
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendExpertMessage} className="border-t p-4">
              <div className="flex items-center bg-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-blue-300 px-1">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder={`Message ${selectedExpert.firstName}...`}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 p-3 bg-transparent outline-none"
                />
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className={`p-2 rounded-lg ${
                    text.trim() 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } transition-colors mx-1`}
                >
                  <FaRegPaperPlane size={18} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="h-[650px] bg-white rounded-xl shadow-lg flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <div className="bg-blue-50 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Communication</h3>
              <p className="text-gray-600 mb-6">Select an expert from the list to start a professional conversation.</p>
              <p className="text-sm text-gray-500">Collaborate on cases and share expertise with professionals in your network.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertChatComponent;