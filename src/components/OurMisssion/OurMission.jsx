import Image from "next/image";
import React from "react";

const OurMission = () => {
  return (
    <>
      <div className="relative h-full md:min-h-screen flex flex-col justify-between">
        {/* Background Layout - Custom Split */}
        <div className="absolute inset-0 grid grid-cols-[52%_48%] h-full">
          <div className="bg-[#F8F7F3] h-full"></div>
          <div className="bg-[#EDECE8] h-full"></div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 w-full max-w-5xl mx-auto md:mx-0 px-6 md:px-12 lg:px-20 mt-12">
          <div className="md:w-[52%]">
            <h1 className="text-2xl md:text-5xl font-bold text-black uppercase">
              Our Mission
            </h1>
            <p className="text-md md:text-xl text-black font-semibold mt-6 mb-2 md:mb-4">
              Our mission is to democratize access to top-tier professionals,
              enabling meaningful connections that inspire and empower
              individuals worldwide.
            </p>
          </div>
        </div>

        {/* Image Section - Touching Bottom & Increasing Height Upwards */}
        <div className="relative z-10 w-full flex  justify-center ">
          <div className="grid grid-cols-4 gap-1 md:gap-4 w-full items-end mt-12 ">
            {/* First Image - Small */}
            <div className="h-[8.75rem] md:h-[20rem] overflow-hidden">
              <img
                src="./aboutUs/OM1.png"
                alt="First"
                className="w-full h-full object-fill md:object-cover"
              />
            </div>

            {/* Second Image - Large */}
            <div className="h-[7rem] md:h-[18.75rem] overflow-hidden">
              <img
                src="./aboutUs/OM2.png"
                alt="Second"
                className="w-full h-full object-cover "
              />
            </div>

            {/* Third Image - Small */}
            <div className="h-[8.75rem] md:h-[20rem] overflow-hidden">
              <img
                src="./aboutUs/OM3.png"
                alt="Third"
                className="w-full h-full object-cover "
              />
            </div>

            {/* Fourth Image - Large */}
            <div className="h-[7rem] md:h-[18.75rem] overflow-hidden">
              <img
                src="./aboutUs/OM4.png"
                alt="Fourth"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Story & Our Mission Section */}
      <div className="mt-8 px-6 md:px-20 mb-8 flex flex-col md:flex-row items-center justify-center gap-0 relative">

  {/* Horizontal Line */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full md:w-[calc(100%-10rem)] h-8 bg-[#EDECE8] rounded-xl hidden md:block  "></div>

  {/* Our Story */}
  <div className="w-full md:w-[45%] bg-[#EDECE8] p-8 rounded-xl rounded-tr- text-center md:text-left relative z-10">
    <h2 className="text-xl md:text-2xl font-bold uppercase">Our Story</h2>
    <p className="mt-4 text-sm md:text-base text-gray-800">
      Our journey began with a simple yet profound realization: the most
      impactful learning experiences often come from direct interactions
      with those who have walked the path before us. This insight led us
      to create a platform that bridges the gap between aspiring
      individuals and seasoned experts across various fields.
    </p>
  </div>

  {/* Center Image */}
  <div className="w-full md:w-[12%] flex justify-center my-6 md:my-1 relative z-9 mt-8 rounded-t-2xl overflow-hidden">
    <Image
      src="/aboutUs/habibi.png"
      width={105}
      height={100}
      alt="Story Image"
      className="object-cover w-[105%] h-[15rem] pt-5 rounded-t-2xl"
    />
  </div>

  {/* Our Mission */}
  <div className="w-full md:w-[45%] bg-[#EDECE8] p-8 rounded-xl text-center md:text-left relative z-10">
    <h2 className="text-xl md:text-2xl font-bold uppercase">Our Mission</h2>
    <p className="mt-4 text-sm md:text-base text-gray-800">
      We aim to provide universal access to industry leaders, fostering a
      community where knowledge is shared, opportunities are created, and
      potential is unlocked. By facilitating one-on-one virtual
      consultations, we empower users to gain personalized insights and
      guidance from experts they admire.
    </p>
  </div>
</div>
    </>
  );
};

export default OurMission;
