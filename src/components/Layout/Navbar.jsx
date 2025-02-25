"use client";

import Link from "next/link";
import { Gift, User, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close menu when clicking outside
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-20 top-0 h-[96px] md:h-24">
      {/* Split Background */}
      <div className="absolute inset-0 grid grid-cols-[52%_48%] h-full">
        <div className="bg-[#F8F7F3]"></div>
        <div className="bg-[#EDECE8]"></div>
      </div>

      {/* Navbar Content */}
      <div className="relative flex items-center justify-between h-full px-6">
        {/* Logo */}
        <Link href="/" className="text-3xl md:text-[40px] font-semibold text-black">
          AMD
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex justify-center flex-grow space-x-12 text-[19px]">
          {[
            { name: "Home", path: "/home" },
            { name: "Become an Expert", path: "/experts" },
            { name: "About Us", path: "/aboutus" },
          ].map((item) => (
            <Link key={item.name} href={item.path} className="text-black">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black p-2"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-[#F8F7F3] p-4 space-y-4 shadow-md"
          onClick={closeMenu}
        >
          {/* Navigation Links */}
          {[
            { name: "Home", path: "/home" },
            { name: "Become an Expert", path: "/experts" },
            { name: "About Us", path: "/aboutus" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block text-black"
            >
              {item.name}
            </Link>
          ))}

          {/* Right-side Icons (Visible only in Mobile Toggle) */}
          <div className="flex flex-col space-y-2 mt-4">
            <Link href="/gift-session">
              <button className="flex items-center bg-black text-white font-medium rounded-lg text-[16px] px-4 py-2 w-full">
                Gift a Session
                <Gift className="ml-2 h-5 w-5" />
              </button>
            </Link>

            <Link href="/profile">
              <button className="flex items-center bg-white text-black border border-black font-medium rounded-lg text-[16px] px-4 py-2 w-full">
                Profile
                <User className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
