"use client";

import LoginExpertCategory from "@/components/ExpertCategory/LoginExpertCategory";
import CareerBusinessHomeCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/Career&BusinessLogin";
import FashionBeautyHomeCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/Fashoin&BeautyLogin";
import HomeCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/HomeExpertLogin";
import ExpertsCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/TopExpertLogin";
import WellnessHomeCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/WellnessLogin";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import Threepara from "@/components/Experts/Threepara/threepara";
import Footer from "@/components/Layout/Footer";
import NavSearch from "@/components/Layout/navsearch";


const Page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[20%] h-[80%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <Sidebar/>
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className="w-full md:w-[80%] flex flex-col">
          {/* Desktop View - NavSearch */}
          <div className="hidden md:block">
            <NavSearch/>
        <LoginExpertCategory/>
            <div className="space-y-8 px-4 md:px-8">
            <ExpertsCardsLogin/>
             <WellnessHomeCardsLogin/>
             <FashionBeautyHomeCardsLogin/>
            <CareerBusinessHomeCardsLogin/>
             <HomeCardsLogin/>
           <Threepara/>
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden">
            {/* <LoginUserMobileNavSearch /> */}
            <div className="space-y-8 px-4">
              {/* <LoginUserTopExpert /> */}
              {/* <LoginUserWellnessExperts /> */}
              {/* <LoginUserFbexpert /> */}
              {/* <LoginUserCab /> */}
              {/* <LoginUserHomeexpert /> */}
              {/* <LoginUserThreepara /> */}
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