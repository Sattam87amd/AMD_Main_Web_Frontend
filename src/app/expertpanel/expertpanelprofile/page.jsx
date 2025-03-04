'use client';

import React from 'react';
import ProfileSection from '@/components/ExpertPanel/ExpertPanelProfile/ProfileSection';
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Right Side Content (Always Profile Section) */}
      <div className="flex-1 p-4">
        <ProfileSection />
      </div>
    </div>
  );
};

export default Page;
