"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSortUp, FaSortDown } from "react-icons/fa";

const paymentsData = [
  { rating: 4.5, duration: "60 min", fee: "$100", earnings: "$80", datetime: "22/2/2025, 3:20", status: "COMPLETED" },
  { rating: 5.0, duration: "45 min", fee: "$80", earnings: "$64", datetime: "22/2/2025, 11:30", status: "COMPLETED" },
  { rating: 4.3, duration: "15 min", fee: "$50", earnings: "$38", datetime: "22/2/2025, 3:40", status: "COMPLETED" },
  { rating: 4.4, duration: "15 min", fee: "$50", earnings: "$38", datetime: "22/2/2025, 2:20", status: "COMPLETED" },
  { rating: 5.0, duration: "30 min", fee: "$60", earnings: "$50", datetime: "22/2/2025, 1:20", status: "COMPLETED" },
  { rating: 3.9, duration: "45 min", fee: "$80", earnings: "$64", datetime: "22/2/2025, 4:00", status: "COMPLETED" },
];

const PaymentLogin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentsData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4 md:p-6 bg-white">
      {/* Tabs */}
      <div className="flex space-x-4 md:space-x-6 mb-4">
        <button className="px-3 md:px-4 py-2 rounded-lg text-sm md:text-lg bg-black text-white">
          Payments
        </button>
        <button
          onClick={() => router.push("/expertpanel/expertreview")}
          className="px-3 md:px-4 py-2 rounded-lg text-sm md:text-lg bg-gray-200 text-black hover:bg-gray-300 transition"
        >
          Reviews
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full border-collapse"
        >
          <thead>
            <tr className="border-b border-gray-300 text-left text-xs md:text-sm">
              {["RATING", "SESSION DURATION", "SESSION FEE", "EXPERT EARNINGS", "DATE AND TIME", "STATUS"].map((heading) => (
                <th key={heading} className="py-2 px-2 md:py-3 md:px-4 font-semibold tracking-wide cursor-pointer hover:text-black whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {heading}
                    <div className="flex flex-col">
                      <FaSortUp className="text-xs" />
                      <FaSortDown className="text-xs -mt-1" />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((payment, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="py-2 md:py-3 px-2 md:px-4">{payment.rating}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{payment.duration}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{payment.fee}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{payment.earnings}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{payment.datetime}</td>
                <td className="py-2 md:py-3 px-2 md:px-4">{payment.status}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 md:mt-20">
        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className={`p-2 rounded-full border ${
              currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            <FaChevronLeft />
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => paginate(num)}
              className={`px-3 md:px-4 py-2 rounded-lg ${
                currentPage === num ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            disabled={currentPage === 3}
            onClick={() => paginate(currentPage + 1)}
            className={`p-2 rounded-full border ${
              currentPage === 3 ? "cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentLogin;
