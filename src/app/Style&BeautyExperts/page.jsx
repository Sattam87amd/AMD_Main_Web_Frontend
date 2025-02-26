"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import Homeexperts from "@/components/Experts/Homeexperts/homeexperts";
import CareerBuisnessExperts from "@/components/Experts/Career&Buisness/Career&Buisness";
import StyleBeautyExperts from "@/components/Experts/Style&BeautyExpert/Style&BeautyExpert";


const Page = () => {
  return (
    
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <StyleBeautyExperts/>
        <Footer/>

      
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <StyleBeautyExperts/>
        <Footer/>

      </div>
    </div>
  );
};

export default Page;
