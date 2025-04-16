"use client";

import LoginExpertCategory from "@/components/ExpertCategory/LoginExpertCategory";
import BottomNav from "@/components/ExpertPanel/Bottomnav/bottomnav";
import CareerBusinessHomeCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/Career&BusinessLogin";
import FashionBeautyHomeCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/Fashoin&BeautyLogin";
import HomeCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/HomeExpertLogin";
import ExpertsCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/TopExpertLogin";
import WellnessHomeCardsLogin from "@/components/ExpertPanel/ExpertAfterLogin/WellnessLogin";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import Threepara from "@/components/Experts/Threepara/threepara";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";

const Page = () => {
 

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[20%] h-[80%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <Sidebar />
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className= "w-full md:w-[80%]">
          {/* Desktop View - NavSearch */}
          <div className="">
        <MobileNavSearch/> 
            <NavSearch />
            <LoginExpertCategory />
            <div className="space-y-8 px-4 md:px-8">
              <ExpertsCardsLogin />
              <WellnessHomeCardsLogin />
              <FashionBeautyHomeCardsLogin />
              <CareerBusinessHomeCardsLogin />
              <HomeCardsLogin />
              <Threepara />
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Full Width) */}
      <div className="w-full hidden sm:block">
        <Footer />
      </div>

      <div>
        <BottomNav/>
        </div>

    </div>
  );
};

export default Page;
