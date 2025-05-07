"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiBadgeCheck } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import axios from "axios";
import { motion } from "framer-motion";
import ScrollableTags from "@/components/SpecialCharacter/section";

const FashionBeautyHomeCardsLogin = () => {
  const [expertData, setExpertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch experts by area of expertise (e.g., "Home")
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const area = "Style and Beauty";  // Or dynamically fetch based on user's selection
        const response = await axios.get(`https://amd-api.code4bharat.com/api/expertauth/area/${area}`);
        setExpertData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching expert data ");
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const truncateExperience = (text) => {
    if (!text) return '';

    // Find the first sentence (up to first period) within first 25 words
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const first25Words = words.slice(0, 25);

    // Find the first period in these words
    let firstSentence = [];
    for (const word of first25Words) {
      firstSentence.push(word);
      if (word.includes('.')) {
        break;
      }
    }

    // If no period found, use first 25 words with ellipsis if needed
    if (firstSentence.length === 25 && words.length > 25) {
      return firstSentence.join(' ') + '...';
    }

    return firstSentence.join(' ');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white py-10 px-4">
      <div className="py-3">

        <ScrollableTags />
      </div>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:h-40 items-center mb-6"
      >
        <h1 className="text-3xl md:text-[60px] font-bold text-black">
          FASHION & BEAUTY
        </h1>
        <p className="text-[#9C9C9C] md:pt-5 pl-5 md:text-2xl">
          Access to the best experts has never been easier
        </p>
      </motion.div>


      {/* Cards Section with Motion for Animation */}
      <div className="overflow-x-auto md:overflow-visible">
        <motion.div
          className="flex md:grid md:grid-cols-5 gap-4 md:gap-x-10 px-4 md:px-0 overflow-x-scroll scrollbar-hide"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {expertData.map((expert, index) => (
            <Link key={index} href={`/expertaboutme/${expert._id}`} passHref>
              <motion.div
                className="relative min-w-[280px] md:w-full h-[400px] flex-shrink-0 overflow-hidden shadow-lg cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              // whileHover={{ scale: 1.05 }}
              >
                {/* Expert Image */}
                <img
                  src={expert.photoFile || "/aaliyaabadi.png"}  // Fallback image
                  alt={expert.firstName}
                  className="w-full h-full object-cover"
                />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[#F8F7F3] text-black px-4 py-2 rounded-2xl shadow-xl font-semibold">
                  SAR {expert.price || "0"}  {/* Default value in case price is missing */}
                </div>

                {/* Info Box */}
                <div className="absolute bottom-1 left-1 right-1 bg-white/80 backdrop-blur-md p-4 m-2  shadow-lg">
                  <h2 className="text-lg font-semibold text-black flex items-center gap-1">
                    {expert.firstName}
                    <HiBadgeCheck className="w-5 h-5 text-yellow-500" />
                  </h2>
                  <p className="text-xs text-gray-800 mt-1">
                    {truncateExperience(expert.experience)}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FashionBeautyHomeCardsLogin;
