import React from "react";
import NavSearch from "@/components/UserPanel/NavSearch/NavSearch";
// import ScheduleQuickCallsExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/ScheduleQuickCallsExpertPanel";
// import ExpertFeatureHighightsExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/ExpertFeatureHighightsExpertPanel";
// import SimilarExpertsExpertPanel from "@/components/ExpertPanel/ExpertPanelAboutMe/SimilarExpertsExpertPanel";
import Footer from "@/components/userpanel/Layout/Footer";
import UserExpertAboutMe from "@/components/UserPanel/UserAboutMe/UserExpertAboutMe";
import UserWhatToExpect from "@/components/UserPanel/UserAboutMe/UserWhatToExpect";
import UserScheduleQuickCalls from "@/components/UserPanel/UserAboutMe/UserScheduleQuickCalls";
import UserAboutMeReviews from "@/components/UserPanel/UserAboutMe/UserAboutMeReviews";
import UserExpertFeatureHighights from "@/components/UserPanel/UserAboutMe/UserExpertFeatureHighights";
import UserSimilarExperts from "@/components/UserPanel/UserAboutMe/UserSimilarExperts";
import BottomNav from "@/components/UserPanel/BottomNav/BottomNav";
import UserSidebar from "@/components/UserPanel/UseSideBar/UserSidebar";

const Page = () => {
  return (
    <>
    <div className="flex min-h-full">
      {/* Sidebar (Left Section - 20% Width) */}
      <aside className="w-[15%] h- screen hidden md:block">
        <UserSidebar />
      </aside>

      {/* Main Content (Right Section - 80% Width) */}
      <div className="w-full md:w-[85%] flex flex-col">
        {/* Navbar - Only visible on desktop */}
        <div className="hidden md:block">
          <NavSearch />
        </div>

        {/* Content Container - Ensures Consistent Spacing */}
        <div className="space-y-8 px-4 md:px-8">
          <UserExpertAboutMe />
          <UserWhatToExpect />
          <UserScheduleQuickCalls />
          <UserAboutMeReviews/>   
          <UserExpertFeatureHighights />
          <UserSimilarExperts />
        </div>
      </div>
    </div>
    <div>
    <Footer className="z-10"/>
    <BottomNav/>
    </div>
    </>
  );
};

export default Page;
