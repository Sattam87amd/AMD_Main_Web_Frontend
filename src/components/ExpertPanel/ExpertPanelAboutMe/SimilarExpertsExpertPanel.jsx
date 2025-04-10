"use client";

import React from "react";

// Expert Data Constant
const expertData = [
  {
    name: "Aaliya Abadi",
    price: "$ 450",
    image: "/aaliyaabadi.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
  {
    name: "Aisha Aziz",
    price: "$ 600",
    image: "/aishaaziz.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
  {
    name: "Jenny Wilson",
    price: "$ 250",
    image: "/jennywilson.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
  {
    name: "Guy Hawkins",
    price: "$ 1500",
    image: "/guyhawkins.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
  {
    name: "Ralph Edwards",
    price: "$ 450",
    image: "/ralphedwards.png",
    description:
      "Founder of Drybar (Sold for $255M). Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, Macy’s.",
  },
];

const SimilarExpertsExpertPanel = () => {
  return (
    <div className="bg-white p-6">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row md:h-40 items-center mb-6">
        <h1 className="text-3xl md:text-[60px] font-bold text-black">
          Similar Experts.
        </h1>
      </div>

      {/* Cards Section - Horizontal Scroll on Small Screens, Grid on Medium+ */}
      <div className="overflow-x-auto md:overflow-visible">
        <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-80 px-4 md:px-0 overflow-x-scroll scrollbar-hide">
          {expertData.map((expert, index) => (
            <div
              key={index}
              className="relative min-w-[280px] md:w-full h-[400px] flex-shrink-0 overflow-hidden shadow-lg "
            >
              {/* Background Image */}
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full object-cover "
              />

              {/* Price Tag (Top Right) */}
              <div className="absolute top-4 right-4 bg-[#F8F7F3] text-black px-4 py-2 rounded-2xl shadow-md font-semibold">
                {expert.price}
              </div>

              {/* Transparent Blur Card (Bottom) */}
              <div className="absolute bottom-1 left-1 right-1 bg-white/60 p-4 m-5 backdrop-blur-lg">
                <h2 className="text-xl font-bold text-black">{expert.name}</h2>
                <p className="text-sm text-black mt-1">{expert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarExpertsExpertPanel;
