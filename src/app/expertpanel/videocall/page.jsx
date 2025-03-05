import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import VideoCall from "@/components/ExpertPanel/VideoCall/VideoCall";

import Navbar from "@/components/Layout/Navbar";

import React from "react";

const page = () => {
  return (
    <div className="md:flex min-h-screen relative">
      <Sidebar />
      {/* Desktop View - NavSearch */}
      <div className=" w-5/6 md:block">
        <Navbar />
        <VideoCall />
      </div>

    </div>
  );
};

export default page;
