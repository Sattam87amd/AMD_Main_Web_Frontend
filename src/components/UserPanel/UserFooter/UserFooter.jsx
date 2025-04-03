"use client";

import React from "react";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const UserFooter = () => {
  return (
    <footer className="p-4 md:p-10 md:py-6 bg-[#EDECE8] w-full">
      <div className="w-full">
        <div className="md:flex md:justify-between md:items-start">
          {/* Left Section - AMD and Tagline */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-black">AMD</h1>
            <p className="mt-2 text-black text-base md:text-2xl md:py-4 leading-relaxed">
              Book the most in-demand experts <br />
              & get advice over a video call.
            </p>
            <Link href="/become-expert">
              <button className="mt-4 px-6 py-2 md:px-16 md:py-3 md:text-xl bg-black text-white rounded-lg">
                Become Expert
              </button>
            </Link>
          </div>

          {/* Middle Section - Company and Support */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            {/* Company Section */}
            <div>
              <h2 className="mb-4 text-sm md:text-lg font-semibold text-black">
                Company
              </h2>
              <ul className="text-gray-700 text-sm md:text-lg">
                <li className="mb-2">
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/giftsession" className="hover:underline">
                    Gift a Session
                  </Link>
                </li>
                <li>
                  <Link href="/experts" className="hover:underline">
                    Experts
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h2 className="mb-4 text-sm md:text-lg font-semibold text-black">
                Support
              </h2>
              <ul className="text-gray-700 text-sm md:text-lg">
                <li className="mb-2">
                  <Link href="/contactus" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/feedback" className="hover:underline">
                    Give us feedback & earn
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/suggest-feature" className="hover:underline">
                    Suggest a feature & earn
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/suggest-topic" className="hover:underline">
                    Suggest a new topic or expert
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div>
            <h2 className="mb-4 text-sm md:text-lg font-semibold text-black">
              Follow us for peaks
            </h2>
            <div className="flex justify-start md:justify-center items-center space-x-4">
              <Link href="https://www.instagram.com" target="_blank" className="text-[#A6A6A6] hover:text-black">
                <FaInstagram size={28} />
              </Link>
              <Link href="https://www.twitter.com" target="_blank" className="text-[#A6A6A6] hover:text-black">
                <FaTwitter size={28} />
              </Link>
              <Link href="https://www.facebook.com" target="_blank" className="text-[#A6A6A6] hover:text-black">
                <FaFacebook size={28} />
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <span className="text-sm text-gray-500 text-center">
            © AMD 2025. ALL RIGHTS RESERVED •
            <Link href="/policy" className="hover:underline ml-1">
              Policy
            </Link>
            •
            <Link href="/terms" className="hover:underline ml-1">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
