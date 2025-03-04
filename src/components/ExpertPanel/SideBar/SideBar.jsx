'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; 
import { FiSearch, FiVideo, FiLogOut } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { PiCirclesFour } from "react-icons/pi";
import { LucideDollarSign, LucideBadgeCheck } from "lucide-react";
import Image from 'next/image';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: 'Find Experts', icon: <FiSearch />, route: '/experts' },
    { label: 'Video Call', icon: <FiVideo />, route: '/expertpanel/expertpanelprofile/videocall' },
    { label: 'Profile', icon: <CgProfile />, route: '/expertpanel/expertpanelprofile' },
    { label: 'Expert', icon: <LucideBadgeCheck />, route: '/expertpanel/expert' },
    { label: 'Dashboard', icon: <PiCirclesFour />, route: '/expertpanel/expertpanelprofile/dashboard' },
    { label: 'Payments', icon: <LucideDollarSign />, route: '/expertpanel/expertpanelprofile/payments' },
    { label: 'Logout', icon: <FiLogOut />, route: '/expertpanel/expertpanelprofile/logout' },
    { label: 'Chat with Users', icon: <IoChatbubbleEllipsesOutline />, route: '/expertpanel/expertpanelprofile/chat' },
  ];

  const handleClick = (itemRoute) => {
    router.push(itemRoute);
  };

  return (
    <div className="hidden md:block w-64 bg-white shadow-lg h-full ">
      {/* Logo Section */}
      <div className="p-4 mt-5 flex justify-center">
        <Image src="/Frame.png.png" alt="Nexcore Logo" width={100} height={30} />
      </div>

      {/* Sidebar Menu */}
      <ul className="flex flex-col space-y-6 px-6 text-lg flex-grow">
        {menuItems.map(({ label, icon, route }) => {
          const isActive = pathname === route;
          return (
            <li
              key={label}
              className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 ${
                isActive ? 'bg-black text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleClick(route)}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-md">{label}</span>
            </li>
          );
        })}
      </ul>

      {/* Profile Image Section */}
      <div className="p-4 flex flex-col items-center">
        <div className="relative flex justify-center">
          <Image 
            src="/group1.png" 
            alt="Profile" 
            width={120} 
            height={120} 
            className="rounded-full border border-gray-300"
          />
        </div>
        <p className="text-md font-semibold text-black mt-3">Ayaan Raje</p>
        <p className="text-sm text-gray-500">Wellness Expert</p>

        {/* Call-to-Action */}
        <div className="bg-gray-100 p-4 rounded-xl text-center mt-4 w-full">
          <p className="text-sm font-semibold">Get Expert Advice related to your concerns</p>
          <button className="mt-2 bg-black text-white px-4 py-2 rounded-lg w-full">Get Help</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
