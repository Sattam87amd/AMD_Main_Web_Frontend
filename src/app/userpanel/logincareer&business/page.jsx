"use client";

import ExpertCategory from "@/components/ExpertCategory/ExpertCategory";
import NavSearch from "@/components/Layout/navsearch";
import Footer from "@/components/UserPanel/Layout/Footer";
import LoginCareerBusiness from "@/components/UserPanel/LoginCareer&Business/LoginCareer&Business";
import LoginExpertCategory from "@/components/UserPanel/LoginExpertCategory/LoginExpertCategory";
import LoginHomeexpert from "@/components/UserPanel/LoginHomeExpert/LoginHomeExpert";
import LoginUserHomeexpert from "@/components/UserPanel/LoginUserExpert/LoginUserHomeexpert/LodinUserHomeexpert";
import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import UserHomeexperts from "@/components/UserPanel/UserExpert-Home/UserExpert-Home";
import UserSidebar from "@/components/UserPanel/UseSideBar/UserSidebar";


const Page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[15%] h-[85%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <UserSidebar />
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className="w-full md:w-[85%] flex flex-col">
          {/* Desktop View - NavSearch */}
          <div className="hidden md:block">
            <NavSearch />
            <LoginExpertCategory/>
            <div className="space-y-8 px-4 md:px-8">
              <LoginCareerBusiness /> 
             
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden">
            <LoginUserMobileNavSearch />
            <div className="space-y-8 px-4">
              <LoginCareerBusiness />
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