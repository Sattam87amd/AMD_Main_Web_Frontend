import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Rate = ({ booking, setShowRateComponent }) => {
  console.log("Rate component received booking:", booking);

  const [rating, setRating] = useState(2); // Default rating value
  const [comment, setComment] = useState('');
  const [starSize, setStarSize] = useState(50); // Control star size here (default 50)

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
        'http://localhost:5070/api/ratings/',
        {
          expertId: booking.consultingExpertID._id,  
          raterId: booking.expertId._id,  
          sessionType: 'expert-to-expert',
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}` ,
          },
        }
      );

      // Update booking status after rating submission
      await axios.put(
        `http://localhost:5070/api/ratings/update-status/${booking._id}`,
        { status: 'Rating Submitted' },
        {
          headers: {
            Authorization: `Bearer ${token}` ,
          },
        }
      );

      toast.success('Rating submitted successfully');
      setShowRateComponent(false); // Close the modal
      window.location.reload()
    } catch (err) {
      console.error("Error submitting rating:", err);
      if (err.response) {
        toast.error(`Error: ${err.response.data.message || 'Failed to submit rating'}`);
      } else if (err.request) {
        toast.error("No response from server.");
      } else {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="mt-4 p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto relative">
      {/* Close Button */}
      <IconButton
        onClick={() => setShowRateComponent(false)}
        className="absolute top-2 right-2"
      >
        <CloseIcon />
      </IconButton>

      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">We'd love your feedback!</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Material-UI Rating Component */}
        <div className="flex justify-center mb-6">
          <Box sx={{ '& > legend': { mt: 2 } }}>
            <Rating
              name="simple-controlled"
              value={rating}
              size="large"  // You can keep this if you want large size as a fallback
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              sx={{
                fontSize: `${starSize}px`,  // Adjust the size of the stars here
              }}
            />
          </Box>
        </div>

        {/* Comment Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Your Feedback</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            rows="6"  // Make the comment section a bit larger
            placeholder="How was your experience with our consultant?"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg transition duration-300 hover:bg-gray-700"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Rate;
