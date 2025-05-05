"use client";

import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [useEmail, setUseEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        const activeElement = document.activeElement;
  
        const isEmailValid = useEmail && email.includes("@");
        const isPhoneValid = !useEmail && phone && isValidPhoneNumber(phone);
  
        // If focused on email or phone input
        if (
          (useEmail && activeElement.type === "email") ||
          (!useEmail && activeElement.tagName === "INPUT")
        ) {
          if ((isEmailValid || isPhoneValid) && !isTimerActive) {
            generateOtp();
          }
        }
  
        // If focused on OTP input
        if (activeElement.placeholder === "Enter OTP") {
          if (otp.length === 4) {
            handleSubmit();
          }
        }
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [useEmail, email, phone, otp, isTimerActive]);
  
  // Countdown timer effect
  useEffect(() => {
    let interval;
    
    if (isTimerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prevCount => prevCount - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, countdown]);

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
    if (isTimerActive) return;
    
    if (useEmail) {
      if (!email || !email.includes("@")) {
        setFormError("Please enter a valid email address.");
        return;
      }
      try {
        await axios.post(
          "https://amd-api.code4bharat.com/api/expertauth/request-otp",
          { email }
        );
        toast.success("OTP sent to your email!");
        // Start countdown
        setCountdown(30);
        setIsTimerActive(true);
      } catch (error) {
        console.log(error);
        toast.error("Error sending OTP. Please try again.");
       
        if (error.response && error.response.status === 400) {
          toast.info("Email already exists as an User. Please try another email.");
        }
        
        // Handle specific error cases
        if (error.response?.status === 403) {
          toast.info("Please wait for admin approval before logging in");
        } else {
          toast.error("OTP Invalid or Expired. Please try again.");
        }
      }
    } else {
      if (!phone || !isValidPhoneNumber(phone)) {
        setPhoneError("Please enter a valid phone number.");
        return;
      }
      try {
        await axios.post(
          "https://amd-api.code4bharat.com/api/expertauth/request-otp",
          { phone }
        );
        toast.success("OTP sent to your phone!");
        // Start countdown
        setCountdown(30);
        setIsTimerActive(true);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          toast.error("Phone number already exists as an User. Please try another number.");
        }
        // Handle specific error cases
        if (error.response?.status === 403) {
          toast.info("Please wait for admin approval before logging in");
        } else {
          toast.error("OTP Invalid or Expired. Please try again.");
        }
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
      const response = await axios.post(
        "https://amd-api.code4bharat.com/api/expertauth/verify-otp",
        payload
      );

      if (response.data.data.isNewExpert) {
        const identifier = useEmail
          ? `email=${encodeURIComponent(email)}`
          : `phone=${encodeURIComponent(phone)}`;
        router.push(`/register?${identifier}`);
      } else {
        localStorage.setItem("expertToken", response.data.data.token);
        router.push("/expertpanel/expertpanelprofile");
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 403) {
        toast.info("Your account is pending admin approval");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    }
  };

  return (
    <div className={`min-h-screen flex ${interFont.variable}`}>
      <div className="hidden md:flex w-1/2 flex-col relative">
        <div className="relative">
          <Image
            src="/AwabWomen.png"
            alt="Arab Woman"
            height={100}
            width={800}
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center relative">
        <div className="absolute top-6 left-5 md:hidden">
          <Image
            src="/Shourk_mobile_logo.png"
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
            or <span className="text-black font-semibold">Sign up</span>
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
                  <label className="block text-sm font-medium">
                    Phone Number
                  </label>
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
            </div>
            
            {!useEmail && phoneError && (
              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
            )}
            {useEmail && !email.includes("@") && formError && (
              <p className="text-red-500 text-xs mt-1">{formError}</p>
            )}

            <button
              className={`w-full py-3 rounded-lg transition mt-8 ${
                (((useEmail && email.includes("@")) ||
                (!useEmail && phone && isValidPhoneNumber(phone))) && !isTimerActive)
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              onClick={generateOtp}
              disabled={
                isTimerActive || 
                (useEmail
                  ? !email || !email.includes("@")
                  : !phone || !isValidPhoneNumber(phone))
              }
            >
              {isTimerActive 
                ? `Resend OTP in ${countdown}s` 
                : "Send OTP"}
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
              className={`w-full py-3 rounded-lg transition ${
                otp.length === 4
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-400 text-white cursor-not-allowed"
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
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;