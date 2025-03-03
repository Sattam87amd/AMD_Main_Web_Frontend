'use client';

import React, { useState } from 'react';
import ProfileSection from '@/components/ExpertPanel/ExpertPanelProfile/ProfileSection';
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';

const Page = () => {
  const [selectedSection, setSelectedSection] = useState("Find Experts"); // Default to "Find Experts"

  return (
    <div className="flex">
      <Sidebar isOpen={true} setSelectedSection={setSelectedSection} />
      
        <ProfileSection />
      
    </div>
  );
};

export default Page;
