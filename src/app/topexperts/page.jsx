"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import TopExpert from "@/components/Experts/Topexpert/TopExpert";


const Page = () => {
  return (
    
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <TopExpert/>
        <Footer/>

      
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <TopExpert/>
        <Footer/>

      </div>
    </div>
  );
};

export default Page;
