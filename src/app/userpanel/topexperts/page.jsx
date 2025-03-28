"use client";
import Footer from "@/components/Layout/Footer";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";
import NavSearch from "@/components/Layout/navsearch";
import TopExpert from "@/components/Experts/Topeexperts/topexperts";
import Sidebar from "@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar";


const Page = () => {
  return (
    
    <div className="flex min-h-screen flex-col" >
       <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[15%] h-[85%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <Sidebar />
        </aside>
        

<div className="w-full md:[85%] flex flex-col ">
        <NavSearch />
        <TopExpert/>
        

      
      </div>

      {/* Mobile View - MobileNavSearch */}
      <div className="block md:hidden">
        <MobileNavSearch />
        <TopExpert/>
        <Footer/>

      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Page;
