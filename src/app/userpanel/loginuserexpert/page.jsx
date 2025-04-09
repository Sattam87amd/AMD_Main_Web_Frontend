"use client";


import Footer from "@/components/userpanel/Layout/Footer";
import LoginUserCab from "@/components/userpanel/LoginUserExpert/LoginUserCad/LoginUserCad";
import LoginUserFbexpert from "@/components/userpanel/LoginUserExpert/LoginUserFashion&BeautyExpert/LoginUserfbexpert";
import LoginUserHomeexpert from "@/components/userpanel/LoginUserExpert/LoginUserHomeexpert/LodinUserHomeexpert";
import LoginUserMobileNavSearch from "@/components/userpanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import LoginUserThreepara from "@/components/userpanel/LoginUserExpert/LoginUserThreepara/Login UserThreepara";
import LoginUserTopExpert from "@/components/userpanel/LoginUserExpert/LoginUsertopExperts/LoginUsertopExpert";
import LoginUserWellnessExperts from "@/components/userpanel/LoginUserExpert/LoginUserWellnessExperts/LoginUserWellnessExperts";
import UserNavSearch from "@/components/userpanel/Layout/NavSearch";
import UserSidebar from "@/components/userpanel/UseSideBar/UserSidebar";
import LoginExpertCategory from "@/components/userpanel/LoginExpertCategory/LoginExpertCategory";


const Page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[20%] h-[80%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <UserSidebar />
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className="w-full md:w-[80%] flex flex-col">
          {/* Desktop View - NavSearch */}
          <div className="hidden md:block">
            <UserNavSearch/>
            {/* <UserExpertCategory/> */}
            <LoginExpertCategory/>
            <div className="space-y-8 px-4 md:px-8">
              <LoginUserTopExpert />
              <LoginUserWellnessExperts />
              <LoginUserFbexpert/>
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
      <div className="w-full ">
        <Footer/>
      </div> 
    </div>
  );
};

export default Page;