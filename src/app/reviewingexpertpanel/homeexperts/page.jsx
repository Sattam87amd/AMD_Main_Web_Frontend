"use client";

import LoginExpertCategory from "@/components/ExpertCategory/LoginExpertCategory";
import BottomNav from "@/components/ExpertPanel/Bottomnav/bottomnav";
import HomeexpertLogin from "@/components/ExpertPanel/ExpertsList/homeexpert";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import Homeexpert from "@/components/Experts/Homeexpert/homeexpert";
import Footer from "@/components/Layout/Footer";
// import Homeexpert from "@/components/Experts/Homeexpert/LoginHomeExpert";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import { useState, useEffect } from "react";

const Page = () => {


  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[15%] h-[85%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
         <Sidebar />
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className="w-full md:w-[85%] flex flex-col">
          {/* Desktop View - NavSearch */}
          <div className="hidden md:block">
            <NavSearch />
            <LoginExpertCategory/>
            <div className="space-y-8 px-4 md:px-8 ">
              <HomeexpertLogin/>
             
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden">
            <MobileNavSearch />
            <div className="space-y-8 px-4">
            <HomeexpertLogin/>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Full Width) */}
      <div className="w-full hidden sm:block">
        <Footer/>
      </div>
      <div><BottomNav/></div>
    </div>
  );
};

export default Page;