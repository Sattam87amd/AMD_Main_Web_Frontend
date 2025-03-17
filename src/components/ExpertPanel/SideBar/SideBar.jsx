"use client";

import { useRouter, usePathname } from "next/navigation";
import { FiSearch, FiVideo, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { PiCirclesFour } from "react-icons/pi";
import { LucideDollarSign, LucideBadgeCheck } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Find Experts", icon: <FiSearch />, route: "/experts" },
    { label: "Video Call", icon: <FiVideo />, route: "/expertpanel/videocall" },
    {
      label: "Profile",
      icon: <CgProfile />,
      route: "/expertpanel/expertpanelprofile",
    },
    {
      label: "Expert",
      icon: <LucideBadgeCheck />,
      route: "/expertpanel/expert",
    },
    {
      label: "Dashboard",
      icon: <PiCirclesFour />,
      route: "/expertpanel/dashboard",
    },
    {
      label: "Payments/Reviews",
      icon: <LucideDollarSign />,
      route: "/expertpanel/payments",
    },
    { label: "Logout", icon: <FiLogOut />, route: "/" },
    {
      label: "Chat with Users",
      icon: <IoChatbubbleEllipsesOutline />,
      route: "/expertpanel/chat",
    },
  ];

  const handleClick = (itemRoute) => {
    router.push(itemRoute);
  };

  return (
    <div className="hidden md:block w-full bg-white shadow-md h-[99.5%]">
      {/* Logo Section */}
      <div className="p-4 mt-5 flex justify-center">
        <Image
          src="/Frame.png.png"
          alt="Nexcore Logo"
          width={100}
          height={30}
        />
      </div>

      {/* Sidebar Menu */}
      <ul className="flex flex-col space-y-6 px-6 text-lg flex-grow">
        {menuItems.map(({ label, icon, route }) => {
          const isActive = pathname === route;
          return (
            <li
              key={label}
              className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 ${
                isActive ? "bg-black text-white" : "hover:bg-gray-100"
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
      <div className="p-4 flex flex-col items-center relative">
        <div className="relative flex justify-center">
          <Image
            src="/group1.png"
            alt="Profile"
            width={120}
            height={120}
            className="w-52 h-auto"
          />
        </div>
        <button
          onClick={() => router.push("/gethelp")}
          className="absolute bottom-[30px] px-14 py-3 bg-black text-white text-sm rounded-md hover:bg-gray-800"
        >
          Get Help 
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
