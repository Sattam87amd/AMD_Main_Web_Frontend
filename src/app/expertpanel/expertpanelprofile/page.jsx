'use client';

import React from 'react';
import ProfileSection from '@/components/ExpertPanel/ExpertPanelProfile/ProfileSection';
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with 1/3 width */}
      <div className="md:w-[20%]">
        <Sidebar />
      </div>

      {/* Right Side Content with 2/3 width */}
      <div className="md:w-[80%] p-4">
        <ProfileSection />
      </div>
    </div>
  );
};

export default Page;
