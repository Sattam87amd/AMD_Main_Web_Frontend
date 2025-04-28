"use client";

import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function UserRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setPhone] = useState(""); // Added state for phone number
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get phone and email from query parameters (for initial values if needed)
  const queryPhone = searchParams.get("phone");
  const queryEmail = searchParams.get("email");

  // Prefill phone or email from query parameters if they exist
  useEffect(() => {
    if (queryPhone) {
      setPhone(queryPhone);
    }
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [queryPhone, queryEmail]);

  const handleValidation = () => {
    let tempErrors = {};

    if (!email) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Invalid email format.";
    }

    if (!firstName) {
      tempErrors.firstName = "First name is required.";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      tempErrors.firstName = "First name can only contain letters.";
    }

    if (!lastName) {
      tempErrors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      tempErrors.lastName = "Last name can only contain letters.";
    }
    if (!phone || !isValidPhoneNumber(phone)) {
      tempErrors.phone = "Valid phone number is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!handleValidation()) return;

    setLoading(true);
    setServerError("");

    try {
      const response = await axios.post(
        " http://localhost:5070/api/userauth/registeruser",
        {
          phone, // Add phone from state
          firstName: firstName,
          lastName: lastName, // Send lastName separately
          email,
        }
      );

      if (response.status === 201) {
        // alert('Successfully registered!');
        router.push("/userlogin");
      } else {
        console.log("Unexpected status:", response.status);
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${interFont.variable}`}>
      <div className="hidden md:flex w-1/2 flex-col relative">
        {/* Bottom Section with Arab Woman Image */}
        <div className="relative">
          <Image
            src="/AwabWomen.png"
            alt="Arab Woman"
            height={0}
            width={1000}
            className="object-cover"
            style={{ height: "800px" }}
          />
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center relative">
        {/* Mobile Logo - Hidden on medium and larger screens */}
        <div className="absolute top-6 left-5 md:hidden">
          <Image
            src="/Shourk_mobile_logo.png"
            alt="Mobile Logo"
            width={60}
            height={40}
          />
        </div>

        <div className="w-full max-w-md p-8 -mt-20 md:-mt-0">
          <h1 className="text-[29px] md:text-[30px] font-extrabold text-center flex items-center justify-center gap-1">
            <a href="/userlogin" className="text-black">
              <IoIosArrowBack />
            </a>
            Please Enter Your Info
          </h1>

          {/* Registration Form */}
          <div className="mt-8 space-y-8">
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <PhoneInput
                international
                defaultCountry="SA"
                value={phone}
                onChange={setPhone}
                className="w-full px-4 py-3 border rounded-lg focus:outline-8 focus:border-black pl-4"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border rounded-lg focus:outline-8 focus:border-black"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z]/g, ""); // Remove numbers and special characters
                  setfirstName(value);
                  setErrors({ ...errors, firstName: "" });
                }}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-8 focus:border-black"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z]/g, ""); // Remove numbers and special characters
                  setlastName(value);
                  setErrors({ ...errors, lastName: "" });
                }}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-8 focus:border-black"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            <button
              className={`w-full py-3 rounded-lg transition ${
                email && firstName && lastName && isValidPhoneNumber(phone)
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-black text-white cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={
                !email || !firstName || !lastName || !isValidPhoneNumber(phone)
              }
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegisterPage;
