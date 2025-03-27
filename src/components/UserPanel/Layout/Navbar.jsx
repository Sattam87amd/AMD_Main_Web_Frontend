"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gift, Menu, X, Search, User } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu
  const closeMenu = () => setIsOpen(false);

  // Handle navigation for mobile menu items
  const handleNavigation = (path) => {
    router.push(path);
    closeMenu();
  };

  // Toggle search popup
  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
  };

  return (
    <nav className="fixed w-full z-20 top-0 h-[96px] md:h-24">
      {/* Split Background */}
      <div className="absolute inset-0 grid grid-cols-[52%_48%] h-full">
        <div className="bg-[#F8F7F3]" />
        <div className="bg-[#EDECE8]" />
      </div>

      {/* Navbar Content */}
      <div className="relative flex items-center justify-between h-full px-6">
        {/* Logo (routes to /) */}
        <Link href="/home" className="text-3xl md:text-[40px] font-semibold text-black">
          AMD
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex justify-center flex-grow items-center space-x-12 text-[19px]">
          <Link href="/userpanel/joinasexpert" className="text-black">
            Become an Expert
          </Link>
          <Link href="/userpanel/ourmission" className="text-black">
            About Us
          </Link>
          <button onClick={toggleSearchPopup} className="text-black hover:opacity-80">
            <Search className="inline-block h-5 w-5" />
          </button>
        </div>

        {/* Right Side Elements */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/userpanel/giftsession">
            <button className="flex items-center bg-black text-white font-medium rounded-lg text-[16px] px-4 py-2">
              Gift a Session
              <Gift className="ml-2 h-5 w-5" />
            </button>
          </Link>

          <Link href="/profile">
            <User className="h-6 w-6 text-black cursor-pointer hover:opacity-80" />
          </Link>

          <Link href="userpanel/login">
            <button className="bg-white text-black font-medium rounded-lg text-[16px] px-4 py-2">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-black p-2">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F8F7F3] p-4 space-y-4 shadow-md md:hidden">
          <Link href="/" className="block text-black" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/userpanel/joinasexpert" className="block text-black" onClick={closeMenu}>
            Become an Expert
          </Link>
          <Link href="/userpanel/ourmission" className="block text-black" onClick={closeMenu}>
            About Us
          </Link>
          <button
            onClick={() => {
              toggleSearchPopup();
              closeMenu();
            }}
            className="block text-black"
          >
            <Search className="inline-block h-6 w-6" />
          </button>

          <div className="flex flex-col space-y-2 mt-4">
            <button
              onClick={() => handleNavigation("/userpanel/giftsession")}
              className="flex items-center bg-black text-white font-medium rounded-lg text-[16px] px-4 py-2 w-full"
            >
              Gift a Session
              <Gift className="ml-2 h-5 w-5" />
            </button>

            <button
              onClick={() => handleNavigation("/profile")}
              className="flex items-center bg-white text-black border border-black font-medium rounded-lg text-[16px] px-4 py-2 w-full"
            >
              Profile
            </button>

            <button
              onClick={() => handleNavigation("/signup")}
              className="flex items-center bg-white text-black font-medium rounded-lg text-[16px] px-4 py-2 w-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Search Popup */}
      {showSearchPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 opacity-100 transition-opacity duration-300"
          onClick={toggleSearchPopup}
        >
          <div
            className="bg-white p-6 rounded-md shadow-md max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-medium mb-2">Search</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type to search..."
                className="border border-gray-300 px-3 py-2 rounded-md flex-grow"
              />
              <button className="bg-black text-white px-4 py-2 rounded-md">
                Go
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
