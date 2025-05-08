'use client';

import React from 'react';
import Sidebar from '@/components/ReviewingExpertPanel/SideBar/sideBar';
import Navtop from '@/components/ReviewingExpertPanel/Navtop/navtop';
import BottomNav from '@/components/ReviewingExpertPanel/Bottomnav/bottomNav';
//import ExpertChat from '@/components/ReviewingExpertPanel/ExpertChat/Expertchat';

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with 1/3 width - Hidden on mobile */}
      <div className="hidden md:block md:w-[20%]">
        <Sidebar />
      </div>

      {/* Right Side Content with 2/3 width */}
      <div className="w-full md:w-[80%] p-4">
        <Navtop />
        {/*
        <ExpertChat />
        */}

        {/* Bottom Navigation - Visible only on mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default Page;
