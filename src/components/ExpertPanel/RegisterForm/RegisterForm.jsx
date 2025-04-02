"use client";

import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { Inter } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { FiLink } from "react-icons/fi";
import { useRouter } from "next/navigation";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function RegisterForm() {
  const router = useRouter();

  // States for storing form data
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(""); // Added for gender
  const [mobile, setMobile] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [areaOfExpertise, setAreaOfExpertise] = useState("");
  const [specificArea, setSpecificArea] = useState(""); // For 'Others' in area of expertise
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});
  const [certificationFileName, setCertificationFileName] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');

  const fileInputRefCertifications = useRef(null);
  const fileInputRefPhotos = useRef(null);

  // Fetch data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("registerData")) || {};
    setFirstName(userData.firstName || "");
    setLastName(userData.lastName || "");
    setEmail(userData.email || "");
    setGender(userData.gender || "");
  }, []);

  // Validate required fields before submission
  const handleValidation = () => {
    const tempErrors = {};

    if (!firstName) tempErrors.firstName = "First name is required.";
    if (!lastName) tempErrors.lastName = "Last name is required.";
    if (!mobile) tempErrors.mobile = "Mobile number is required.";
    if (!email) tempErrors.email = "Email address is required.";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length !== 0) {
      // Combine all error messages and alert them
      alert(Object.values(tempErrors).join("\n"));
      return false;
    }
    return true;
  };

  const handleFileChangeCertifications = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "Max 10 MB files can be uploaded",
        }));
        document.getElementById("file-display-certifications").value = "";
      } else if (['pdf', 'jpg', 'jpeg', 'png'].includes(fileExtension)) {
        setCertificationFileName(file.name);
        setErrors((prev) => ({ ...prev, file: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          file: "Only PDF, JPG, JPEG, PNG files are allowed",
        }));
        document.getElementById("file-display-certifications").value = "";
      }
    }
  };
  
  const handleFileChangePhotos = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "Max 10 MB files can be uploaded",
        }));
        document.getElementById("file-display-photos").value = "";
      } else if (['pdf', 'jpg', 'jpeg', 'png'].includes(fileExtension)) {
        setPhotoFileName(file.name);
        setErrors((prev) => ({ ...prev, file: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          file: "Only PDF, JPG, JPEG, PNG files are allowed",
        }));
        document.getElementById("file-display-photos").value = "";
      }
    }
  };

  // Handle form submission and send data to the backend for registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const normalizedMobile = mobile.replace(/[^\d]/g, ''); // Normalize the mobile number before sending to backend
  
    if (handleValidation()) {
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            mobile: normalizedMobile, // Send normalized mobile number
            gender
          }),
        });
  
        const data = await response.json();
        if (data.message === "User registered successfully") {
          router.push("/login"); // Redirect to login after successful registration
        } else {
          alert(data.message); // Show error message if user already exists or other issues
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  
  

  return (
    <div className={`min-h-screen flex overflow-hidden ${interFont.variable}`}>
      {/* Left Side Section (Hidden on small screens, visible on md+) */}
      <div className="hidden md:flex w-1/2 flex-col relative">
        {/* Top Section with AMD Logo */}
        <div className="h-[35%] bg-[#EDECE8] flex items-center justify-center relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Image src="/AMD_logo.png" alt="AMD Logo" width={190} height={190} />
          </div>
          {/* Experts Card */}
          <div className="absolute top-72 left-4 w-[355px] h-[78px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
            <IoIosSearch className="text-white text-[50px] mr-2" />
            <div>
              <h2 className="text-white font-light text-2xl">Professional Experts</h2>
              <p className="text-white text-xs font-extralight">Expert Guidance from the Best in the Industry</p>
            </div>
          </div>
        </div>

        {/* Bottom Section with Arab Woman Image */}
        <div className="h-[65%] bg-[#F8F7F3] flex items-end justify-center relative">
          <div className="absolute top-0 left-0 w-full">
            <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EDECE8" fillOpacity="1" d="M0,192L120,165.3C240,139,480,85,720,85C960,85,1200,139,1320,165.3L1440,192V0H0Z"></path>
            </svg>
          </div>
          <Image src="/ArabWomanLogin.svg" alt="Arab Woman" width={490} height={600} className="object-contain z-20 absolute" />
          {/* Appointment Card */}
          <div className="absolute bottom-14 right-8 w-[355px] h-[78px] bg-black bg-opacity-50 backdrop-blur-[3px] rounded-xl flex items-center p-4 z-30 shadow-lg">
            <LuNotepadText className="text-white text-[50px] mr-2" />
            <div>
              <h2 className="text-white font-medium text-xl">Book an appointment</h2>
              <p className="text-white text-lg font-extralight">Call/text/video/inperson</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Section with Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-start relative">
        <div className="w-[93%] py-8">
          <h1 className="text-3xl md:text-[40px] font-bold mt-2 pb-10 text-center">
            Please Enter Your Info
          </h1>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-500">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setErrors({ ...errors, firstName: "" }); }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Basim"
                  required
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-500">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setErrors({ ...errors, lastName: "" }); }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Thakur"
                  required
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Mobile Number and Email */}
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-500">Mobile Number</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => { const numericValue = e.target.value.replace(/[^0-9+]/g, ""); setMobile(numericValue); setErrors({ ...errors, mobile: "" }); }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="+918923456789"
                  required
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-500">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="basim@gmail.com"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Gender Dropdown */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-500">Gender</label>
              <select
                value={gender}
                onChange={(e) => { setGender(e.target.value); setErrors({ ...errors, gender: "" }); }}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="I prefer not to">Prefer not to say</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>

            {/* Social Media Link */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-500">Social Media Link</label>
              <div className="relative">
                <input
                  type="text"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
                  placeholder="https://your-social-link"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FiLink className="text-black" />
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-500">Professional Certifications</label>
              <div className="flex">
                <input
                  type="file"
                  ref={fileInputRefCertifications}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChangeCertifications}
                  required
                />
                <input
                  type="text"
                  id="file-display-certifications"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
                  value={certificationFileName}
                  placeholder=""
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => fileInputRefCertifications.current.click()}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2.5"
                >
                  Upload
                </button>
              </div>
              {errors.file && <p className="text-[#CF1313] text-sm mt-1">{errors.file}</p>}
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-500">Professional Photos</label>
              <div className="flex">
                <input
                  type="file"
                  ref={fileInputRefPhotos}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChangePhotos}
                  required
                />
                <input
                  type="text"
                  id="file-display-photos"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
                  value={photoFileName}
                  placeholder=""
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => fileInputRefPhotos.current.click()}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2.5"
                >
                  Upload
                </button>
              </div>
              {errors.file && <p className="text-[#CF1313] text-sm mt-1">{errors.file}</p>}
            </div>
            {/* Experience */}
            <div className="mb-6 relative">
              <label className="block mb-2 text-sm font-medium text-gray-500">Experience</label>
              <input
                type="text"
                maxLength={100}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
              />
              <span className="absolute right-2 top-10 text-xs text-gray-500">
                {100 - experience.length}/100
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="h-12 w-[30rem] text-md text-white bg-black hover:bg-gray-800 font-medium rounded-xl md:rounded-3xl text-sm flex items-center justify-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
