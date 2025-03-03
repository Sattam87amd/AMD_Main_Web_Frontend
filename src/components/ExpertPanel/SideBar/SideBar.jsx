'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname for routing
import Image from 'next/image';
import { FiSearch, FiVideo, FiDollarSign } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Sidebar = ({ isOpen, setSelectedSection }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get current URL

  const menuItems = [
    { id: 'Find Experts', icon: <FiSearch />, label: 'Find Experts', route: '/topexperts' },
    { id: 'Video Call', icon: <FiVideo />, label: 'Video Call', route: '/video-call' },
    { id: 'Profile', icon: <CgProfile />, label: 'Profile', route: '/expertpanel/expertpanelprofile' },
    { id: 'Payment History', icon: <FiDollarSign />, label: 'Payment History', route: '/payment-history' },
    { id: 'Help', icon: <IoIosHelpCircleOutline />, label: 'Help', route: '/help' },
  ];

  const handleClick = (item, route) => {
    setSelectedSection(item);
    router.push(route);
  };

  return (
    <div className="hidden md:block md:w-1/5">
      <div
        className={`fixed top-0 left-0 h-full bg-white text-[#7E7E7E] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-4 mt-5 mb-20 flex justify-center">
          <Image src="/Frame.png.png" alt="Nexcore Logo" width={100} height={30} />
        </div>

        {/* Sidebar Menu */}
        <ul className="flex flex-col space-y-8 px-6 text-lg">
          {menuItems.map(({ id, icon, label, route }) => {
            const isActive = pathname === route; // Check if current page matches the route
            return (
              <li
                key={id}
                className={`p-2 rounded-lg cursor-pointer flex items-center space-x-3 ${
                  isActive ? 'bg-black text-white' : ''
                }`}
                onClick={() => handleClick(id, route)}
              >
                <span className={`text-lg ${isActive ? 'text-white' : ''}`}>
                  {icon}
                </span>
                <span className="text-md">{label}</span>
              </li>
            );
          })}
        </ul>

        {/* Profile and Call-to-Action */}
        <div className="p-4 mt-auto">
          <div className="relative flex justify-center">
            <Image src="/group1.png" alt="Profile" width={195} height={374} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
