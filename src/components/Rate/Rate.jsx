import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Rate = ({ booking, setShowRateComponent }) => {
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState('');
  const [starSize, setStarSize] = useState(50);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("expertToken") || localStorage.getItem("userToken");
    if (!token) {
      toast.error("Token is required");
      return;
    }

    if (!booking || !booking._id) {
      toast.error("Invalid booking object");
      return;
    }

    // Determine session type and IDs safely
    const isExpertToExpert = booking?.consultingExpertID !== undefined;

    const expertId = isExpertToExpert
      ? booking?.consultingExpertID?._id
      : booking?.expertId?._id;

    const raterId = isExpertToExpert
      ? booking?.expertId?._id
      : booking?.userId?._id;

    const sessionType = isExpertToExpert ? "expert-to-expert" : "user-to-expert";

    
    const raterType = isExpertToExpert ? "Expert" : "User"; // 🎯 ADD THIS!

    console.log("Submitting Rating:", {
      expertId,
      raterId,
      sessionType,
      rating,
      comment,
      raterType,
    });

   

    try {
      await axios.post(
        "https://amd.code4bharat.com/api/ratings/",
        {
          expertId,
          raterId,
          sessionType,
          rating,
          comment,
          raterType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     await axios.put(
  `https://amd.code4bharat.com/api/ratings/update-status/${booking._id}`,
  {
    status: 'Rating Submitted',
    sessionType: isExpertToExpert ? 'expert-to-expert' : 'user-to-expert',
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      toast.success("Rating submitted successfully");
      setShowRateComponent(false);
      window.location.reload();
    } catch (err) {
      console.error("Error submitting rating:", err);
      if (err.response) {
        toast.error(`Error: ${err.response.data.message || "Failed to submit rating"}`);
        console.log(err.response.data)
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
        {/* Star Rating */}
        <div className="flex justify-center mb-6">
          <Box sx={{ '& > legend': { mt: 2 } }}>
            <Rating
              name="simple-controlled"
              value={rating}
              size="large"
              onChange={(event, newValue) => setRating(newValue)}
              sx={{
                fontSize: `${starSize}px`,
              }}
            />
          </Box>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Your Feedback</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            rows="6"
            placeholder="How was your experience with our consultant?"
          ></textarea>
        </div>

        {/* Submit */}
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
