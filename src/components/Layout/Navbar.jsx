"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gift, Menu, X, Search, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SeacthExperts from "../SearchExperts/SearchExperts"; // Import SearchExperts component
import GoogleTranslateButton from "../GoogleTranslateButton";

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchPage, setShowSearchPage] = useState(false); // State for search page

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu
  const closeMenu = () => setIsOpen(false);

  // Open Search Page
  const toggleSearchPage = () => {
    setShowSearchPage(true);
  };

  // Close Search Page
  const closeSearchPage = () => {
    setShowSearchPage(false);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed w-full z-20 top-0 h-[96px] md:h-24 bg-white shadow-md">
        <div className="relative flex items-center justify-between h-full px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl md:text-[40px] font-semibold text-black"
          >
            AMD
          </Link>

          {/* Center Links for Desktop */}
          <div className="hidden md:flex justify-center flex-grow items-center space-x-12 text-[19px]">
            <Link href="/joinasexpert" className="text-black">
              Become an Expert
            </Link>

            <Link href="/ourmission" className="text-black">
              About Us
            </Link>
            {/* Centered Search Icon on Desktop */}
            <button
              onClick={toggleSearchPage}
              className="text-black hover:opacity-80 pb-1"
            >
              <Search className="inline-block h-5 w-5 " />
            </button>
          </div>

          {/* Right Side Elements for Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/giftsession">
              <button className="flex items-center bg-black text-white font-medium rounded-lg text-[16px] px-4 py-2">
                Gift a Session
                <Gift className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <GoogleTranslateButton />
            <Link href="/userlogin">
              <button className="bg-white text-black font-medium rounded-lg text-[16px] px-4 py-2">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleMenu} className="text-black p-2">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Search Icon - Visible only on mobile, outside the toggle menu */}
          <button
            onClick={toggleSearchPage}
            className="md:hidden text-black p-2 absolute right-16 top-7"
          >
            <Search className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#F8F7F3] p-4 space-y-4 shadow-md md:hidden">
            <Link href="/" className="block text-black" onClick={closeMenu}>
              Home
            </Link>
            <Link
              href="/joinasexpert"
              className="block text-black"
              onClick={closeMenu}
            >
              Become an Expert
            </Link>
            <Link
              href="/ourmission"
              className="block text-black"
              onClick={closeMenu}
            >
              About Us
            </Link>

            <div className="flex flex-col space-y-2 mt-4">
              <button
                onClick={() => router.push("/giftsession")}
                className="flex items-center bg-black text-white font-medium rounded-lg text-[16px] px-4 py-2 w-full"
              >
                Gift a Session
                <Gift className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => router.push("/userlogin")}
                className="flex items-center bg-white text-black font-medium rounded-lg text-[16px] px-4 py-2 w-full"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Search Page Transition */}
      <AnimatePresence>
        {showSearchPage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 overflow-auto"
          >
            {/* Pass close function to SearchExperts */}
            <SeacthExperts closeSearchPage={closeSearchPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
