"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LoginExpertCategory = () => {
  const pathname = usePathname();
  const [expertStatus, setExpertStatus] = useState(null);
  const [baseRoute, setBaseRoute] = useState("/expertpanel");

  // Check expert status from token on component mount
  useEffect(() => {
    try {
      const expertToken = localStorage.getItem('expertToken');
      if (expertToken) {
        try {
          // Split the token into parts and decode the payload
          const payload = expertToken.split('.')[1];
          // Convert Base64Url to Base64 and decode
          const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
          const decodedPayload = atob(base64);
          const payloadObj = JSON.parse(decodedPayload);
          const status = payloadObj.status;
          
          // Set expert status and determine the base route
          setExpertStatus(status);
          if (status === 'Pending') {
            setBaseRoute("/reviewingexpertpanel");
          } else {
            setBaseRoute("/expertpanel");
          }
        } catch (error) {
          console.error('Error decoding expert token:', error);
          // Default to expert panel if there's an error
          setBaseRoute("/expertpanel");
        }
      }
    } catch (error) {
      console.error('Error checking expert token:', error);
      // Default to expert panel if there's an error
      setBaseRoute("/expertpanel");
    }
  }, []);

  // Define categories with dynamic routes based on status
  const categories = [
    { 
      title: "Top Experts", 
      image: "/topexperts.png", 
      endpoint: "/topexperts" 
    },
    { 
      title: "Home", 
      image: "/home.png", 
      endpoint: "/homeexperts" 
    },
    { 
      title: "Career & Business", 
      image: "/career-business.png", 
      endpoint: "/career&business" 
    },
    { 
      title: "Fashion & Beauty", 
      image: "/style-beauty.png", 
      endpoint: "/style&beautyexperts" 
    },
    { 
      title: "Wellness", 
      image: "/wellness.png", 
      endpoint: "/wellnessexperts" 
    },
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
          {categories.map((category, index) => {
            // Combine the base route with the endpoint
            const fullLink = `${baseRoute}${category.endpoint}`;
            
            return (
              <Link href={fullLink} key={index} passHref>
                <div
                  className={`relative flex-shrink-0 min-w-[170px] md:min-w-[240px] h-24 md:h-36 rounded-3xl overflow-hidden shadow-md cursor-pointer p-1 ${
                    pathname === fullLink
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoginExpertCategory;