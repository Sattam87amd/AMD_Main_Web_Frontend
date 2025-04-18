"use client";

import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import Navtop from "@/components/ExpertPanel/Navtop/navtop";
import { usePathname } from "next/navigation";
import ExpertBooking from "@/components/ExpertPanel/ExpertBooking/ExpertBooking";
import BottomNav from "@/components/ExpertPanel/Bottomnav/bottomnav";

const Page = () => {
  const pathname = usePathname();

  // Map sidebar routes to labels (must match Sidebar)
  const menuItems = [
    { label: "Expert", route: "/expertpanel/expert" },
   
  ];

  const activeMenu = menuItems.find((item) => item.route === pathname);
  const activeTab = activeMenu ? activeMenu.label : "Booking";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar: visible on desktop */}
      <div className="hidden md:block w-[20%]"> 
        <Sidebar />
      </div>
      {/* Main Content: full width on mobile, 80% on desktop */}
      <div className="w-full md:w-[80%] p-4 pb-30">
        <Navtop activeTab={activeTab} />
        <ExpertBooking/>
      </div>
      <div>
        <BottomNav/>
      </div>
    </div>
  );
};

export default Page;
