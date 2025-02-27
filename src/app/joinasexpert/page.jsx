import FeatureHighlights from "@/components/ContactUs/FeatureHighlights";
import OurClientsSay from "@/components/HomePage/OurClientsSay";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import React from "react";

import WhyJoinUs from "@/components/JoinAsExpert/WhyJoinUs";
import GameChanger from "@/components/JoinAsExpert/GameChanger";
import HowItWork from "@/components/JoinAsExpert/HowItWork";
import BecomeExpert from "@/components/JoinAsExpert/BecomeExpert";

const page = () => {
  return (
    <div>
      <Navbar />
      <BecomeExpert />
      <WhyJoinUs />

      <OurClientsSay />
      <FeatureHighlights />
      <HowItWork />
      <GameChanger />
      <Footer />
    </div>
  );
};

export default page;
