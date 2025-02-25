"use client";

import React from "react";
import Link from "next/link";

const ExpertCategories = () => {
  // Category Data with Proper Image Paths and Links
  const categories = [
    { title: "Top Experts", image: "/topexperts.png", link: "/topexpert" },
    { title: "Home", image: "/home.png", link: "/homeexpert" },
    {
      title: "Career & Business",
      image: "/career&business.png",
      link: "/career&businessexperts",
    },
    {
      title: "Style & Beauty",
      image: "/style&beauty.png",
      link: "/style&beautyexperts",
    },
    { title: "Wellness", image: "/wellness.png", link: "/wellnessexperts" },
  ];

  return (
    <div className="bg-[#F8F7F3] px-4 py-6">
      {/* Headline */}
      <h1 className="text-2xl md:text-3xl md:ml-16 font-semibold text-black mb-6">
        Find The Right Expert In Seconds!
      </h1>

      {/* Categories Section */}
      <div className="overflow-x-auto md:overflow-visible md:ml-28 md:pr-80">
        <div className="flex gap-5 md:grid md:grid-cols-5">
          {categories.map((category, index) => (
            <Link href={category.link} key={index} passHref>
              <div className="relative min-w-[150px] md:w-[210px] h-20 md:h-24 my-5 rounded-xl overflow-hidden shadow-md cursor-pointer">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
                  <p className="text-white font-semibold">{category.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertCategories;
