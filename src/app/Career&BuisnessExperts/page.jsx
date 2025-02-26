"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import Homeexperts from "@/components/Experts/Homeexperts/homeexperts";
import CareerBuisnessExperts from "@/components/Experts/Career&Buisness/Career&Buisness";


const Page = () => {
  return (
    
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <CareerBuisnessExperts/>
        <Footer/>

      
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <CareerBuisnessExperts/>
        <Footer/>

      </div>
    </div>
  );
};

export default Page;
