"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import ExpertProfile from "@/components/ExpertPanel/Expert/ExpertProfile";
import EditExpertProfile from "@/components/ExpertPanel/Expert/EditExpertProfile";

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* On desktop, always show the profile; on mobile, show it based on state */}
        {(!isMobile || showProfile) && <ExpertProfile expertData={expertData} />}
        
        {/* Pass the setter here to control visibility */}
        <EditExpertProfile
          expertData={expertData}
          setExpertData={setExpertData}
          setShowProfile={setShowProfile}
        />
      </div>
    </div>
  );
};

export default Page;
