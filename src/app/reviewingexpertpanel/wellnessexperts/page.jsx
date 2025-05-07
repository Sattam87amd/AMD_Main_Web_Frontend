"use client";

import WellnessBefore from "@/components/ExpertBeforeLogin/WellnessBefore";
import LoginExpertCategory from "@/components/ExpertCategory/LoginExpertCategory";
import BottomNav from "@/components/reviewingexpertpanel/Bottomnav/bottomnav";
import WellnessLogin from "@/components/reviewingexpertpanel/ExpertsList/WellnessExperts";
import Sidebar from "@/components/reviewingexpertpanel/SideBar/SideBar";
import LoginWellnessExperts from "@/components/Experts/WellnessExperts/WellnessExperts";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";


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
         <WellnessLogin/>
             
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden">
            <MobileNavSearch />
            <div className="space-y-8 px-4">
            <WellnessLogin/>
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