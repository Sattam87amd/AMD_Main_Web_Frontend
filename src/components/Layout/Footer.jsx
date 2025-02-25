import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-6 bg-[#EDECE8]">
      <div className="max-w-screen-xl mx-auto">
        <div className="md:flex md:justify-between md:items-start">
          {/* Left Section - AMD and Tagline */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-black">AMD</h1>
            <p className="mt-2 text-black md:text-2xl md:font-semibold md:py-4">
              Book the most in demand experts <br /> 
              & get advice over a video call.
            </p>
            <button className="mt-4 px-6 py-2 md:px-16 md:py-2 md:text-[20px] bg-black text-white rounded-lg">
              Become Expert
            </button>
          </div>

          {/* Middle Section - Company and Support */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            {/* Company Section */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-black">Company</h2>
              <ul className="text-gray-700">
                <li className="mb-2">
                  <a href="#" className="hover:underline">About</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">FAQ</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">Gift a Session</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Experts</a>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-black">Support</h2>
              <ul className="text-gray-700">
                <li className="mb-2">
                  <a href="#" className="hover:underline">Contact</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">Give us feedback & earn</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">Suggest a feature & earn</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Suggest a new topic or expert</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-black">Follow us for peaks</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-black">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-black">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
<<<<<<< HEAD
          <span className="text-sm text-gray-500 text-center">
=======
          <span className="text-sm text-gray-500">
>>>>>>> 3c2c961d014b51eb5ae06cfa9941fb840aa6e25e
            © INTRO 2024. ALL RIGHTS RESERVED • POLICY • TERMS
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
