"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiBadgeCheck } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi"; // Importing right arrow icon
import axios from "axios";

const CareerBusinessHomeCardsLogin = () => {
  const [expertData, setExpertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch experts by area of expertise (e.g., "Home")
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const area = "Career and Business";  // Or dynamically fetch based on user's selection
        const response = await axios.get(`http://localhost:8000/api/expertauth/area/${area}`);
        setExpertData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching expert data");
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white p-6">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row md:h-40 items-center mb-6 md:mb-0">
        <h1 className="text-3xl md:text-[60px] font-bold text-black"> CAREER AND BUSINESS.</h1>
        <p className="text-[#9C9C9C] md:pt-5 pl-5 md:text-2xl">
        Connect with CEOs, executives, coaches, and more
        </p>
      </div>

      {/* "See All" Button */}
      <div className="flex justify-start mb-6">
        <Link href="/expertpanel/carrer&business" passHref>
          <button className="flex items-center text-xl font-semibold text-black">
            See All
            <HiChevronRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* Cards Section - Horizontal Scroll on Small Screens, Grid on Medium+ */}
      <div className="overflow-x-auto md:overflow-visible">
        <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-80 px-4 md:px-0 overflow-x-scroll scrollbar-hide">
          {expertData.map((expert, index) => (
            <Link
              key={index}
              href={`/expertpanel/expertaboutme/${expert._id}`}  // Dynamic URL with expert ID
              passHref
            >
              <div className="relative min-w-[280px] md:w-full h-[400px] flex-shrink-0 overflow-hidden shadow-lg cursor-pointer">
                {/* Background Image */}
                <img
                  src={expert.image || "/aaliyaabadi.png"}  // Ensure there's a fallback image
                  alt={expert.photoFile}
                  className="w-full h-full object-cover"
                />

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-[#F8F7F3] text-black px-4 py-2 rounded-2xl shadow-xl font-semibold">
                  {expert.price || "$ 0"}  {/* Default value in case price is missing */}
                </div>

                {/* Transparent Blur Card */}
                <div className="absolute bottom-1 left-1 right-1 bg-white/80 p-4 m-2">
                  <h2 className="text-lg font-semibold text-black flex items-center gap-1">
                    {expert.firstName}
                    <HiBadgeCheck className="w-6 h-6 text-yellow-500" />
                  </h2>
                  <p className="text-xs text-black mt-1">{expert.experience}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerBusinessHomeCardsLogin;
