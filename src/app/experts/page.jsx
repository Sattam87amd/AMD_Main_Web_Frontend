"use client";

import Cab from "@/components/cab/cab";
import Fbexpert from "@/components/fbexpert/fbexpert";
import MobileNavSearch from "@/components/mobilenavsearch/mobilenavsearch";
import NavSearch from "@/components/navsearch/navsearch";
import RegisterPage from "@/components/RegisterLogin/Register";
import TopExperts from "@/components/topexperts/topexperts";
import Wellnessexpert from "@/components/wellnessexperts/wellnessexperts";
import Wellness from "@/components/wellnessexperts/wellnessexperts";
import React from "react";
import Home from "../page";
import Homeexpert from "@/components/homeexpert/homeexpert";

const Page = () => {
  return (
    
    <div>
      {/* Desktop View - NavSearch */}
      <div className="hidden md:block">
        <NavSearch />
        <TopExperts/>
        <Wellnessexpert/>
        <Fbexpert/>
        <Cab/>
        <Homeexpert/>
      
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <TopExperts/>
        <Wellnessexpert/>
        <Fbexpert/>
        <Cab/>
        <Homeexpert/>
      </div>
    </div>
  );
};

export default Page;
