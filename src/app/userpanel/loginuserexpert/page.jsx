"use client";

import BottomNav from "@/components/ExpertPanel/Bottomnav/bottomnav";
<<<<<<< HEAD
import Footer from "@/components/Layout/Footer";
import LoginUserCab from "@/components/UserPanel/LoginUserExpert/LoginUserCad/LoginUserCad";
import LoginUserFbexpert from "@/components/UserPanel/LoginUserExpert/LoginUserFashion&Beauty-Expert/LoginUserfbexpert";
import LoginUserHomeexpert from "@/components/UserPanel/LoginUserExpert/LoginUserHomeexpert/LoginUserHomeexpert";
import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMoblieNavSearch/LoginUserMoblieNavSearch";
import LoginUserThreepara from "@/components/UserPanel/LoginUserExpert/LoginUserThreepara/LoginUserThreepara";
import LoginUserTopExpert from "@/components/UserPanel/LoginUserExpert/LoginUserTopExpert/LoginUserTopExpert";
// import LoginUserFbexpert from "@/components/UserPanel/LoginUserExpert/LoginUserFashion&Beauty-Expert/LoginUserFbexpert";
// import LoginUserHomeexpert from "@/components/UserPanel/LoginUserExpert/LoginUserHomeexpert/LodinUserHomeexpert";
// import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
// import LoginUserThreepara from "@/components/UserPanel/LoginUserExpert/LoginUserThreepara/Login UserThreepara";
// import LoginUserTopExpert from "@/components/UserPanel/LoginUserExpert/LoginUsertopExperts/LoginUsertopExpert";
import LoginUserWellnessExperts from "@/components/UserPanel/LoginUserExpert/LoginUserWellnessExperts/LoginUserWellnessExperts";
import Sidebar from "@/components/UserPanel/LoginUserExpert/SideBar/SideBar";
// import Sidebar from "@/components/UserPanel/LoginUserExpert/SideBar/SideBar";
// import Sidebar from "@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar";
import UserNavSearch from "@/components/UserPanel/UserNavSearch/UserNavSearch";
=======
import Footer from "@/components/userpanel/Layout/Footer";
import LoginUserCab from "@/components/UserPanel/LoginUserExpert/LoginUserCad/LoginUserCad";
import LoginUserFbexpert from "@/components/UserPanel/LoginUserExpert/LoginUserFashion&Beauty-Expert/LoginUserFbexpert";
import LoginUserHomeexpert from "@/components/UserPanel/LoginUserExpert/LoginUserHomeexpert/LodinUserHomeexpert";
import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import LoginUserThreepara from "@/components/UserPanel/LoginUserExpert/LoginUserThreepara/Login UserThreepara";
import LoginUserTopExpert from "@/components/UserPanel/LoginUserExpert/LoginUsertopExperts/LoginUsertopExpert";
import LoginUserWellnessExperts from "@/components/UserPanel/LoginUserExpert/LoginUserWellnessExperts/LoginUserWellnessExperts";
import Sidebar from "@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar";
import UserNavSearch from "@/components/UserPanel/UserNavSearch/UserNavSearch";
import UseSidebar from "@/components/UserPanel/UseSideBar/UserSidebar";
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32


const Page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
<<<<<<< HEAD
        <aside className="w-[20%] hidden md:block bg-gray-100 overflow-y-auto">
          <Sidebar />
=======
        <aside className="w-[20%] h-[80%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <UseSidebar />
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className="w-full md:w-[80%] flex flex-col">
          {/* Desktop View - NavSearch */}
          <div className="hidden md:block">
            <UserNavSearch />
            <div className="space-y-8 px-4 md:px-8">
<<<<<<< HEAD
              <LoginUserTopExpert/>
              <LoginUserWellnessExperts />
              < LoginUserFbexpert/>
=======
              <LoginUserTopExpert />
              <LoginUserWellnessExperts />
              <LoginUserFbexpert />
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
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
<<<<<<< HEAD
      <div className="w-full">
        <Footer />
=======
      <div className="w-full ">
        <Footer/>
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
      </div>
    </div>
  );
};

export default Page;