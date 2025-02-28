"use client";
import { useState } from "react";
import Image from "next/image";

const initialReviews = [
  {
    id: 1,
    name: "Cameron Williamson",
    role: "Owner of UI/UX Inc",
    review:
      "A seamless experience from start to finish. Impressed by professionalism and attention to detail. Highly recommend! The team was very supportive throughout the entire process, making it a hassle-free experience, The whole process was smooth, and the results were fantastic!",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&crop=faces&fit=crop&w=100&h=100&q=80",
  },
  {
    id: 2,
    name: "Esther Howard",
    role: "Owner of UI/UX Inc",
    review:
      "Highly recommend! Great attention to detail and professionalism. The workflow was smooth, and I loved the final outcome.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&crop=faces&fit=crop&w=100&h=100&q=80",
  },
  {
    id: 3,
    name: "Cameron Williamson",
    role: "Owner of UI/UX Inc",
    review: "One of the best experiences I've had. The quality of work is fantastic!",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&crop=faces&fit=crop&w=100&h=100&q=80",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    role: "Owner of UI/UX Inc",
    review:
      "Excellent service! Great attention to detail and high-quality work. I will definitely be working with them again in the future.",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&crop=faces&fit=crop&w=100&h=100&q=80",
  },
  {
    id: 5,
    name: "Sarah Brown",
    role: "Owner of UI/UX Inc",
    review: "The team was very professional, and the entire process was smooth. Would highly recommend!",
    image:
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-1.2.1&auto=format&crop=faces&fit=crop&w=100&h=100&q=80",
  },
  {
    id: 6,
    name: "Michael Smith",
    role: "CEO of TechCorp",
    review:
      "Outstanding service and attention to detail. The whole process was smooth, and the results were fantastic!",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&crop=faces&fit=crop&w=100&h=100&q=80",
  },
  {
    id: 7,
    name: "Jessica Taylor",
    role: "Product Manager at UXWorld",
    review:
      "One of the best experiences I've had. The quality of work is top-notch. I will definitely come back for more!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&crop=faces&fit=crop&w=100&h=100&q=80",
  },
  
];

function AboutMeReviews() {
  const [reviews] = useState(initialReviews);
  const [selectedReview, setSelectedReview] = useState(null);
  const charLimit = 100;

  return (
    <div className="bg-[#EDECE8] pb-20">
      {/* ✅ Section Header ✅ */}
      <div className="bg-[#F8F7F3] py-10 px-4 md:px-10 my-5">
        <h2 className="text-3xl md:text-[44px] font-semibold text-center mb-6">Reviews</h2>
      </div>

      {/* ✅ Reviews Grid ✅ */}
      <div className="overflow-x-auto pb-8 md:overflow-hidden">
        <div className="flex md:flex-wrap md:justify-center gap-4 min-w-max md:min-w-full">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white text-black p-6 rounded-3xl shadow-lg flex-shrink-0 w-[300px] md:w-[350px] h-auto flex flex-col justify-between"
            >
              <ReviewCard
                review={review}
                onReadMore={() => setSelectedReview(review)}
                charLimit={charLimit}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Review Popup (Modal) ✅ */}
      {selectedReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full mx-4">
            {/* Close Button inside the card for better UI */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-black p-2 rounded-full text-sm transition"
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold mb-3">Full Review</h2>
            <p className="text-lg text-gray-800 mb-4">{selectedReview.review}</p>
            <div className="flex items-center space-x-4">
              <Image
                src={selectedReview.image}
                alt={selectedReview.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold">{selectedReview.name}</h4>
                <p className="text-sm text-gray-600">{selectedReview.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🔹 Review Card Component */
const ReviewCard = ({ review, onReadMore, charLimit }) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex-grow">
        {/* ⭐ Rating Stars */}
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-yellow-500">
              <path d="M12 2l2.39 7.26h7.61l-6.15 4.47 2.39 7.27-6.15-4.48-6.15 4.48 2.39-7.27-6.15-4.47h7.61L12 2z" />
            </svg>
          ))}
        </div>

        {/* ✅ Display review with "Read More" only if needed ✅ */}
        <p className="text-lg mb-2">
          {review.review.length > charLimit ? review.review.slice(0, charLimit) + "..." : review.review}
        </p>

        {review.review.length > charLimit && (
          <button onClick={onReadMore} className="text-blue-600 underline text-sm">
            Read More
          </button>
        )}
      </div>

      {/* 👤 Always Visible User Info */}
      <div className="flex items-center space-x-4 mt-4">
        <Image
          src={review.image}
          alt={review.name}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />
        <div>
          <h4 className="text-lg font-semibold">{review.name}</h4>
          <p className="text-sm text-gray-600">{review.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMeReviews;
