"use client";


import Footer from "@/components/UserPanel/Layout/Footer";
import LoginUserCab from "@/components/UserPanel/LoginUserExpert/LoginUserCad/LoginUserCad";
import LoginUserFbexpert from "@/components/UserPanel/LoginUserExpert/LoginUserFashion&BeautyExpert/LoginUserfbexpert";
import LoginUserHomeexpert from "@/components/UserPanel/LoginUserExpert/LoginUserHomeexpert/LodinUserHomeexpert";
import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import LoginUserThreepara from "@/components/UserPanel/LoginUserExpert/LoginUserThreepara/Login UserThreepara";
import LoginUserTopExpert from "@/components/UserPanel/LoginUserExpert/LoginUsertopExperts/LoginUsertopExpert";
import LoginUserWellnessExperts from "@/components/UserPanel/LoginUserExpert/LoginUserWellnessExperts/LoginUserWellnessExperts";
import UserNavSearch from "@/components/UserPanel/Layout/NavSearch";
import UserSidebar from "@/components/UserPanel/UseSideBar/UserSidebar";
import LoginExpertCategory from "@/components/UserPanel/LoginExpertCategory/LoginExpertCategory";
import UserBottomNav from "@/components/UserPanel/UserBottomNav/UserBottomNav";


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
            <div className="space-y-8 px-4 pb-12 md:pb-0">
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
      <div className="w-full  hidden sm:block">
        <Footer/>
      </div>
      <div className="block sm:hidden ">
  <UserBottomNav />
</div>
 
    </div>
  );
};

export default Page;