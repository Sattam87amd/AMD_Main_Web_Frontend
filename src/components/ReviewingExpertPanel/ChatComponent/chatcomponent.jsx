"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaRegPaperPlane, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { useChatStore } from "@/store/useChatStore.js";

const ChatComponent = () => {
  const [text, setText] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const router = useRouter();
  const messagesContainerRef = useRef(null);
  const menuRef = useRef(null);

  // Updated to use the correct function name 'selectUser' instead of 'setSelectedUser'
  const {
    getUsers,
    users,
    selectedUser,
    selectUser, // Changed from setSelectedUser to selectUser
    isUsersLoading,
    logginUser,
    onlineUsers,
    isUserOnline, // Using the utility function from the store
  } = useChatStore();

  const {
    messages,
    getMessages,
    isMessagesLoading,
    sendMessage,
    deleteMessage,
    editMessage,
    deleteAllMessages,
    subscribeToMessages,
  } = useChatStore();
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

  // Scroll to bottom of messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get users on component mount
  useEffect(() => {
    getUsers();

    // No need for cleanup as there's no unsubscribeFromMessages function
    // The cleanup is now handled by the socket disconnect
  }, []);

  // Handle user selection and message subscription
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      setEditingMessage(null); // Clear editing state when changing users
    }
  }, [selectedUser?._id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingMessage) {
      // Handle edit message submission
      try {
        await editMessage(editingMessage._id, text.trim());
        setEditingMessage(null);
        setText("");
      } catch (error) {
        console.error("Failed to edit message:", error);
      }
    } else {
      // Handle new message submission
      try {
        await sendMessage({ text: text.trim() });
        setText("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setShowMenu(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const handleEditClick = (message) => {
    setEditingMessage(message);
    setText(message.text);
    setShowMenu(null);
  };

  const handleClearEditState = () => {
    setEditingMessage(null);
    setText("");
  };

  const handleDeleteAllMessages = async () => {
    setShowDeleteConfirm(true); // open modal instead of using confirm()
  };
  const confirmDeleteAllMessages = async () => {
    try {
      await deleteAllMessages();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  // We can use the isUserOnline function from the store directly
  // Or keep this implementation if you prefer

  if (isUsersLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading users...
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row h-auto bg-gray-200 p-5 gap-4">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 space-y-5">
        <div className="p-5 bg-white shadow-lg rounded-lg">
          <p className="text-sm text-gray-600">
            To be considered for verification, you need to do the following: Add
            your booking link to two or more of the following bios: Instagram,
            LinkedIn, Twitter, or TikTok.
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={getUsers}
          >
            Chat with Users
          </button>
        </div>

        <div className="p-4 overflow-y-auto bg-white shadow-lg rounded-lg h-[400px]">
          {users.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No users found</div>
          ) : (
            users.map((user) => (
              <motion.div
                key={user._id}
                whileHover={{ scale: 1.05 }}
                onClick={() => selectUser(user)}
                className={`flex items-center gap-3 p-3 mb-3 rounded-lg cursor-pointer ${
                  selectedUser?._id === user._id
                    ? "border-2 border-blue-500 bg-gray-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div className="relative">
                  <img
                    src={user.photoFile || "/avatar.png"}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {isUserOnline(user._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <span className="text-sm font-semibold">
                  {user.firstName} {user.lastName}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="w-full md:w-3/4 p-2">
        {selectedUser ? (
          <div className="h-[600px] bg-gray-100 rounded-xl shadow-lg p-4 flex flex-col justify-between">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg shadow-sm">
              <div className="flex items-center">
                <img
                  src={selectedUser.photoFile || "/avatar.png"}
                  alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="font-medium text-lg">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isUserOnline(selectedUser._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              {/* Delete All Messages Button */}
              <button
                onClick={handleDeleteAllMessages}
                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                title="Delete entire conversation"
              >
                <MdDeleteSweep size={22} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="overflow-y-auto flex-1 py-6 px-4"
              ref={messagesContainerRef}
            >
              {isMessagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <p>Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={msg._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex mb-5 ${
                      msg.senderId === logginUser?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="relative group">
                      <div
                        className={`p-4 max-w-xs md:max-w-sm rounded-2xl ${
                          msg.senderId === logginUser?._id
                            ? "bg-blue-500 text-white rounded-tr-none"
                            : "bg-white rounded-tl-none shadow-md"
                        }`}
                      >
                        <p className="text-sm mb-1">{msg.text}</p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs ${
                              msg.senderId === logginUser?._id
                                ? "text-blue-100"
                                : "text-gray-400"
                            }`}
                          >
                            {new Date(msg.time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {msg.isEdited && (
                              <span className="ml-1 italic">(edited)</span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Message Options - Only show for user's messages */}
                      {msg.senderId === logginUser?._id && (
                        <div className="absolute top-0 right-0 -mr-2 -mt-2">
                          <button
                            onClick={() => setShowMenu(msg._id)}
                            className="p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaEllipsisV size={14} className="text-gray-600" />
                          </button>

                          {/* Dropdown Menu */}
                          {showMenu === msg._id && (
                            <div
                              ref={menuRef}
                              className="absolute right-0 mt-1 bg-white rounded-md shadow-lg z-10 py-1 min-w-[120px]"
                            >
                              <button
                                onClick={() => handleEditClick(msg)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                              >
                                <FaEdit className="mr-2" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(msg._id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                              >
                                <FaTrash className="mr-2" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="flex flex-col mt-2 pb-2"
            >
              {editingMessage && (
                <div className="bg-yellow-50 p-3 mb-3 rounded-lg flex justify-between items-center border border-yellow-200">
                  <span className="text-sm text-gray-600">Editing message</span>
                  <button
                    type="button"
                    onClick={handleClearEditState}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="flex items-center border rounded-lg p-2 bg-white shadow-md">
                <input
                  type="text"
                  placeholder={
                    editingMessage
                      ? "Edit your message..."
                      : "Type Something..."
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 bg-transparent outline-none p-3 text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  disabled={!text.trim() || !selectedUser}
                >
                  <FaRegPaperPlane size={18} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="h-[600px] bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-500">
            Select a user to start chatting.
          </div>
        )}
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Delete Conversation?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete all messages with{" "}
              {selectedUser?.firstName}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAllMessages}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
