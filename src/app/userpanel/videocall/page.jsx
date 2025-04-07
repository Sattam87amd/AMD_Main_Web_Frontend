"use client"
import BottomNav from '@/components/ExpertPanel/Bottomnav/bottomnav';
<<<<<<< HEAD
// import Navtop from '@/components/ExpertPanel/NavTop/NavTop';
// import Navtop from '@/components/ExpertPanel/Navtop/navtop';
// import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';
import Footer from '@/components/Layout/Footer';
import Sidebar from '@/components/UserPanel/LoginUserExpert/SideBar/SideBar';
import Navtop from '@/components/UserPanel/NavTop/NavTop';
=======
import Navtop from '@/components/ExpertPanel/Navtop/navtop';
// import Navtop from '@/components/ExpertPanel/Navtop/navtop';
// import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';
import Footer from '@/components/Layout/Footer';

import UseSidebar from '@/components/UserPanel/UseSideBar/UserSidebar';
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
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
<<<<<<< HEAD
  const activeTab = activeMenu ? activeMenu.label : "Video Call";
=======
  const activeTab = activeMenu ? activeMenu.label : "Booking";
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
  
    return (
      <>
      <div className="flex min-h-screen">
        {/* Sidebar with 1/3 width - Hidden on mobile */}
<<<<<<< HEAD
        <div className="hidden md:block md:w-[20%]">
          <Sidebar/>
=======
        <div className="hidden md:block md:w-[20%] h-[20%]">
          <UseSidebar/>
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
        </div>
  
        {/* Right Side Content with 2/3 width */}
        <div className="w-full md:w-[80%] p-4">
          <Navtop activeTab={activeTab}/>
          <UserVideoCall activeTab={activeTab}/>
<<<<<<< HEAD
          
         

=======
         
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
  
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


