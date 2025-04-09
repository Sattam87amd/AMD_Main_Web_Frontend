import React from "react";
import NavSearch from "@/components/Layout/navsearch";
import WhatToExpectExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/WhatToExpectExpertPanel";
import ExpertFeatureHighightsExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/ExpertFeatureHighightsExpertPanel";
import SimilarExpertsExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/SimilarExpertsExpertPanel";
import Footer from "@/components/Layout/Footer";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import BottomNav from "@/components/ExpertPanel/Bottomnav/bottomnav";
import ExpertAboutMe from "@/components/ExpertAboutMe/ExpertAboutMe";
import AboutMeReviews from "@/components/ExpertAboutMe/AboutMeReviews";

const Page = () => {
  return (
    <>
    <div className="flex min-h-screen">
      {/* Sidebar (Left Section - 20% Width) */}
      <aside className="w-[20%] hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content (Right Section - 80% Width) */}
      <div className="w-full md:w-[80%] flex flex-col">
        {/* Navbar - Only visible on desktop */}
        <div className="hidden md:block">
          <NavSearch />
        </div>

        {/* Content Container - Ensures Consistent Spacing */}
        <div className="space-y-8 px-4 md:px-8">
          {/* <AboutMeExpertPanel /> */}
          <ExpertAboutMe/>
          <WhatToExpectExpertPanel />
          {/* <ScheduleQuickCallsExpertPanel /> */}
          <AboutMeReviews/> 
          <ExpertFeatureHighightsExpertPanel />
          <SimilarExpertsExpertPanel />
        </div>
      </div>
    </div>
    <div>
    <Footer/>
    <BottomNav/>
    </div>
    </>
  );
};

export default Page;
