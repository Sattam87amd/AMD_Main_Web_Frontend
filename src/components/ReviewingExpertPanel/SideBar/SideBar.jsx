"use client";

import { useRouter, usePathname } from "next/navigation";
import { FiSearch, FiVideo, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { PiCirclesFour } from "react-icons/pi";
import { LucideDollarSign, LucideBadgeCheck } from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Can be undefined briefly

  const menuItems = [
    { 
      label: "Find Experts", 
      icon: <FiSearch />, 
      route: "/reviewingexpertpanel/experts",
      enabled: true 
    },
    { 
      label: "Video Call", 
      icon: <FiVideo />, 
      route: "",
      enabled: false,
      message: "Video Call is only available for approved experts." 
    },
    { 
      label: "Profile", 
      icon: <CgProfile />, 
      route: "/reviewingexpertpanel/expertpanelprofile",
      enabled: true 
    },
    { 
      label: "Expert", 
      icon: <LucideBadgeCheck />, 
      route: "",
      enabled: false,
      message: "Expert Tab is only available for approved experts."
      
    },
    { 
      label: "Dashboard", 
      icon: <PiCirclesFour />, 
      route: "",
      enabled: false,
      message: "Dashboard is only available for approved experts." 
    },
    { 
      label: "Payments/Reviews", 
      icon: <LucideDollarSign />, 
      route: "",
      enabled: false,
      message: "Payments and Reviews are only available for approved experts." 
    },
    { 
      label: "Chat with Users", 
      icon: <IoChatbubbleEllipsesOutline />, 
      route: "",
      enabled: false,
      message: "Chat with Users is only available for approved experts." 
    },
    { 
      label: "Logout", 
      icon: <FiLogOut />, 
      route: "/",
      enabled: true 
    },
  ];

  const handleClick = (item) => {
    if (!item.enabled && item.label !== "Logout") {
      console.log("Toast triggered:", item.message);
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
      router.push(item.route);
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <div className="hidden md:block w-full bg-white shadow-md h-[99.5%]">
      {/* Logo Section */}
      <div className="p-4 mt-5 flex justify-center">
        <Image src="/Frame.png.png" alt="Nexcore Logo" width={100} height={30} />
      </div>

      {/* Sidebar Menu */}
      <ul className="flex flex-col space-y-6 px-6 text-lg flex-grow">
        {menuItems.map((item) => {
          const isActive = pathname && pathname === item.route; // ✅ Protect against undefined pathname

          return (
            <li
              key={item.label}
              className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 ${
                isActive ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => handleClick(item)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-md">{item.label}</span>
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