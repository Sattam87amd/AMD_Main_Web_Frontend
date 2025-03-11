'use client';

import React from 'react';
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar';
import Navtop from '@/components/ExpertPanel/Navtop/navtop';
import ChatComponent from '@/components/ExpertPanel/ChatComponent/chatcomponent';
import BottomNav from '@/components/ExpertPanel/Bottomnav/bottomnav';
import PaymentLogin from '@/components/ExpertPanel/ExpertloginPayment/paymentlogin';

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with 1/3 width - Hidden on mobile */}
      <div className="hidden md:block md:w-[20%]">
        <Sidebar />
      </div>

      {/* Right Side Content with 2/3 width */}
      <div className="w-full md:w-[80%] p-4">
        <Navtop />
        <PaymentLogin />

        {/* Bottom Navigation - Visible only on mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default Page;
