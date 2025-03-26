"use client";

import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import Dashboard from "@/components/ExpertPanel/Dashboard/Dashboard";
import CouponUserCount from "@/components/ExpertPanel/Dashboard/CouponUserCount";
import Navtop from "@/components/ExpertPanel/Navtop/navtop";
import { usePathname } from "next/navigation";
import ExpertBooking from "@/components/ExpertPanel/ExpertBooking/ExpertBooking";

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
      <div className="w-full md:w-[80%] p-4 pb-20">
        <Navtop activeTab={activeTab} />
        <ExpertBooking/>
      </div>
    </div>
  );
};

export default Page;
