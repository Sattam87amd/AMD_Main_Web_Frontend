"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import WellnessExperts from "@/components/Experts/WellnessExperts/WellnessExperts";
import ExpertCategory from "@/components/ExpertCategory/ExpertCategory";
import LoginExpertCategory from "@/components/userpanel/LoginExpertCategory/LoginExpertCategory";
// import ExpertCategory from "@/components/ExpertCategory/ExpertCategory";


const Page = () => {
  return (
    
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <LoginExpertCategory/>
        <WellnessExperts/>
        <Footer/>

      
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        {/* <ExpertCategory/> */}
        <WellnessExperts/>
        <Footer/>

      </div>
    </div>
  );
};

export default Page;
