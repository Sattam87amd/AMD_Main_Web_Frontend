"use client";

import React from "react";

function UserFaQ() {
  return (
    <div className="relative min-h-screen">
      {/* Background Layout - Custom Split */}
      <div className="absolute inset-0 grid grid-cols-[52%_48%] min-h-screen">
        <div className="bg-[#F8F7F3] h-full"></div>
        <div className="bg-[#EDECE8] h-full"></div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col top-80 items-center justify-center h-full px-4 md:px-0">
        <h1 className="text-3xl md:text-[65px] font-extrabold md:font-bold text-black text-center mb-6 md:mb-24">
          FaQ
        </h1>
        <p className="hidden md:block text-xl text-center max-w-6xl">
          Lorem ipsum dolor sit amet consectetur. Non commodo mi elit ut
          convallis. Tempor facilisi pellentesque sem <br /> praesent tortor venenatis.
          Diam volutpat interdum quis senectus. Quam eros nunc habitant
          placerat arcu accumsan.
        </p>
        {/* for mobile */}
        <p className="text-sm text-center max-w-5xl md:hidden">
          Lorem ipsum dolor sit amet consectetur. Non commodo mi elit ut
          convallis. Tempor facilisi pellentesque sem praesent tortor venenatis.
          Diam volutpat interdum quis senectus. Quam eros nunc habitant
          placerat arcu accumsan.
        </p>
      </div>
    </div>
  );
}

export default UserFaQ;
