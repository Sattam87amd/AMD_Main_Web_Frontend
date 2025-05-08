'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
// import ProfileSection from '@/components/ReviewingExpertPanel/expertpanelProfile/ProfileSection';
import ProfileSection from '@/components/ReviewingExpertPanel/ExpertPanelProfile/ProfileSection';
import Sidebar from '@/components/ReviewingExpertPanel/SideBar/sideBar';
import Footer from '@/components/Layout/Footer';
import Navtop from '@/components/ReviewingExpertPanel/Navtop/navtop';
import BottomNav from '@/components/ReviewingExpertPanel/Bottomnav/bottomNav';
import MobileNavSearch from '@/components/Layout/mobilenavsearch';

const Page = () => {
  const pathname = usePathname();

  // Map the routes to their labels (should match the Sidebar menu items)
  const menuItems = [
    { label: "Find Experts", route: "/experts" },
    { label: "Video Call", route: "/reviewingexpertpanel/videocall" },
    { label: "Profile", route: "/reviewingexpertpanel/expertpanelprofile" },
    { label: "Expert", route: "/reviewingexpertpanel/expert" },
    { label: "Dashboard", route: "/reviewingexpertpanel/dashboard" },
    { label: "Payments/Reviews", route: "/reviewingexpertpanel/payments" },
    { label: "Logout", route: "/" },
    { label: "Chat with Users", route: "/reviewingexpertpanel/chat" },
  ];

  const activeItem = menuItems.find(item => item.route === pathname);
  const activeTab = activeItem ? activeItem.label : "Profile"; // Default value if no match

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="md:w-[20%]">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-[100%] md:w-[80%] md:p-4">
          <MobileNavSearch/>
          <Navtop activeTab={activeTab} />
          <ProfileSection />
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomNav />
        </div>
      </div>
      <div className="md:mt-3.5 hidden sm:block">
        <Footer />
      </div>
    </>
  );
};

export default Page;
