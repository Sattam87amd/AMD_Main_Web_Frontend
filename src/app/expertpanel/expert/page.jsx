"use client";

import { useState } from "react";
import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import ExpertProfile from "@/components/ExpertPanel/Expert/ExpertProfile";
import EditExpertProfile from "@/components/ExpertPanel/Expert/EditExpertProfile";

const Page = () => {
  // Lift expertData state up so both components share it
  const [expertData, setExpertData] = useState({
    firstName: "Basim",
    lastName: "Thakur",
    expertise: "Software Development",
    country: "India",
  });

  return (
    <div className="flex min-h-screen">
      {/* Universal Sidebar (this remains unchanged) */}
      <Sidebar />

      {/* Right Side Content */}
      <div className="flex-1 p-4">
        {/* Display Component shows current expert data */}
        <ExpertProfile expertData={expertData} />
        {/* Edit Component updates expertData */}
        <EditExpertProfile expertData={expertData} setExpertData={setExpertData} />
      </div>
    </div>
  );
};

export default Page;
