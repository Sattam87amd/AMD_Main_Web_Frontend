"use client";

import React from "react";

const images = [
  { src: "./aaliyaabadi.png", alt: "Aaliya Abadi" },
  { src: "./aishaaziz.png", alt: "Aisha Aziz" },
  { src: "./jennywilson.png", alt: "Jenny Wilson" },
  { src: "./guyhawkins.png", alt: "Guy Hawkins" },
  { src: "./ralphedwards.png", alt: "Ralph Edwards" },
];

const AchieveTheLook = () => {
  return (
    <main className="bg-[#EDECE8] relative md:min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="w-full mx-auto px-4 md:px-6 py-10">
        {/* Heading */}
        <h1 className="text-center text-black uppercase text-2xl md:text-[40px] font-semiboldi mb-10 md:pb-16">
          Achieve the look you’ve always dreamed of
        </h1>

        {/* Horizontal Scroll Section */}
        <div className="overflow-x-auto md:overflow-x-auto">
          <div className="flex gap-4 md:gap-8 px-4 md:px-0 scrollbar-hide">
            {images.map((image, index) => (
              <div
                key={index}
                className="min-w-[280px] md:min-w-[400px] h-[80vh] flex-shrink-0 overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AchieveTheLook;
