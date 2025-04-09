'use client'

import Footer from '@/components/userpanel/Layout/Footer'
import { usePathname } from 'next/navigation';
import UserNavtop from '@/components/userpanel/UseNavTop/UserNavTop'
import UserBottomNav from '@/components/userpanel/UserBottomNav/UserBottomNav'
import UserProfileSection from '@/components/userpanel/Userloginpanel/UserProfileSection'
import UseSidebar from '@/components/userpanel/UseSideBar/UserSidebar'
import React from 'react'


const Page = () => {
    const pathname = usePathname();
  
    // Map the routes to their labels (should match the Sidebar menu items)
    const menuItems = [
      { label: "Find Experts", route: "/userpanel/login-findexperts" },
      { label: "Video Call", route: "/userpanel/videocall" },
      { label: "Profile", route: "/userpanel/login/userloginpanel" },
    ];
  
    const activeItem = menuItems.find(item => item.route === pathname);
    const activeTab = activeItem ? activeItem.label : "Profile"; // Default value if no match
  
    return (
      <>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="md:w-[20%]">
            <UseSidebar />
          </div>
  
          {/* Main Content */}
          <div className="md:w-[80%] p-4">
            <UserNavtop activeTab={activeTab} />
            <UserProfileSection />
          </div>
  
          {/* Bottom Navigation for Mobile */}
          <div className="fixed bottom-0 left-0 right-0 md:hidden">
            <UserBottomNav  />
          </div>
        </div>
        <div className="md:mt-3.5">
          <Footer />
        </div>
      </>
    );
  };
  
export default Page