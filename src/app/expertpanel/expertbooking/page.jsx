import ExpertBooking from "@/components/ExpertPanel/ExpertBooking/ExpertBooking";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";

import Navbar from "@/components/Layout/Navbar";

import React from "react";

const page = () => {
  return (
    <div className="md:flex min-h-screen relative">
      <Sidebar />
      {/* Desktop View - NavSearch */}
      <div className=" w-5/6 md:block">
        <Navbar />
        <ExpertBooking />
      </div>

      {/* Mobile View - MobileNavSearch */}
      {/* <div className="block md:hidden">
        <MobileNavSearch />
        <Homeexperts/>
        <Footer/>

      </div> */}
    </div>
  );
};

export default page;
