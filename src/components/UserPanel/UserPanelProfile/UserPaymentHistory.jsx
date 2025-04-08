"use client";

import React from "react";
import { LuVideo } from "react-icons/lu";

const UserPaymentHistory = () => {
  const payments = [
    {
      id: "VIDEOCALL223Y477",
      amount: 300,
      date: "Thu, 28 Mar '24, 9:34 pm",
      method: "Credit card",
      status: "Completed",
    },
    {
      id: "VIDEOCALL223Y478",
      amount: 300,
      date: "Thu, 28 Mar '24, 9:34 pm",
      method: "Debit card",
      status: "Completed",
    },
  ];

  return (
    <div className="p-4 space-y-4">
      {payments.map((payment, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b py-4"
        >
          {/* Icon */}
          <div className="flex justify-start md:justify-center">
            <div className="w-10 md:w-16 h-10 md:h-16 border rounded-full flex justify-center items-center">
              <LuVideo className="text-xl text-black" />
            </div>
          </div>

          {/* ID and Time */}
          <div className="col-span-2 flex flex-col">
            <div className="flex items-center gap-2 md:pb-4 text-base font-medium text-[#2E2E2E]">
              <span>{payment.id}</span>
              <span className="text-gray-400">·</span>
              <span>${payment.amount}</span>
            </div>
            <div className="text-sm text-gray-500">{payment.date}</div>
          </div>

          {/* Payment Method */}
          <div className="flex items-start justify-start md:justify-end">
            <p className="text-sm font-semibold text-[#2E2E2E]">
              Payment done through {payment.method}
            </p>
          </div>

          {/* Status */}
          <div className="flex justify-end md:justify-center">
            <span className="bg-[#9B9999] text-[#fff] px-3 py-1 rounded-full text-sm font-medium">
              {payment.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPaymentHistory;
