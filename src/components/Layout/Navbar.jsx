"use client";

import Link from "next/link";
import { Gift, User, Menu } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" bg-[#F8F7F3] md:bg-white fixed w-full z-20 top-0">
      <div className="flex items-center justify-between p-6">
        {/* Logo */}
        <Link href="/" className="text-3xl md:text-[40px] font-semibold text-black">
          AMD
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex justify-center flex-grow space-x-12 text-[19px]">
          {["Home", "Become an Expert", "About Us"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-black">
              {item}
            </Link>
          ))}
        </div>

        {/* Right-side Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/gift-session">
            <button className="flex items-center bg-black text-white font-medium rounded-lg text-[16px] px-4 py-2">
              Gift a Session
              <Gift className="ml-2 h-5 w-5" />
            </button>
          </Link>

          <Link href="/profile">
            <User className="h-6 w-6 md:h-8 md:w-8 text-black cursor-pointer" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black p-2"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#F8F7F3] p-4 space-y-2">
          {["Home", "Become an Expert", "About Us"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="block text-black"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
