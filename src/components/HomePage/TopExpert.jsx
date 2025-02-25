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

const ExpertsCards = () => {
  return (
    <div className="bg-white p-6">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row md:h-40  items-center mb-6">
        <h1 className="text-3xl md:text-[60px] font-bold text-black">Top Experts</h1>
        <p className="text-[#9C9C9C] text-sm text-center md:text-xl md:ml-10 md:mt-5">
          Access to the best has never been easier.
        </p>
      </div>

      {/* Cards Section */}
      <div className="overflow-x-auto md:overflow-visible">
        <div className="flex md:grid md:grid-cols-5 gap-4">
          {expertData.map((expert, index) => (
            <div
              key={index}
              className="relative min-w-[250px] md:w-full h-[400px]  overflow-hidden shadow-lg"
            >
              {/* Background Image */}
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full object-cover"
              />

              {/* Price Tag (Top Right) */}
              <div className="absolute top-4 right-4 bg-[#F8F7F3] text-black px-4 py-2 rounded-full shadow-md font-semibold">
                {expert.price}
              </div>

              {/* Transparent Blur Card (Bottom) */}
              <div className="absolute bottom-1 left-1 right-1 bg-white/30 p-4 rounded-lg m-5 backdrop-blur-lg">
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

export default ExpertsCards;
