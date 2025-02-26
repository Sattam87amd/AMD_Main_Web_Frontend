import React from "react";
import Navbar from "@/components/Layout/Navbar";
import ExpertAboutMe from "@/components/ExpertAboutMe/ExpertAboutMe";
import WhatToExpect from "@/components/ExpertAboutMe/WhatToExpect";
import ScheduleQuickCalls from "@/components/ExpertAboutMe/ScheduleQuickCalls ";

const page = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="md:mt-20">
        <ExpertAboutMe />
        <WhatToExpect />
        <ScheduleQuickCalls/>
      </div>
    </div>
  );
};

export default page;
