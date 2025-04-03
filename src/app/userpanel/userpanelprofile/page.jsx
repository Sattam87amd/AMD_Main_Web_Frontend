'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
// import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';
// import Navtop from '@/components/ExpertPanel/Navtop/navtop';
import UserProfileSection from '@/components/UserPanel/UserPanelProfile/UserProfileSection';
// import BottomNav from '@/components/ExpertPanel/Bottomnav/bottomnav';
import Footer from '@/components/Layout/Footer';
<<<<<<< HEAD
// import Sidebar from '@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar';
// import Navtop from '@/components/UserPanel/Navtop/Navtop';
import BottomNav from '@/components/UserPanel/BottomNav/BottomNav';
import Sidebar from '@/components/UserPanel/LoginUserExpert/SideBar/SideBar';
import Navtop from '@/components/UserPanel/NavTop/NavTop';
=======
import Sidebar from '@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar';
import Navtop from '@/components/UserPanel/Navtop/Navtop';
import BottomNav from '@/components/UserPanel/BottomNav/BottomNav';
import UseSidebar from '@/components/UserPanel/UseSideBar/UserSidebar';
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32


const Page = () => {
  const pathname = usePathname();

  // Map the routes to their labels (should match the Sidebar menu items)
  const menuItems = [
    { label: "Find Experts", route: "/experts" },
<<<<<<< HEAD
    { label: "Video Call", route: "/expertpanel/videocall" },
=======
    { label: "Video Call", route: "/userpanel/videocall" },
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
    { label: "Profile", route: "/expertpanel/expertpanelprofile" },
    { label: "Expert", route: "/expertpanel/expert" },
    { label: "Dashboard", route: "/expertpanel/dashboard" },
    { label: "Payments/Reviews", route: "/expertpanel/payments" },
    { label: "Logout", route: "/" },
    { label: "Chat with Users", route: "/expertpanel/chat" },
  ];

  const activeItem = menuItems.find(item => item.route === pathname);
  const activeTab = activeItem ? activeItem.label : "Profile"; // Default value if no match

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
<<<<<<< HEAD
        <div className="md:w-[20%]">
          <Sidebar/>
        </div>

        {/* Main Content */}
        <div className="md:w-[80%] p-4">
          < Navtop activeTab={activeTab} />
=======
        <div className="md:w-[20%] ">
          <UseSidebar />
        </div>

        {/* Main Content */}
        <div className="md:w-[80%] p-4  ">
          <Navtop activeTab={activeTab} />
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
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
