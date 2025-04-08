"use client";

import LoginExpertCategory from "@/components/ExpertCategory/LoginExpertCategory";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import LoginStyleBeautyExperts from "@/components/Experts/Style&BeautyExpert/LoginStyle&BeautyExpert";
import TopExpert from "@/components/Experts/Topexpert/logintopexpert";
import LoginWellnessExperts from "@/components/Experts/WellnessExperts/LoginWellnessExperts";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import UserTopExpert from "@/components/UserPanel/Experts/UserTopeexpert/UserTopeexpert";
import Footer from "@/components/userpanel/Layout/Footer";
import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import UserNavSearch from "@/components/UserPanel/UserNavSearch/UserNavSearch";
import UseSidebar from "@/components/UserPanel/UseSideBar/UserSidebar";


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
            <LoginWellnessExperts/>
             
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden">
            <MobileNavSearch />
            <div className="space-y-8 px-4">
             <LoginWellnessExperts/>
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