'use client'
import React from "react";
import { useRouter } from "next/navigation"

const UserGameChangers = () => {
   const router = useRouter(); // Initialize router
      
        const handleJoinClick = () => {
          router.push("/userpanel/joinasexpert"); // Redirect to /signup or any desired route
        };

  return (
    <div className="relative md:w-full h-[30rem] w-full md:h-[646px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:h-full "
        style={{ backgroundImage: "url('/gamechanger.png')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4 text-center ">
        <h2 className="text-white text-[15px] font-medium  tracking-wider md:text-4xl  md:max-w-3xl md:tracking-normal ">
          “A Game-Changer For Professionals Looking To Connect And Share Knowledge Effortlessly.”
        </h2>
        <button 
         onClick={handleJoinClick}
        className="mt-20 bg-black text-white px-6 py-3 rounded-full  md:w-[25%] h-[60px] text-lg hover:bg-opacity-80 transition duration-300">
          Join as an Expert
        </button>
      </div>
    </div>
  );
};

export default UserGameChangers;