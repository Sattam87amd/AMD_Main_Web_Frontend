'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import UserProfileSection from '@/components/userpanel/UserPanelProfile/UserProfileSection';
import Navtop from '@/components/userpanel/NavTop/NavTopuser';
import BottomNav from '@/components/userpanel/BottomNav/BottomNav';
import UserSidebar from '@/components/userpanel/UseSideBar/UserSidebar';
import Footer from '@/components/userpanel/Layout/Footer';


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
          <UserSidebar />
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
