"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import Homeexpert from "@/components/Experts/Homeexpert/homeexpert";
import ExpertCategory from "@/components/ExpertCategory/ExpertCategory";
// import LoginExpertCategory from "@/components/UserPanel/LoginExpertCategory/LoginExpertCategory";

const Page = () => {
  return (
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <ExpertCategory/>
        <Homeexpert />
        <Footer />
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <ExpertCategory/>
        <Homeexpert />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
