"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/ReviewingExpertPanel/SideBar/SideBar";
import ExpertProfile from "@/components/ReviewingExpertPanel/Expert/ExpertProfile";
import EditExpertProfile from "@/components/ReviewingExpertPanel/Expert/EditExpertProfile";
import Footer from "@/components/Layout/Footer";
import Navtop from "@/components/ReviewingExpertPanel/Navtop/navtop";
import BottomNav from "@/components/ReviewingExpertPanel/Bottomnav/bottomnav";
import MobileNavSearch from "@/components/Layout/mobilenavsearch";

const Page = () => {
  const [expertData, setExpertData] = useState({
    firstName: "Basim",
    lastName: "Thakur",
    expertise: "Software Development",
    country: "India",
  });

  // Control ExpertProfile visibility on mobile
  const [showProfile, setShowProfile] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();

  // Map sidebar routes to labels (must match Sidebar)
  const menuItems = [
    { label: "Find Experts", route: "/experts" },
    { label: "Video Call", route: "/ReviewingExpertPanel/videocall" },
    { label: "Profile", route: "/ReviewingExpertPanel/expertpanelprofile" },
    { label: "Expert", route: "/ReviewingExpertPanel/expert" },
    { label: "Dashboard", route: "/ReviewingExpertPanel/dashboard" },
    { label: "Payments/Reviews", route: "/ReviewingExpertPanel/payments" },
    { label: "Logout", route: "/" },
    { label: "Chat with Users", route: "/ReviewingExpertPanel/chat" },
  ];

  const activeMenu = menuItems.find((item) => item.route === pathname);
  const activeTab = activeMenu ? activeMenu.label : "Profile";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar with 20% width */}
        <div className="md:w-[20%]">
          <Sidebar />
        </div>

        {/* Right Side Content with 80% width */}
        <div className="md:w-[80%] md:p-4 w-[100%]">
          <MobileNavSearch/>
          <Navtop activeTab={activeTab} />
          {(!isMobile || showProfile) && <ExpertProfile expertData={expertData} />}
          <EditExpertProfile
            expertData={expertData}
            setExpertData={setExpertData}
            setShowProfile={setShowProfile}
          />
        </div>
      </div>
      <div className="md:mt-2 hidden sm:block">
        <Footer />
      </div>
      <div>
        <BottomNav/>
      </div>
    </>
  );
};

export default Page;
