"use client"
import BottomNav from '@/components/UserPanel/BottomNav/BottomNav';
import Footer from '@/components/UserPanel/Layout/Footer';
import Navtop from '@/components/UserPanel/NavTop/NavTopuser';
import UserSidebar from '@/components/UserPanel/UseSideBar/UserSidebar';
import UserVideoCall from '@/components/UserPanel/VideoCall/UserVideoCall';
import { usePathname } from "next/navigation";

import React from 'react'

const page = () => {

    // Define Sidebar menu items with route mapping
  const menuItems = [
    { label: "Video Call", route: "/expertpanel/videocall" },
  ];
  
  const pathname = usePathname()
  
  const activeMenu = menuItems.find((item) => item.route === pathname)
  const activeTab = activeMenu ? activeMenu.label : "Video Call";
  
    return (
      <>
      <div className="flex min-h-screen">
        {/* Sidebar with 1/3 width - Hidden on mobile */}
        <div className="hidden md:block md:w-[20%] h-[20%]">
          <UserSidebar/>
        </div>
  
        {/* Right Side Content with 2/3 width */}
        <div className="w-full md:w-[80%] p-4">
          <Navtop activeTab={activeTab}/>
          <UserVideoCall activeTab={activeTab}/>
         
  
          {/* Bottom Navigation - Visible only on mobile */}
          <div className="fixed bottom-0 left-0 right-0 md:hidden">
            <BottomNav/>
            
          </div>
        </div>
        
      </div>
        <Footer />
      </>
    );
  };

export default page;
