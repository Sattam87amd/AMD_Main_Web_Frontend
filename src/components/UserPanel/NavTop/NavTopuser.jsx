"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaBell, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Navtop = ({ activeTab }) => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    profilePic: null,
  });

  const [userId, setUserId] = useState("");

  // // ✅ Get userId from token in localStorage
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const userToken = localStorage.getItem("token"); // Make sure you store it with this key
  //     if (userToken) {
  //       try {
  //         const decodedToken = JSON.parse(atob(userToken.split(".")[1]));
  //         setUserId(decodedToken._id);
  //       } catch (error) {
  //         console.error("Error decoding userToken:", error);
  //       }
  //     } else {
  //       console.warn("User token not found in localStorage");
  //       router.push("/"); // redirect if token not found
  //     }
  //   }
  // }, [router]);

  // ✅ Fetch user data from backend
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://amd-api.code4bharat.com/api/auth/user/${userId}`);
          const { firstName, photoFile } = response.data.data.user;
          setUserData({
            name: firstName,
            profilePic: photoFile || "/default-profile.png",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="flex justify-between items-center bg-white py-4 px-6 shadow-sm">
      <div>
        <p className="text-gray-500 text-sm">Hi, {userData.name || "Loading..."}</p>
        <h1 className="text-2xl font-bold">{activeTab}</h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
          <span className="text-sm">EN</span>
          <FaChevronDown className="text-xs" />
        </div>

        <div className="relative cursor-pointer hover:text-black">
          <FaBell className="text-lg" />
          <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
        </div>

        <Link href="/userpanel/userpanelprofile">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="relative w-8 h-8 rounded-full">
              {userData.profilePic && (
                <Image
                  src={userData.profilePic}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover border border-gray-300"
                />
              )}
            </div>
            <p className="text-sm font-semibold">{userData.name || "Loading..."}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navtop;
