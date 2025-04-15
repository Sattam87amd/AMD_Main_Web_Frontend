import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";  // Make sure axios is imported

const Rate = ({ booking, setShowRateComponent }) => {
  console.log("Rate component received booking:", booking);  // Log to ensure it's received

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('expertToken');
    if (!token) {
      toast.error('Token is required');
      return;
    }

    try {
      // Submit the rating
      const response = await axios.post(
        'http://localhost:5070/api/ratings/', // API for rating submission
        {
          expertId: booking.consultingExpertID._id,  // Ensure the booking object has the necessary fields
          raterId: booking.expertId._id,  // Ensure this is the correct raterId (this might be user or expert depending on your structure)
          sessionType: 'expert-to-expert',  // You can modify this based on session type
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After submitting the rating, update the status of the booking
      await axios.put(
        `http://localhost:5070/api/ratings/update-status/${booking._id}`,
        { status: 'Rating Submitted' }, // Update status to 'Rating Submitted'
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Rating submitted successfully');
      setShowRateComponent(false); // Close the modal
    } catch (err) {
      // Log the entire error to the console for debugging
      console.error("Error submitting rating:", err);

      // Handle different error types
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server Response Error: ", err.response.data);  // Log the error response data
        toast.error(`Error: ${err.response.data.message || 'Failed to submit rating'}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Request Error: ", err.request);
        toast.error("No response from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request Setup Error: ", err.message);
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className="mt-2 p-2 border rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-2 p-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default Rate;
