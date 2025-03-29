import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import OurMission from "@/components/OurMisssion/OurMission";
import GameChanger from "@/components/JoinAsExpert/GameChanger";

import React from "react";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[6rem]">
        <OurMission />
        <GameChanger />
      </div>
      <Footer />
    </div>
  );
}; 

export default Page;
