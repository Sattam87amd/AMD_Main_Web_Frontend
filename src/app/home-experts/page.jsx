"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import Homeexperts from "@/components/Experts/Homeexperts/homeexperts";
import SideBar from "@/components/ExpertPanel/SideBar/SideBar";



const Page = () => {
  return (
    
    <div className="md:flex min-h-screen relative">
      {/* <SideBar/> */}
      {/* Desktop View - NavSearch */}
      <div className="hidden  md:block">
        <NavSearch />
        <Homeexperts/>
        <Footer/>

      
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <Homeexperts/>
        <Footer/>

      </div>
    </div>
  );
};

export default Page;


