'use client';

import React from 'react';
import ProfileSection from '@/components/ExpertPanel/ExpertPanelProfile/ProfileSection';
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';
import Footer from '@/components/Layout/Footer';
import Navtop from '@/components/ExpertPanel/Navtop/navtop';
import BottomNav from '@/components/ExpertPanel/Bottomnav/bottomnav';

const Page = () => {
  return (
    <>
    <div className="flex min-h-screen">
      {/* Sidebar with 1/3 width */}
      <div className="md:w-[20%]">
        <Sidebar />
      </div>

      {/* Right Side Content with 2/3 width */}
      <div className="md:w-[80%] p-4">
        <Navtop/>
        <ProfileSection />
      </div>
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomNav/>
        </div>
    </div>
    <div className="md:mt-3.5">
    <Footer/>

    </div>
    </>
  );
};

export default Page;
