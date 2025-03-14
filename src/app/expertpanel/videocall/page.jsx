import BottomNav from "@/components/ExpertPanel/Bottomnav/bottomnav";
import Navtop from "@/components/ExpertPanel/Navtop/navtop";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import VideoCall from "@/components/ExpertPanel/VideoCall/VideoCall";

import Navbar from "@/components/Layout/Navbar";

import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with 1/3 width - Hidden on mobile */}
      <div className="hidden md:block md:w-[20%]">
        <Sidebar />
      </div>

      {/* Right Side Content with 2/3 width */}
      <div className="w-full md:w-[80%] p-4">
        <Navtop/>
        <VideoCall />

        {/* Bottom Navigation - Visible only on mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomNav/>
        </div>
      </div>
    </div>
  );
};

export default Page;




