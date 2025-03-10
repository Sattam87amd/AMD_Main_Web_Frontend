"use client";

import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import Dashboard from "@/components/ExpertPanel/Dashboard/Dashboard";
import CouponUserCount from "@/components/ExpertPanel/Dashboard/CouponUserCount";

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar: visible on desktop */}
      <div className="hidden md:block w-[20%]">
        <Sidebar />
      </div>
      {/* Main Content: full width on mobile, 80% on desktop */}
      <div className="w-full md:w-[80%] p-4 pb-20">
        <Dashboard />
        <CouponUserCount />
      </div>
    </div>
  );
};

export default Page;
