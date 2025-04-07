"use client";

import Cab from "@/components/Experts/CAB/cab";
import Fbexpert from "@/components/Experts/Fashion&Beauty-expert/fbexpert";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import TopExperts from "@/components/Experts/Topexpert/logintopexpert";
import Wellnessexpert from "@/components/Experts/Wellness/wellnessexperts";
import React from "react";

import ThreePara from "@/components/Experts/Threepara/threepara";
import Footer from "@/components/Layout/Footer";
import Homeexpert from "@/components/Experts/Homeexpert/homeexpert";

const Page = () => {
  return (
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <TopExperts />
        <Wellnessexpert />
        <Fbexpert />
        <Cab />
        <Homeexpert />
        <ThreePara />
        <Footer />
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <TopExperts />
        <Wellnessexpert />
        <Fbexpert />
        <Cab />
        <Homeexpert />
        <ThreePara />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
