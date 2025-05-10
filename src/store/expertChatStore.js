import { create } from "zustand";
import axios from "axios";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8080";
export const useExpertChatStore = create((set, get) => ({
  messages: [],
  experts: [],
  selectedExpert: null,
  isExpertsLoading: false,
  isMessagesLoading: false,
  socket: null,
  onlineExperts: [],
  loggedInExpert: null,
  processedMessageIds: new Set(),
  deletedMessages: new Set(),

  // Check if expert is online
  isExpertOnline: (expertId) => {
    return get().onlineExperts.includes(expertId);
  },

  // Only use expertToken
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

  // Fetch list of experts for chat
  getExperts: async () => {
    set({ isExpertsLoading: true });
    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access or invalid path");
      }

      const response = await axios.get(`${BASE_URL}/api/message/expert`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ experts: response.data });
      await get().getLoggedInExpert();
      console.log("Experts Data:", response.data);
    } catch (error) {
      console.error("Fetch experts error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      set({ isExpertsLoading: false });
    }
  },

  // get all messages
  getExpertMessages: async (receiverExpertId) => {
    if (!receiverExpertId) return;

    set({ isMessagesLoading: true, messages: [] }); // Reset messages before loading new conversation

    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access or missing token");
      }

      const response = await axios.get(
        `${BASE_URL}/api/message/expert-messages/get/${receiverExpertId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const messages = response.data?.messages || [];

      // Generate unique message IDs for tracking
      const newProcessedIds = new Set();
      messages.forEach((msg) => {
        const messageId =
          msg._id ||
          `${msg.senderId}-${msg.text}-${new Date(msg.time).getTime()}`;
        newProcessedIds.add(messageId);
      });

      set({
        messages,
        processedMessageIds: newProcessedIds,
        deletedMessages: new Set(), // Reset for new conversation
      });

      console.log("Expert Chat Messages:", messages);
    } catch (error) {
      console.error("Expert-to-expert chat error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load expert messages"
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send message to expert
  sendExpertMessage: async (text) => {
    const { messages, loggedInExpert, selectedExpert, socket } = get();

    // Check if expert is selected
    if (!selectedExpert || !selectedExpert._id) {
      console.error("No expert selected or expert ID is missing");
      toast.error("Please select an expert to chat with");
      return;
    }

    // Check if logged-in expert exists
    if (!loggedInExpert || !loggedInExpert._id) {
      console.error("Logged-in expert not found or missing ID");
      toast.error("Authentication error. Please log in again.");
      return;
    }

    // Check if text is valid
    if (!text || !text.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const newMessage = {
      _id: tempId,
      senderId: loggedInExpert._id,
      receiverId: selectedExpert._id,
      text: text.trim(),
      time: new Date(),
      isPending: true,
    };

    // Optimistic UI update (show message immediately)
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    try {
      const token = get().getAuthToken();

      if (!token) {
        throw new Error("Unauthorized access");
      }

      const response = await axios.post(
        `${BASE_URL}/api/message/expert-messages/send/${selectedExpert._id}`,
        { text: text.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Expert message sent:", response.data);

      // Replace the temp message with real one from server
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempId ? { ...response.data, isPending: false } : msg
        ),
        processedMessageIds: new Set([
          ...state.processedMessageIds,
          response.data._id,
        ]),
      }));

      // Send message via socket for real-time delivery
      if (socket) {
        socket.emit("sendExpertMessage", {
          ...response.data,
          senderId: loggedInExpert._id,
          receiverId: selectedExpert._id,
        });
      }

      return response.data;
    } catch (error) {
      console.error("Error sending expert message:", error);

      // Remove the optimistic message if sending failed
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));

      toast.error(
        error?.response?.data?.message || "Failed to send expert message"
      );
    }
  },

  // FIXED: delete expert message single
  deleteExpertMessage: async (messageId) => {
    try {
      const token = get().getAuthToken();
      if (!token) {
        toast.error("Authentication error");
        return;
      }

      console.log(`Attempting to delete expert message: ${messageId}`);

      // Find the message
      const message = get().messages.find((msg) => msg._id === messageId);

      if (!message) {
        console.log(`Message ${messageId} not found in store`);
        toast.error("Message not found");
        return;
      }

      // Optimistic update: remove from UI first
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== messageId),
        deletedMessages: new Set([...state.deletedMessages, messageId]),
      }));

      // Make the API call with messageID (uppercase ID as expected by backend)
      const response = await axios.delete(
        `${BASE_URL}/api/message/expert-message/delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { messageID: messageId }, // Use messageID for the API request as expected by backend
        }
      );

      console.log("Delete expert message response:", response.data);
      
      if (response.data.success) {
        toast.success("Message deleted");
        
        // Emit the delete event to ensure it's processed if socket events fail
        const { socket, loggedInExpert, selectedExpert } = get();
        if (socket && socket.connected && loggedInExpert && selectedExpert) {
          socket.emit("expertMessageDeleted", {
            messageId: messageId, // Use camelCase for socket events
            senderId: loggedInExpert._id,
            receiverId: selectedExpert._id
          });
        }
      } else if (response.data.alreadyDeleted) {
        toast.info("Message already deleted");
      } else {
        throw new Error(response.data.message || "Failed to delete message");
      }
      
      return response.data;
    } catch (error) {
      console.error("Delete expert message error:", error);

      // Log more detailed information about the error for debugging
      if (error.response) {
        console.error(
          `Status: ${error.response.status}, Data:`,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      }

      // Handle already deleted messages
      if (error.response?.data?.alreadyDeleted) {
        console.log("Expert message already deleted");
        toast.info("Message already deleted");
        return;
      }

      // If deletion fails, restore the message in UI
      const messageToRestore = get().messages.find(
        (msg) => msg._id === messageId
      );
      if (messageToRestore) {
        set((state) => ({
          messages: [...state.messages, messageToRestore],
          deletedMessages: new Set(
            [...state.deletedMessages].filter((id) => id !== messageId)
          ),
        }));
      }

      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  getLoggedInExpert: async () => {
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

      set({ loggedInExpert: response.data });
      console.log("Logged In Expert:", response.data);

      // Connect socket after getting expert info
      if (response.data && response.data._id) {
        get().connectExpertSocket();
      }
    } catch (error) {
      console.error("Fetch logged-in expert error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  // FIXED: Subscribe to expert messages with improved event handling
  subscribeToExpertMessages: () => {
    const { socket, loggedInExpert } = get();

    if (!socket || !loggedInExpert) {
      console.warn("Cannot subscribe to expert messages: missing socket or expert info");
      return;
    }

    // Clean up previous listeners to avoid duplicate handling
    socket.off("newExpertMessage");
    socket.off("expertMessageEdited");
    socket.off("expertMessageDeleted");
    socket.off("allExpertMessagesDeleted");
    socket.off("conversationDeleted");

    // Handle new expert-to-expert message
    socket.on("newExpertMessage", (newMessage) => {
      console.log("New expert message received:", newMessage);

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
          console.log("Skipping duplicate expert message:", messageId);
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

        // Check if message is relevant to current expert conversation
        const { selectedExpert } = get();
        if (
          !selectedExpert ||
          (newMessage.senderId !== selectedExpert._id &&
            newMessage.receiverId !== selectedExpert._id)
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

    // Handle edited expert messages
    socket.on("expertMessageEdited", (updatedMessage) => {
      console.log("Received expertMessageEdited event:", updatedMessage);
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === updatedMessage._id
            ? { ...updatedMessage, isEdited: true }
            : msg
        ),
      }));
    });

    // FIXED: Handle deleted expert messages with improved event handling
    socket.on("expertMessageDeleted", (data) => {
      console.log("Expert message deleted event received:", data);
      
      // Use messageId consistently (camelCase) - match what's sent from server
      const messageId = data.messageId;
      
      if (!messageId) {
        console.error("Missing message ID in deletion event");
        return;
      }
      
      console.log(`Processing delete for expert message: ${messageId}`);
      
      // Check if message exists in current messages
      const messageExists = get().messages.some(msg => msg._id === messageId);
      console.log(`Message ${messageId} exists in store: ${messageExists}`);
      
      // Check if message is already marked as deleted
      if (get().deletedMessages.has(messageId)) {
        console.log(`Message ${messageId} already marked as deleted locally, skipping`);
        return;
      }
      
      // Remove the message from the state
      set((state) => ({
        messages: state.messages.filter(msg => msg._id !== messageId),
        deletedMessages: new Set([...state.deletedMessages, messageId])
      }));
      
      console.log(`Message ${messageId} removed from state`);
    });

    // Handle all expert messages deleted for a conversation
    socket.on("allExpertMessagesDeleted", (data) => {
      console.log("All expert messages deleted received:", data);

      const { selectedExpert, loggedInExpert } = get();

      // Check if this deletion event applies to current expert conversation
      if (!selectedExpert || !loggedInExpert) return;

      const isCurrentConversation =
        (data.senderID === loggedInExpert._id &&
          data.receiverID === selectedExpert._id) ||
        (data.senderID === selectedExpert._id &&
          data.receiverID === loggedInExpert._id);

      if (isCurrentConversation) {
        set({
          messages: [],
          expertConversationFiles: [],
          deletedMessages: new Set(), // Reset deletion tracking for new conversation
        });
      }
    });
    
    console.log("✅ Expert message event handlers registered");
  },
  
  // Connect socket for expert chat
  connectExpertSocket: () => {
    try {
      const { loggedInExpert } = get();
      if (!loggedInExpert || !loggedInExpert._id) {
        console.error(
          "Cannot connect expert socket: Expert information missing"
        );
        return;
      }

      // Clean up existing socket connection
      if (get().socket) {
        get().socket.disconnect();
      }

      // Create new socket connection
      const socket = io(BASE_URL, {
        query: {
          expertId: loggedInExpert._id,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on("connect", () => {
        console.log("✅ Expert socket connected with ID:", socket.id);

        // Handle list of online experts
        socket.on("getOnlineExperts", (experts) => {
          console.log("Online experts updated:", experts);
          set({ onlineExperts: experts });
        });

        // Subscribe to message events specific to expert chat
        get().subscribeToExpertMessages();
      });

      socket.on("connect_error", (error) => {
        console.error("Expert socket connection error:", error);
        toast.error("Chat connection failed. Try reloading.");
      });

      socket.on("disconnect", (reason) => {
        console.log("Expert socket disconnected. Reason:", reason);
      });

      socket.on("reconnect", (attemptNumber) => {
        console.log(`Socket reconnected after ${attemptNumber} attempts`);
        get().subscribeToExpertMessages(); // Re-subscribe after reconnection
      });

      set({ socket });
    } catch (error) {
      console.error("Expert socket connection error:", error);
      toast.error("Failed to connect expert chat");
    }
  },

  // disconnect socket for expert chat
  disconnectExpertSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      console.log("🔌 Expert socket disconnected");
      set({ socket: null });
    }
  },

  // FIXED: Updated to refresh socket subscription when selecting a different expert
  selectExpert: (expert) => {
    const previousExpert = get().selectedExpert;
    
    // Only update if actually changing experts
    if (!previousExpert || previousExpert._id !== expert._id) {
      console.log(`Selecting expert: ${expert.name || expert._id}`);
      set({ 
        selectedExpert: expert,
        messages: [], // Clear messages when changing experts
        deletedMessages: new Set() // Reset deleted message tracking
      });
      
      // Get messages for the newly selected expert
      get().getExpertMessages(expert._id);
      
      // Re-subscribe to messages to ensure events are handled for the new conversation
      const { socket } = get();
      if (socket && socket.connected) {
        get().subscribeToExpertMessages();
      }
    }
  },
}));