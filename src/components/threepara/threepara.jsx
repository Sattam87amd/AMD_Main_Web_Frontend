"use client";

import React from "react";
import { FaAward} from "react-icons/fa";

const ThreePara = () => {
  const features = [
    {
       
      title: "Save time and money, guaranteed",
      description: "Our guarantee - find value in your first session or your money back",
    },
    {
      icon: <FaAward size={40} className="text-black " />,
      title: "Get access to the world’s best",
      description: "Choose from our list of the top experts in a variety of topics",
    },
    {
      
      title: "Personalized advice just for you",
      description: "Book a 1-on-1 and group virtual session & get advice that is tailored to you",
    },
  ];

  return (
    <div className="bg-white py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreePara;
