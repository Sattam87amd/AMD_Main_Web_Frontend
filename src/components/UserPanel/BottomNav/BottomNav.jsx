"use client";

// import Navtop from "@/components/ExpertPanel/Navtop/navtop";
import Footer from "@/components/Layout/Footer";
// import Sidebar from "@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar";
// import Navtop from "@/components/UserPanel/Navtop/Navtop";
import UserProfile from "@/components/UserPanel/UserProfile/UserProfile";

import { usePathname } from "next/navigation";
import Sidebar from "../LoginUserExpert/SideBar/SideBar";
import Navtop from "../NavTop/NavTop";
// import Navtop from "@/components/ExpertPanel/Navtop/navtop";

const Page = () => {
  const pathname = usePathname();

  // Map sidebar routes to labels (must match Sidebar)
  const menuItems = [
    { label: "Expert", route: "/expertpanel/expert" },
   
  ];

  const activeMenu = menuItems.find((item) => item.route === pathname);
  const activeTab = activeMenu ? activeMenu.label : "Booking";

  return (
    <>
    <div className="flex min-h-screen">
      {/* Sidebar: visible on desktop */}
      <div className="hidden md:block w-[20%]">
        <Sidebar />
      </div>
      {/* Main Content: full width on mobile, 80% on desktop */}
      <div className="w-full md:w-[80%] p-4 pb-20">
        <Navtop activeTab={activeTab} />
        <UserProfile/>
      </div>
      
    </div>
<Footer/>
    </>
  );
};

export default Page;
