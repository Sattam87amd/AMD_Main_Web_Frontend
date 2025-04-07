import React from "react";
import Navbar from "@/components/Layout/Navbar";
import ExpertAboutMe from "@/components/ExpertAboutMe/ExpertAboutMe";
import WhatToExpect from "@/components/ExpertAboutMe/WhatToExpect";
import ScheduleQuickCalls from "@/components/ExpertAboutMe/ScheduleQuickCalls ";
import Footer from "@/components/Layout/Footer";
import AboutMeReviews from "@/components/ExpertAboutMe/AboutMeReviews";
import ExpertFeatureHighights from "@/components/ExpertAboutMe/ExpertFeatureHighights";
import SimilarExperts from "@/components/ExpertAboutMe/SimilarExperts";

const page = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="md:mt-20">
        <ExpertAboutMe />
        <WhatToExpect />
        {/* <ScheduleQuickCalls/> */}
        <AboutMeReviews/>
        <ExpertFeatureHighights/>
        <SimilarExperts/>
        <Footer/>
      </div>
    </div>
  );
};

export default page;
