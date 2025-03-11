'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import ExpertProfile from "@/components/ExpertPanel/Expert/ExpertProfile";
import EditExpertProfile from "@/components/ExpertPanel/Expert/EditExpertProfile";
import Footer from "@/components/Layout/Footer";

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
    <>
    <div className="flex min-h-screen">
      {/* Sidebar with 20% width */}
      <div className="md:w-[20%]">
        <Sidebar />
      </div>

      {/* Right Side Content with 80% width */}
      <div className="md:w-[80%] p-4">
        {(!isMobile || showProfile) && <ExpertProfile expertData={expertData} />}
        <EditExpertProfile
          expertData={expertData}
          setExpertData={setExpertData}
          setShowProfile={setShowProfile}
        />
      </div>
    </div>
    <div className="md:mt-2">
    <Footer/>
    </div>
    </>
  );
};

export default Page;
