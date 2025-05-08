"use client";

import React from 'react';
import { usePathname } from "next/navigation"; // Import usePathname
import Sidebar from '@/components/ReviewingExpertPanel/SideBar/SideBar';
import Navtop from '@/components/ReviewingExpertPanel/Navtop/navtop';
import ExpertReview from '@/components/ReviewingExpertPanel/Expertreview/expertreview';
import BottomNav from '@/components/ReviewingExpertPanel/Bottomnav/bottomnav';
import MobileNavSearch from '@/components/Layout/mobilenavsearch';

const Page = () => {
  const pathname = usePathname(); // Get current route
  const activeTab = "Payments/Reviews";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with 1/3 width - Hidden on mobile */}
      <div className="hidden md:block md:w-[20%]">
        <Sidebar activeRoute={pathname} />
      </div>

      {/* Right Side Content with 2/3 width */}
      <div className="w-full md:w-[80%] p-4">
        <div className="w-[27rem]">
        <MobileNavSearch/>
        </div>
        <Navtop activeTab={activeTab} />
        <div className="sm:block w-[25rem] md:w-full">
        <ExpertReview />
        </div>

        {/* Bottom Navigation - Visible only on mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default Page;
