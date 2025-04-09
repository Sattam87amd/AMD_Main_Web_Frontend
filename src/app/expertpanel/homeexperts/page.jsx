"use client";

import LoginExpertCategory from "@/components/ExpertCategory/LoginExpertCategory";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import Homeexpert from "@/components/Experts/Homeexpert/homeexpert";
import Footer from "@/components/Layout/Footer";
// import Homeexpert from "@/components/Experts/Homeexpert/LoginHomeExpert";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import Footer from "@/components/userpanel/Layout/Footer";
import { useState, useEffect } from "react";

const Page = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      const token = localStorage.getItem("expertToken")
  
      if(token){
        setIsLoggedIn(true)
      }
      else{
        setIsLoggedIn(false)
      }
    });

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[15%] h-[85%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
        {isLoggedIn && <Sidebar />}
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className="w-full md:w-[85%] flex flex-col">
          {/* Desktop View - NavSearch */}
          <div className="hidden md:block">
            <NavSearch />
            <LoginExpertCategory/>
            <div className="space-y-8 px-4 md:px-8 ">
              <Homeexpert/>
             
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden">
            <MobileNavSearch />
            <div className="space-y-8 px-4">
             <Homeexpert/>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Full Width) */}
      <div className="w-full ">
        <Footer/>
      </div>
    </div>
  );
};

export default Page;