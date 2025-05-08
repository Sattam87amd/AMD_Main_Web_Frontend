"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PiCirclesFourLight } from "react-icons/pi";
import {
  Video,
  User,
  Search,
  BadgeCheck,
  CreditCard,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const [active, setActive] = useState(pathname || "profile"); // Default active based on current route

  const navItems = [
    { 
      label: "Search", 
      icon: <Search />, 
      id: "search", 
      path: "/reviewingexpertpanel/experts",
      enabled: true 
    },
    { 
      label: "Video", 
      icon: <Video />, 
      id: "video", 
      path: "",
      enabled: false,
      message: "Video Call is only available for approved experts." 
    },
    { 
      label: "Profile", 
      icon: <User />, 
      id: "profile", 
      path: "/reviewingexpertpanel/expertpanelprofile",
      enabled: true 
    },
    { 
      label: "Expert", 
      icon: <BadgeCheck />, 
      id: "expert", 
      path: "",
      enabled: false,
      message: "Expert Tab is only available for approved experts."
    },
    { 
      label: "Dashboard", 
      icon: <PiCirclesFourLight />, 
      id: "dashboard", 
      path: "",
      enabled: false,
      message: "Dashboard is only available for approved experts."
    },
    { 
      label: "Logout", 
      icon: <LogOut />, 
      id: "logout", 
      path: "/",
      enabled: true 
    },
  ];

  const handleClick = (item, e) => {
    e.preventDefault(); // Prevent default navigation
    
    if (!item.enabled && item.label !== "Logout") {
      toast.info(item.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (item.label === "Logout") {
      localStorage.clear();
      router.push(item.path);
    } else if (item.enabled) {
      setActive(item.id);
      router.push(item.path);
    }
  };

  return (
    <div className="fixed w-full flex justify-between items-center bottom-0 left-0 right-0 bg-white shadow-lg p-2 md:hidden">
      {navItems.map((item) => (
        <div
          key={item.id}
          onClick={(e) => handleClick(item, e)}
          className={`flex flex-col items-center cursor-pointer transition-colors ${
            active === item.id || pathname === item.path ? "text-red-500" : "text-gray-700"
          }`}
        >
          <div className="text-xl sm:text-2xl">{item.icon}</div>
          <span className="text-[10px] sm:text-xs font-medium leading-none mt-1">{item.label}</span>
        </div>
      ))}
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default BottomNav;