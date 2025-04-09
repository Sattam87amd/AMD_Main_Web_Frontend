"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import ExpertCategory from "@/components/ExpertCategory/ExpertCategory";
import StyleBeautyExperts from "@/components/Experts/Style&BeautyExpert/Style&BeautyExpert";

const Page = () => {
  return (
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <ExpertCategory/>
        <StyleBeautyExperts />
        <Footer />
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <ExpertCategory/>
        <StyleBeautyExperts />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
