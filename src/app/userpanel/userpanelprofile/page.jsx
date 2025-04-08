'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
// import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';
// import Navtop from '@/components/ExpertPanel/Navtop/navtop';
import UserProfileSection from '@/components/UserPanel/UserPanelProfile/UserProfileSection';
// import BottomNav from '@/components/ExpertPanel/Bottomnav/bottomnav';
import Footer from '@/components/Layout/Footer';
import Sidebar from '@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar';
import Navtop from '@/components/UserPanel/NavTop/NavTopuser';
import BottomNav from '@/components/UserPanel/BottomNav/BottomNav';
import UseSidebar from '@/components/UserPanel/UseSideBar/UserSidebar';


const Page = () => {
  const pathname = usePathname();

  // Map the routes to their labels (should match the Sidebar menu items)
  const menuItems = [
    { label: "Find Experts", route: "/experts" },
    { label: "Video Call", route: "/userpanel/videocall" },
    { label: "Profile", route: "/userpanel/expertpanelprofile" },

  ];

  const activeItem = menuItems.find(item => item.route === pathname);
  const activeTab = activeItem ? activeItem.label : "Profile"; // Default value if no match

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="md:w-[20%] ">
          <UseSidebar />
        </div>

        {/* Main Content */}
        <div className="md:w-[80%] p-4  ">
          <Navtop activeTab={activeTab} />
          <UserProfileSection />
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomNav />
        </div>
      </div>
      <div className="md:mt-3.5">
        <Footer />
      </div>
    </>
  );
};

export default Page;
