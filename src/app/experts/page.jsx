
"use client";

import CareerBusinessBefore from "@/components/ExpertBeforeLogin/Career&BusinessBefore";
import FashionBeautyBefore from "@/components/ExpertBeforeLogin/Fasion&BeautyBefore";
import HomeExpertsBefore from "@/components/ExpertBeforeLogin/HomeExpertBefore";
import ExpertsCardsBefore from "@/components/ExpertBeforeLogin/TopExpertsBefore";
import WellnessBefore from "@/components/ExpertBeforeLogin/WellnessBefore";
import ExpertCategory from "@/components/ExpertCategory/ExpertCategory";
import Threepara from "@/components/Experts/Threepara/threepara";
import Footer from "@/components/Layout/Footer";
import NavSearch from "@/components/Layout/navsearch";

const Page = () => {
  
  return (
    <div className="flex min-h-screen flex-col">
      

        {/* Main Content (Right Section - 80% Width) */}
        <div className='w-full flex flex-col'>
          {/* Desktop View - NavSearch */}
          <div className="">
            <NavSearch />
            <ExpertCategory/>
            <div className="space-y-8 px-4 md:px-8">
              <ExpertsCardsBefore/>
              
             <WellnessBefore/>
             <FashionBeautyBefore/>
             <CareerBusinessBefore/>
             <HomeExpertsBefore/>
              <Threepara />
            </div>
          </div>
        </div>
      

      {/* Footer (Full Width) */}
      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
