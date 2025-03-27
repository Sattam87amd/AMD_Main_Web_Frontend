"use client";

import BottomNav from "@/components/ExpertPanel/Bottomnav/bottomnav";
import Footer from "@/components/Layout/Footer";
import LoginUserCab from "@/components/UserPanel/LoginUserExpert/LoginUserCad/LoginUserCad";
import LoginUserFbexpert from "@/components/UserPanel/LoginUserExpert/LoginUserFashion&Beauty-Expert/LoginUserFbexpert";
import LoginUserHomeexpert from "@/components/UserPanel/LoginUserExpert/LoginUserHomeexpert/LodinUserHomeexpert";
import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import LoginUserThreepara from "@/components/UserPanel/LoginUserExpert/LoginUserThreepara/Login UserThreepara";
import LoginUserTopExpert from "@/components/UserPanel/LoginUserExpert/LoginUsertopExperts/LoginUsertopExpert";
import LoginUserWellnessExperts from "@/components/UserPanel/LoginUserExpert/LoginUserWellnessExperts/LoginUserWellnessExperts";
import Sidebar from "@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar";
import UserNavSearch from "@/components/UserPanel/UserNavSearch/UserNavSearch";


const Page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[20%] hidden md:block bg-gray-100 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className="w-full md:w-[80%] flex flex-col">
          {/* Desktop View - NavSearch */}
          <div className="hidden md:block">
            <UserNavSearch />
            <div className="space-y-8 px-4 md:px-8">
              <LoginUserTopExpert />
              <LoginUserWellnessExperts />
              <LoginUserFbexpert />
              <LoginUserCab />
              <LoginUserHomeexpert />
              <LoginUserThreepara />
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden">
            <LoginUserMobileNavSearch />
            <div className="space-y-8 px-4">
              <LoginUserTopExpert />
              <LoginUserWellnessExperts />
              <LoginUserFbexpert />
              <LoginUserCab />
              <LoginUserHomeexpert />
              <LoginUserThreepara />
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Full Width) */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Page;