"use client";

import Sidebar from "@/components/ExpertPanel/SideBar/SideBar";
import Dashboard from "@/components/ExpertPanel/Dashboard/Dashboard";
import CouponUserCount from "@/components/ExpertPanel/Dashboard/CouponUserCount";

const Page = () => {

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full p-4 pb-20">
        <Dashboard />
        <CouponUserCount/>
      </div>
    </div>
  );
};

export default Page;
