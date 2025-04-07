"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import Homeexpert from "@/components/Experts/Homeexpert/homeexpert";

const Page = () => {
  return (
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <Homeexpert />
        <Footer />
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <Homeexpert />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
