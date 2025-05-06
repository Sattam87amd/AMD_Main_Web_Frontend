// Frontend Zustand Store Fixes
// Fix real-time message sync, deletion tracking and event handling

import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8080";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  socket: null,
  onlineUsers: [],
  logginUser: null,
  processedMessageIds: new Set(),
  // Track deleted message IDs to prevent editing/viewing deleted messages
  deletedMessages: new Set(),

  // Add isUserOnline function to check if a user is online
  isUserOnline: (userId) => {
    return get().onlineUsers.includes(userId);
  },

  // Helper function to get authentication token
  getAuthToken: () => {
    const urlPath = window.location.pathname;
    let token = "";

    // Check for expert token and path
    if (
      localStorage.getItem("expertToken") &&
      urlPath.startsWith("/expertpanel")
    ) {
      token = localStorage.getItem("expertToken");
    }

    // Check for user token and path
    if (
      !token &&
      localStorage.getItem("userToken") &&
      urlPath.startsWith("/userpanel")
    ) {
      token = localStorage.getItem("userToken");
    }

    return token;
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access or invalid path");
      }

      const response = await axios.get(`${BASE_URL}/api/message/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ users: response.data });
      await get().getLogginUser();
      console.log("Users Data:", response.data);
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) return;

    set({ isMessagesLoading: true, messages: [] }); // Clear messages when loading new ones
    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access or invalid path");
      }

      const response = await axios.get(`${BASE_URL}/api/message/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const messages = response.data?.messages || [];

      // Create a new Set of processed message IDs from the fetched messages
      const newProcessedIds = new Set();
      messages.forEach((msg) => {
        const messageId =
          msg._id ||
          `${msg.senderId}-${msg.text}-${new Date(msg.time).getTime()}`;
        newProcessedIds.add(messageId);
      });

      set({
        messages: messages,
        processedMessageIds: newProcessedIds, // Reset processed IDs when loading new conversation
        deletedMessages: new Set(), // Reset deleted messages for new conversation
      });

      console.log("Message Data:", response.data);
    } catch (error) {
      console.error("Fetch messages error:", error);
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getLogginUser: async () => {
    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access or invalid path");
      }

      const response = await axios.get(`${BASE_URL}/api/message/logginuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ logginUser: response.data });
      console.log("Logged In User:", response.data);

      // Connect socket after getting user info
      if (response.data && response.data._id) {
        get().connectSocket();
      }
    } catch (error) {
      console.error("Fetch logged in user error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages, socket, logginUser } = get();

    if (!selectedUser || !selectedUser._id) {
      console.error("No user selected or user ID is missing");
      toast.error("Please select a user to chat with");
      return;
    }

    if (!messageData.text.trim()) {
      return;
    }

    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access or invalid path");
      }

      const res = await axios.post(
        `${BASE_URL}/api/message/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create a new message object with the server response data
      const newMessage = {
        ...res.data,
        _id: res.data._id || `temp-${Date.now()}`, // Ensure there's an ID to track this message
        senderId: logginUser._id,
        receiverId: selectedUser._id, // FIXED: Use receiverId consistently
        time: res.data.time || new Date(),
      };

      // Update local messages immediately
      set({ messages: [...messages, newMessage] });

      // Add to processed IDs to prevent duplicates
      set((state) => ({
        processedMessageIds: new Set([
          ...state.processedMessageIds,
          newMessage._id,
        ]),
      }));

      console.log("Message sent:", newMessage);
    } catch (error) {
      if (error.response) {
        console.error("API Response Error:", error.response.data);
        toast.error(
          `Error: ${error.response.data.message || "Failed to send message"}`
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong while sending message");
      }
    }
  },

  deleteMessage: async (messageId) => {
    try {
      const token = get().getAuthToken();
      if (!token) {
        toast.error("Authentication error");
        return;
      }

      console.log(`Deleting message: ${messageId}`);

      // Optimistic update
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
        deletedMessages: new Set([...state.deletedMessages, messageId]),
      }));

      // Send deletion request
      const response = await axios.delete(`${BASE_URL}/api/message/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { messageID: messageId },
      });

      console.log("Delete response:", response.data);
      toast.success("Message deleted");
      return response.data;
    } catch (error) {
      console.error("Delete message error:", error);

      // Return early if the response indicates the message was already deleted
      if (error.response?.data?.alreadyDeleted) {
        console.log("Message already deleted");
        toast.info("Message already deleted");
        return;
      }

      // Don't restore message in UI - it's been deleted server-side
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },
  // FRONTEND: Update Zustand handler to work with new response format
  editMessage: async (messageId, newText) => {
    // First check if the message has been deleted locally
    const { deletedMessages, messages } = get();

    if (deletedMessages.has(messageId)) {
      console.error("Cannot edit a deleted message");
      toast.error("This message has been deleted and cannot be edited");
      return;
    }

    // Also check if message exists in current messages
    const messageExists = messages.some((msg) => msg._id === messageId);
    if (!messageExists) {
      console.error("Cannot edit: Message not found in current conversation");
      toast.error("Cannot edit this message");
      return;
    }

    // Optimistically update the message in the UI first
    const originalMessages = [...messages];
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg._id === messageId
          ? {
              ...msg,
              text: newText,
              isEdited: true,
              editedAt: new Date(),
            }
          : msg
      ),
    }));

    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access or invalid path");
      }

      console.log("Sending edit request for message:", messageId);

      const response = await axios.put(
        `${BASE_URL}/api/message/edit`,
        { messageID: messageId, newText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the request was successful based on the success flag
      if (response.data.success === false) {
        throw new Error(response.data.message || "Failed to edit message");
      }

      console.log("Edit message response:", response.data);
      toast.success("Message updated");
      return response.data;
    } catch (error) {
      console.error("Edit message error:", error.message);

      // Don't check for 404 specifically, handle any error
      set({ messages: originalMessages });
      toast.error(error?.message || "Failed to edit message");
    }
  },

  // FIXED: Delete all messages with improved error handling
  deleteAllMessages: async () => {
    const { selectedUser, logginUser } = get();

    if (!selectedUser || !logginUser) {
      console.error("No user selected or not logged in");
      toast.error("Please select a user to delete conversation");
      return;
    }

    // Save current messages for potential rollback
    const originalMessages = [...get().messages];

    // Optimistically clear messages
    set({
      messages: [],
      deletedMessages: new Set(), // Reset deletion tracking
    });

    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access or invalid path");
      }

      const response = await axios.delete(
        `${BASE_URL}/api/message/deleteallmessage`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            senderID: logginUser._id,
            reciverID: selectedUser._id, // Note: using reciverID to match backend (keep this as is)
          },
        }
      );

      toast.success("Conversation deleted");
      return response.data;
    } catch (error) {
      console.error("Delete all messages error:", error);

      // Restore messages on error, unless it's a "already deleted" response
      if (
        error.response &&
        error.response.data &&
        error.response.data.alreadyDeleted
      ) {
        toast("Conversation already deleted");
      } else {
        // Restore messages
        set({ messages: originalMessages });
        toast.error(
          error?.response?.data?.message || "Failed to delete conversation"
        );
      }
    }
  },

  subscribeToMessages: () => {
    const { socket, logginUser } = get();

    if (!socket || !logginUser) return;

    // Clean up previous listeners
    socket.off("newMessage");
    socket.off("messageEdited");
    socket.off("messageDeleted");
    socket.off("allMessagesDeleted");
    socket.off("conversationDeleted");

    // FIXED: Handle new messages with better duplicate prevention
    socket.on("newMessage", (newMessage) => {
      console.log("New message received:", newMessage);

      // Generate a unique identifier for this message
      const messageId =
        newMessage._id ||
        `${newMessage.senderId}-${newMessage.text}-${new Date(
          newMessage.time
        ).getTime()}`;

      set((state) => {
        // Check if we've already processed this message
        const processedIds = state.processedMessageIds;
        if (processedIds.has(messageId)) {
          console.log("Skipping duplicate message:", messageId);
          return state; // Don't modify state if already processed
        }

        // Check if this message already exists in the messages array
        const messageExists = state.messages.some(
          (msg) =>
            (msg._id && msg._id === newMessage._id) || // Same ID
            (msg.senderId === newMessage.senderId && // Or same content/timestamps
              msg.text === newMessage.text &&
              Math.abs(new Date(msg.time) - new Date(newMessage.time)) < 5000)
        );

        if (messageExists) {
          // Just mark as processed but don't add again
          return {
            ...state,
            processedMessageIds: new Set([...processedIds, messageId]),
          };
        }

        // Check if message is relevant to current conversation
        const { selectedUser } = get();
        if (
          !selectedUser ||
          (newMessage.senderId !== selectedUser._id &&
            newMessage.receiverId !== selectedUser._id)
        ) {
          // Message not for current conversation, only track the ID
          return {
            ...state,
            processedMessageIds: new Set([...processedIds, messageId]),
          };
        }

        // Add to processed set and update messages
        return {
          messages: [...state.messages, newMessage],
          processedMessageIds: new Set([...processedIds, messageId]),
        };
      });
    });

    // FRONTEND: Update the socket event handler to improve real-time updates
    socket.on("messageEdited", (editedMessage) => {
      console.log("Message edited received via socket:", editedMessage);

      set((state) => {
        // Check if this message exists in our current messages
        const messageExists = state.messages.some(
          (msg) => msg._id === editedMessage._id
        );

        if (!messageExists) {
          console.log(
            "Message not in current conversation - ignoring socket update:",
            editedMessage._id
          );
          return state;
        }

        // Check if this message has been deleted locally
        if (state.deletedMessages.has(editedMessage._id)) {
          console.log(
            "Ignoring edit for locally deleted message:",
            editedMessage._id
          );
          return state;
        }

        console.log("Updating message in state via socket event");

        return {
          messages: state.messages.map((msg) =>
            msg._id === editedMessage._id
              ? {
                  ...msg,
                  text: editedMessage.text,
                  isEdited: true,
                  editedAt: editedMessage.editedAt || new Date(),
                }
              : msg
          ),
        };
      });
    });
    // FIXED: Handle deleted messages with consistent property names
    // In your Zustand store socket setup
    socket.on("messageDeleted", (data) => {
      console.log("Message deleted event received:", data);

      // Handle case inconsistency
      const messageId = data.messageID || data.messageId;

      if (!messageId) {
        console.error("Missing message ID in deletion event");
        return;
      }

      // Separate log messages to identify exact issue
      console.log(`Processing delete for message: ${messageId}`);
      console.log(
        `Current messages:`,
        get().messages.map((m) => m._id)
      );

      set((state) => {
        // Find if message exists in current conversation
        const messageToDelete = state.messages.find(
          (msg) => msg._id === messageId
        );

        if (!messageToDelete) {
          console.log(`Message ${messageId} not found in current messages`);
          return state; // No change
        }

        console.log(`Found message to delete:`, messageToDelete);

        // Remove the message and update deleted set
        return {
          messages: state.messages.filter((msg) => msg._id !== messageId),
          deletedMessages: new Set([...state.deletedMessages, messageId]),
        };
      });
    });

    // FIXED: Handle all messages deleted for a conversation
    socket.on("allMessagesDeleted", (data) => {
      console.log("All messages deleted received:", data);

      const { selectedUser, logginUser } = get();

      // Check if this deletion event applies to current conversation
      if (!selectedUser || !logginUser) return;

      const isCurrentConversation =
        (data.senderID === logginUser._id &&
          data.reciverID === selectedUser._id) ||
        (data.senderID === selectedUser._id &&
          data.reciverID === logginUser._id);

      if (isCurrentConversation) {
        set({
          messages: [],
          deletedMessages: new Set(), // Reset deletion tracking for new conversation
        });
      }
    });
  },

  connectSocket: () => {
    try {
      const { logginUser } = get();
      if (!logginUser || !logginUser._id) {
        console.error("Cannot connect socket: User information missing");
        return;
      }

      // Clean up existing socket connection
      if (get().socket) {
        get().socket.disconnect();
      }

      // Create new socket connection
      const socket = io(BASE_URL, {
        query: {
          userId: logginUser._id,
        },
      });

      socket.on("connect", () => {
        console.log("Socket connected!");

        // Setup online user tracking
        socket.on("getOnlineUsers", (users) => {
          set({ onlineUsers: users });
        });

        // Subscribe to message-related events
        get().subscribeToMessages();
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        toast.error("Chat connection error. Please reload the page.");
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      // Store socket reference
      set({ socket });
    } catch (error) {
      console.error("Socket connection error:", error);
      toast.error("Failed to establish chat connection");
    }
  },

  // For cleaning up the socket when component unmounts
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  selectUser: (user) => {
    set({ selectedUser: user });
  },
}));
