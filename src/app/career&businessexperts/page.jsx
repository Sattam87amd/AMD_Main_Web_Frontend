"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";

import CareerBuisnessExperts from "@/components/Experts/Career&Buisness/Career&Buisness";
import ExpertCategory from "@/components/ExpertCategory/ExpertCategory";


const Page = () => {
  return (
    
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <ExpertCategory/>
        <CareerBuisnessExperts/>
        <Footer/>

      
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <ExpertCategory/>
        <CareerBuisnessExperts/>
        <Footer/>

      </div>
    </div>
  );
};

export default Page;
