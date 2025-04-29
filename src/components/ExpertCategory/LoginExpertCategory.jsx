"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LoginExpertCategory = () => {
  const pathname = usePathname();

  const categories = [
    { title: "Top Experts", image: "/topexperts.png", link: "/expertpanel/topexperts" },
    { title: "Home", image: "/home.png", link: "/expertpanel/homeexperts" },
    { title: "Career & Business", image: "/career-business.png", link: "/expertpanel/career&business" },
    { title: "Fashion & Beauty", image: "/style-beauty.png", link: "/expertpanel/style&beautyexperts" },
    { title: "Wellness", image: "/wellness.png", link: "/expertpanel/wellnessexperts" },
  ];

  return (
    <div className="bg-[#F8F7F3] px-4 py-6">
      {/* Headline */}
      <h1 className="text-2xl md:text-3xl md:ml-16 font-semibold text-black mb-6">
        Find The Right Expert In Seconds!
      </h1>

      {/* Categories Section */}
      <div className="overflow-x-auto md:overflow-x-auto md:ml-16">
        <div className="flex gap-4 md:gap-x-32 md:px-4 md:pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <Link href={category.link} key={index} passHref>
              <div
                className={`relative flex-shrink-0 min-w-[170px] md:min-w-[240px] h-24 md:h-36 rounded-3xl overflow-hidden shadow-md cursor-pointer p-1 ${
                  pathname === category.link
                    ? "border-4 border-black"
                    : "border-transparent"
                }`}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-multiply"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <p className="text-white font-semibold md:text-lg">
                      {category.title}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginExpertCategory;