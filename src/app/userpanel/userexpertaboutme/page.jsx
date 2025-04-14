import React from "react";
import Footer from "@/components/UserPanel/Layout/Footer";
import UserExpertAboutMe from "@/components/UserPanel/UserAboutMe/UserExpertAboutMe";
import UserWhatToExpect from "@/components/UserPanel/UserAboutMe/UserWhatToExpect";
import UserAboutMeReviews from "@/components/UserPanel/UserAboutMe/UserAboutMeReviews";
import UserExpertFeatureHighights from "@/components/UserPanel/UserAboutMe/UserExpertFeatureHighights";
import UserSimilarExperts from "@/components/UserPanel/UserAboutMe/UserSimilarExperts";
// import BottomNav from "@/components/UserPanel/BottomNav/BottomNav";
import UserSidebar from "@/components/UserPanel/UseSideBar/UserSidebar";
import UserNavSearch from "@/components/UserPanel/Layout/NavSearch";
import UserBottomNav from "@/components/UserPanel/UserBottomNav/UserBottomNav";
import UserMobileNavSearch from "@/components/UserPanel/Experts/UserMobileexpert/UserMobileNavSearch";
import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import LoginUserMobNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobNavSearch";

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
          <UserNavSearch />
        </div>
        <div className="block md:hidden">
  <LoginUserMobNavSearch />
</div>

        {/* Content Container - Ensures Consistent Spacing */}
        <div className="space-y-8 px-4 md:px-8 pb-12 md:pb-0">
          <UserExpertAboutMe />
          <UserWhatToExpect />
          <UserAboutMeReviews/>   
          <UserExpertFeatureHighights />
          <UserSimilarExperts />
        </div>
      </div>
    </div>
    <div className="z-10 hidden md:block">
    <Footer />
    </div>
    <div >
          <UserBottomNav/>
        </div>
    </>
  );
};

export default Page;
