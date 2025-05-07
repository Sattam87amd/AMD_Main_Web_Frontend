"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reviewData = [
  { sessionId: "#01", user: "Ivan", reviews: 4.5, dateTime: "2025-02-26 10:00 AM", duration: "45 mins", feedback: "Very helpful session" },
  { sessionId: "#01", user: "Ivan", reviews: 3.5, dateTime: "2025-02-26 10:00 AM", duration: "45 mins", feedback: "Very helpful session" },
  { sessionId: "#01", user: "Ivan", reviews: 5.0, dateTime: "2025-02-26 10:00 AM", duration: "45 mins", feedback: "Very helpful session" },
  { sessionId: "#01", user: "Ivan", reviews: 4.5, dateTime: "2025-02-26 10:00 AM", duration: "45 mins", feedback: "Very helpful session" },
  { sessionId: "#01", user: "Ivan", reviews: 4.7, dateTime: "2025-02-26 10:00 AM", duration: "45 mins", feedback: "Very helpful session" },
  { sessionId: "#01", user: "Ivan", reviews: 3.9, dateTime: "2025-02-26 10:00 AM", duration: "45 mins", feedback: "Very helpful session" },
];

const ExpertReview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviewData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4 bg-white">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => router.push("/expertpanel/payments")}
          className="px-4 py-2 rounded-lg text-lg bg-gray-200 text-black hover:bg-gray-300 transition"
        >
          Payments
        </button>
        <button className="px-4 py-2 rounded-lg text-lg bg-black text-white">
          Reviews
        </button>
      </div>

      {/* Table for Desktop, Cards for Mobile */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        {/* Desktop View */}
        <div className="hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-left text-sm">
                {["SESSION ID", "USER", "REVIEWS", "DATE/TIME", "DURATION", "FEEDBACK"].map((heading) => (
                  <th key={heading} className="py-3 px-4 font-semibold tracking-wide">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((review, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-b border-gray-200 hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">{review.sessionId}</td>
                  <td className="py-3 px-4">{review.user}</td>
                  <td className="py-3 px-4">{review.reviews}</td>
                  <td className="py-3 px-4">{review.dateTime}</td>
                  <td className="py-3 px-4">{review.duration}</td>
                  <td className="py-3 px-4">{review.feedback}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden space-y-4">
          {currentItems.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <p><span className="font-semibold">Session ID:</span> {review.sessionId}</p>
              <p><span className="font-semibold">User:</span> {review.user}</p>
              <p><span className="font-semibold">Reviews:</span> {review.reviews}</p>
              <p><span className="font-semibold">Date/Time:</span> {review.dateTime}</p>
              <p><span className="font-semibold">Duration:</span> {review.duration}</p>
              <p><span className="font-semibold">Feedback:</span> {review.feedback}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className={`p-2 rounded-full border ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-200"}`}
          >
            <FaChevronLeft />
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => paginate(num)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === num ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            disabled={currentPage === 3}
            onClick={() => paginate(currentPage + 1)}
            className={`p-2 rounded-full border ${currentPage === 3 ? "cursor-not-allowed" : "hover:bg-gray-200"}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertReview;
