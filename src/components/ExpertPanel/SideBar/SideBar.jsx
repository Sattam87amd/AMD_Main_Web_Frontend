'use client';

import React from 'react';
import Image from 'next/image';
import { 
  FiSearch, 
  FiVideo,  
  FiDollarSign, 
  FiLogOut, 
  
} from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { IoChatbubbleOutline } from "react-icons/io5";


function Sidebar({ isOpen }) {
  // State to track the currently active menu item
  const [activeItem, setActiveItem] = React.useState(null);

  // Handler to toggle the active item
  const handleClick = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  return (
    <div className="hidden md:block md:w-1/6">
      <div
        className={`fixed top-0 left-0 h-full bg-white text-[#7E7E7E] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-4 mt-5 mb-20 flex justify-center">
          <Image src="/Frame.png.png" alt="Nexcore Logo" width={100} height={30} />
        </div>

        {/* Search Input (at the top, above navigation) */}
       

        {/* Sidebar Menu */}

        <ul className="flex flex-col space-y-8 px-6 text-lg mt-0">
          <li 
            className={`p-2 rounded-lg ${activeItem === 'search' ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick('search')}
          >
            <div className="flex items-center space-x-3">
              <FiSearch className={`text-lg ${activeItem === 'search' ? 'text-white' : ''}`} />
              <span className="text-md cursor-pointer">Find Experts</span>
            </div>
          </li>
       
          <li 
            className={`p-2 rounded-lg ${activeItem === 'videoCall' ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick('videoCall')}
          >
            <div className="flex items-center space-x-3">
              <FiVideo className={`text-lg ${activeItem === 'videoCall' ? 'text-white' : ''}`} />
              <span className="text-md cursor-pointer">Video Call</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg ${activeItem === 'profile' ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick('profile')}
          >
            <div className="flex items-center space-x-3">
              <CgProfile className={`text-lg ${activeItem === 'profile' ? 'text-white' : ''}`} />
              <span className="text-md cursor-pointer">Profile</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg ${activeItem === 'expert' ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick('expert')}
          >
            <div className="flex items-center space-x-3">
              < IoMdCheckmarkCircleOutline className={`text-lg ${activeItem === 'expert' ? 'text-white' : ''}`} />
              <span className="text-md cursor-pointer">Expert</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg ${activeItem === 'dashboard' ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick('dashboard')}
          >
            <div className="flex items-center space-x-3">
              <RxDashboard className={`text-lg ${activeItem === 'dashboard' ? 'text-white' : ''}`} />
              <span className="text-md cursor-pointer">Dashboard</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg ${activeItem === 'payments' ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick('payments')}
          >
            <div className="flex items-center space-x-3">
              <FiDollarSign className={`text-lg ${activeItem === 'payments' ? 'text-white' : ''}`} />
              <span className="text-md cursor-pointer">Payments</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg ${activeItem === 'logout' ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick('logout')}
          >
            <div className="flex items-center space-x-3">
              <FiLogOut className={`text-lg ${activeItem === 'logout' ? 'text-white' : ''}`} />
              <span className="text-md cursor-pointer">Logout</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg ${activeItem === 'chat' ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick('chat')}
          >
            <div className="flex items-center space-x-1">
              <IoChatbubbleOutline className={`text-lg ${activeItem === 'chat' ? 'text-white' : ''}`} />
              <span className="text-md cursor-pointer">Chat with Users</span>
            </div>
          </li>

          {/* Profile and Call-to-Action (merged design with cursor-pointer on Go Pro area) */}
          <li className="p-4">
            <div className="relative">
              <Image
                src="/group1.png" // Replace with actual path to the profile image if needed
                alt="Profile"
                width={195} // Matches the size in the image
                height={374} // Matches the size in the image
                className="-mt-16"
              />
              {/* Invisible overlay for the "Go Pro" area to add cursor-pointer */}
              <div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-transparent cursor-pointer"
                onClick={() => console.log('Go Pro clicked')} // Optional: Add click handler
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;