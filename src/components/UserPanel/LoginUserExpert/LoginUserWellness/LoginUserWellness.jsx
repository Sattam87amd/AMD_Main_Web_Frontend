"use client";

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const experts = [
  {
    name: "Aaliya Abadi",
    role: "Founder Of Drybar (Sold For $255M)",
    description:
      "Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, and Macy’s.",
    price: "$450",
    image: "/aaliaabadi.png",
  },
  {
    name: "Aisha Aziz",
    role: "Founder Of Drybar (Sold For $255M)",
    description:
      "Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, and Macy’s.",
    price: "$600",
    image: "/aishaaziz.png",
  },
  {
    name: "Jenny Wilson",
    role: "Founder Of Drybar (Sold For $255M)",
    description:
      "Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, and Macy’s.",
    price: "$250",
    image: "/jennywilson.png",
  },
  {
    name: "Guy Hawkins",
    role: "Founder Of Drybar (Sold For $255M)",
    description:
      "Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, and Macy’s.",
    price: "$1500",
    image: "/guyhawkins.png",
  },
  {
    name: "Ralph Edwards",
    role: "Founder Of Drybar (Sold For $255M)",
    description:
      "Grew Drybar to 150 locations across the US with products sold at Sephora, Nordstrom, Ulta Beauty, and Macy’s.",
    price: "$450",
    image: "/ralphedwards.png",
=======
import React from "react";
import Link from "next/link";
import { HiBadgeCheck } from "react-icons/hi";

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
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
  },
];

const LoginUserWellnessexpert = () => {
<<<<<<< HEAD
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleExperts = isMobile && !showAll ? experts.slice(0, 2) : experts;

  return (
    <div className="bg-white py-10 px-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold"> WELLNESS</h1>
          {!isMobile && (
            <p className="text-gray-500 ml-52">Connect with nutritionists, trainers, & more about living a healthier life </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          {isMobile && (
            <p className="text-gray-500 mb-2 sm:mb-0">Connect with nutritionists, trainers, & more about living a healthier life </p>
          )}
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-black font-semibold hover:underline mt-2 sm:mt-0 sm:ml-4"
          >
            {showAll ? "Show Less ←" : "See All →"}
          </button>
        </div>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {visibleExperts.map((expert, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden shadow-lg rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Image Section */}
            <div className="relative w-full h-96">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full object-contain rounded-xl"
              />
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white text-black font-bold py-1 px-3 rounded-full shadow-md">
                {expert.price}
              </div>

              {/* Glass Effect Info Box */}
              <div className="absolute bottom-0 left-0 w-60 h-40 ml-6 mb-2 bg-white/30 backdrop-blur-lg p-4 rounded-xl text-black">
                <h2 className="text-xl font-bold">
                  {expert.name} <span className="text-yellow-500">⭐</span>
                </h2>
                <p className="text-sm text-black mt-1">{expert.role}</p>
                <p className="text-xs text-gray-800 mt-1">{expert.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Popup for 'See all' */}
      {showAll && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">All Top Experts</h2>
              <button onClick={() => setShowAll(false)} className="text-red-500">
                <FaTimes size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experts.map((expert, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl shadow-lg">
                  <div className="w-full h-80">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-black font-bold py-1 px-3 rounded-full shadow-md">
                    {expert.price}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full bg-white/30 backdrop-blur-lg p-4 rounded-b-xl text-black">
                    <h2 className="text-xl font-bold">
                      {expert.name} <span className="text-yellow-500">⭐</span>
                    </h2>
                    <p className="text-sm text-black mt-1">{expert.role}</p>
                    <p className="text-xs text-gray-800 mt-1">{expert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
=======
  return (
    <div className="bg-white p-6">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row md:h-40 items-center mb-6">
        <h1 className="text-3xl md:text-[60px] font-bold text-black">
          WELLNEWSS
        </h1>
        <p className="text-[#9C9C9C] md:pt-5 pl-5 md:text-2xl">
        Connect with nutritionists, trainers, & more about living a healthier life
        </p>
      </div>

      {/* Cards Section - Horizontal Scroll on Small Screens, Grid on Medium+ */}
      <div className="overflow-x-auto md:overflow-visible">
        <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-80 px-4 md:px-0 overflow-x-scroll scrollbar-hide">
          {expertData.map((expert, index) => (
            <Link key={index} href={`/userpanel/userexpertaboutme`} passHref>
              <div className="relative min-w-[280px] md:w-full h-[400px] flex-shrink-0 overflow-hidden shadow-lg rounded-lg cursor-pointer">
                {/* Background Image */}
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover"
                />

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-[#F8F7F3] text-black px-4 py-2 rounded-2xl shadow-xl font-semibold">
                  {expert.price}
                </div>

                {/* Transparent Blur Card */}
                <div className="absolute bottom-1 left-1 right-1 bg-white/80 p-4 m-2 rounded-lg">
                  <h2 className="text-lg font-semibold text-black flex items-center gap-1">
                    {expert.name}
                    <HiBadgeCheck className="w-6 h-6 text-yellow-500" />
                  </h2>
                  <p className="text-xs text-black mt-1">{expert.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
    </div>
  );
};

export default LoginUserWellnessexpert;
