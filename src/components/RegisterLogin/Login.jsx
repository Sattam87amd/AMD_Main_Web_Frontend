"use client";

import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"

const interFont = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

function LoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [formError, setFormError] = useState("");
    const [useEmail, setUseEmail] = useState(false); // Step 1
    const [email, setEmail] = useState("");


    // Toggle handler
const toggleLoginMethod = () => {
    setUseEmail(!useEmail);
    setPhone("");
    setEmail("");
    setPhoneError("");
    setFormError("");
};
    const handlePhoneChange = (value) => {
        if (!value) {
            setPhone(value);
            setPhoneError("Phone number is required.");
        } else if (!isValidPhoneNumber(value)) {
            setPhone(value);
            setPhoneError("Invalid phone number.");
        } else {
            setPhone(value);
            setPhoneError("");
        }
        setFormError("");
    };

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
            setOtp(value);
            setOtpError("");
        } else {
            setOtpError("OTP cannot be more than 4 digits.");
        }
    };

    const generateOtp = async () => {
        if (useEmail) {
          if (!email || !email.includes("@")) {
            setFormError("Please enter a valid email address.");
            return;
          }
          try {
            await axios.post("http://localhost:8000/api/expertauth/request-otp", { email });
            alert("OTP sent to your email!");
          } catch (error) {
            console.log(error);
            setFormError("Failed to send OTP. Please try again.");
          }
        } else {
          if (!phone || !isValidPhoneNumber(phone)) {
            setPhoneError("Please enter a valid phone number.");
            return;
          }
          try {
            await axios.post("http://localhost:8000/api/expertauth/request-otp", { phone });
            alert("OTP sent to your phone!");
          } catch (error) {
            console.log(error);
            setFormError("Failed to send OTP. Please try again.");
          }
        }
      };
      
      const handleSubmit = async () => {
        if (!otp || otp.length !== 4) {
          setFormError("Please enter a valid 4-digit OTP.");
          return;
        }
      
        try {
          const payload = useEmail ? { email, otp } : { phone, otp };
          const response = await axios.post("http://localhost:8000/api/expertauth/verify-otp", payload);
      
          if (response.data.data.isNewExpert) {
            const identifier = useEmail ? `email=${encodeURIComponent(email)}` : `phone=${encodeURIComponent(phone)}`;
            router.push(`/register?${identifier}`);
          } else {
            localStorage.setItem("expertToken", response.data.data.token);
            router.push("/expertpanel/expertpanelprofile");
          }
        } catch (error) {
          setFormError(error.response?.data?.message || "OTP verification failed");
        }
      };
      
    return (
        <div className={`min-h-screen flex ${interFont.variable}`}>
            <div className="hidden md:flex w-1/2 flex-col relative">
                <div className="h-[35%] bg-[#EDECE8] flex items-center justify-center relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <Image
                            src="/AMD_logo.png"
                            alt="AMD Logo"
                            width={190}
                            height={190}
                        />
                    </div>

                    <div className="absolute top-full left-4 w-[355px] h-[78px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
                        <IoIosSearch className="text-white text-[50px] mr-2" />
                        <div>
                            <h2 className="text-white font-light text-2xl">
                                Professional Experts
                            </h2>
                            <p className="text-white text-xs font-extralight">
                                Expert Guidance from the Best in the Industry
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-[65%] bg-[#F8F7F3] flex items-end justify-center relative">
                    <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320">
                        <path
                            fill="#EDECE8"
                            fillOpacity="1"
                            d="M1,160L120,133.3C240,107,480,53,720,53C960,53,1200,107,1320,133.3L1440,160V0H0Z"
                        ></path>
                    </svg>
                    <Image
                        src="/ArabWomanLogin.svg"
                        alt="Arab Woman"
                        width={490}
                        height={600}
                        className="object-contain z-20"
                    />

                    <div className="absolute bottom-14 right-8 w-[355px] h-[78px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
                        <LuNotepadText className="text-white text-[50px] mr-2" />
                        <div>
                            <h2 className="text-white font-medium text-xl">
                                Book an appointment
                            </h2>
                            <p className="text-white text-lg font-extralight">
                                Call/text/video/inperson
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center relative">
                <div className="absolute top-6 left-5 md:hidden">
                    <Image
                        src="/AMD_mobile_logo.png"
                        alt="Mobile Logo"
                        width={60}
                        height={40}
                    />
                </div>

                <div className="w-full max-w-md p-8 -mt-20 md:-mt-0">
                    <h1 className="text-3xl md:text-[40px] font-extrabold text-center">
                        Login
                    </h1>
                    <p className="text-center text-[#878787] mt-1 md:mt-2">
                        or{" "}
                        <span className="text-[#EA2B2B] font-semibold underline">
                            Sign up
                        </span>
                    </p>

                    <div className="mt-8 space-y-8">
                        <div>
                        {useEmail ? (
    <>
        <label className="block text-sm font-medium">Email</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-8 focus:border-black"
        />
        <p
            className="text-sm text-blue-600 mt-2 cursor-pointer underline"
            onClick={toggleLoginMethod}
        >
            Use phone number instead
        </p>
    </>
) : (
    <>
        <label className="block text-sm font-medium">Phone Number</label>
        <PhoneInput
            international
            defaultCountry="SA"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-8 focus:border-black pl-4"
        />
        {phoneError && (
            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
        )}
        <p
            className="text-sm text-blue-600 mt-2 cursor-pointer underline"
            onClick={toggleLoginMethod}
        >
            Use email instead
        </p>
    </>
)}
{/* 
                            <div className="relative">
                                <PhoneInput
                                    international
                                    defaultCountry="SA"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-8 focus:border-black pl-4"
                                /> */}
                               
                            </div>
                            {!useEmail && phoneError && (
  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
)}
{useEmail && !email.includes("@") && formError && (
  <p className="text-red-500 text-xs mt-1">{formError}</p>
)}

<button
  className={`w-full py-3 rounded-lg transition mt-8 ${
    (useEmail && email.includes("@")) ||
    (!useEmail && phone && isValidPhoneNumber(phone))
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-black text-white cursor-not-allowed"
  }`}
  onClick={generateOtp}
  disabled={
    useEmail
      ? !email || !email.includes("@")
      : !phone || !isValidPhoneNumber(phone)
  }
>
  Send OTP
</button>


                        <div>
                            <label className="block text-sm font-medium">OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={handleOtpChange}
                                placeholder="Enter OTP"
                                maxLength={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-8 focus:border-black"
                            />
                            {otpError && (
                                <p className="text-red-500 text-xs mt-1">{otpError}</p>
                            )}
                        </div>

                        {formError && <p className="text-red-500 text-sm">{formError}</p>}

                        <button
                            className={`w-full py-3 rounded-lg transition ${phone && otp.length === 4 && isValidPhoneNumber(phone)
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-black text-white cursor-not-allowed"
                                }`}
                            onClick={handleSubmit}
                            disabled={
                                (!useEmail && (!phone || !isValidPhoneNumber(phone))) ||
                                (useEmail && !email.includes("@")) ||
                                otp.length !== 4
                              }
                              
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        // </div>
    );
}

export default LoginPage;
