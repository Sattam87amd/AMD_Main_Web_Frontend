import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image"; // For optimized image handling
import { FaUser, FaCloudUploadAlt, FaComments, FaTrashAlt, FaCheckCircle } from "react-icons/fa"; // Updated to use FaCloudUploadAlt
import { LuPencilLine } from "react-icons/lu";
import { FiDollarSign } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineFeedback } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import UserExpertContactUs from "./UserExpertContactUs";
import UserBuyGiftCard from "./UserBuyGiftCard";
import UserDiscountCode from "./UserDiscountCode";
import UserPaymentMethods from "./UserPaymentMethods";
import UserGiftCard from "./UserGiftCard";
import UserPaymentHistory from "./UserPaymentHistory";
import { toast } from "react-toastify";

const UserProfileSection = () => {
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    photoFile: "", // Assuming you have a field for storing photo URL
  });
  const [userId, setUserId] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const router = useRouter();

  // Get userId from the token
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const decodedToken = JSON.parse(atob(userToken.split(".")[1]));
        const userId = decodedToken._id;
        setUserId(userId);
      } catch (error) {
        console.error("Error Parsing Token", error);
      }
    } else {
      toast.error("User Token not found. Please log in.");
    }
  }, []);

  // Fetch user details after getting userId
  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5070/api/userauth/${userId}`
          );
          const { firstName, lastName, phone = " ", email, photoFile } = response.data.data;
          setProfileData({
            firstName,
            lastName,
            phone,
            email,
            photoFile,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
          toast.error("Error fetching user details.");
        }
      };
      fetchUserDetails();
    }
  }, [userId]);

  // Handle file input for photo upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Preview the image before upload
      const formData = new FormData();
      formData.append("photoFile", file); // Add file to FormData

      // Upload image to Cloudinary and update the user's photo
      axios
        .post(`http://localhost:5070/api/userauth/uploadProfileImage/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setProfileData({ ...profileData, photoFile: response.data.user.photoFile });
          setSuccessMessage("Profile image updated successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image.");
        });
    }
  };

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSuccessMessage("Changes Saved!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Handle sign out: remove token and redirect to home page
  const handleSignOut = () => {
    localStorage.removeItem("userToken");
    router.push("/");
  };

  // Menu items for sidebar
  const menuItems = [
    { name: "Profile", icon: FaUser },
    { name: "Payment Methods", icon: FiDollarSign },
    { name: "Do you have code?", icon: FaCloudUploadAlt },
    { name: "Gift Card", icon: FaCloudUploadAlt },
    { name: "Contact Us", icon: FaComments },
    { name: "Payment History", icon: FiDollarSign },
    { name: "Give us Feedback", icon: MdOutlineFeedback },
    { name: "Sign Out", icon: BiLogOut },
    { name: "Deactivate account", icon: FaTrashAlt },
  ];

  return (
    <div className="flex flex-col md:flex-row border rounded-xl overflow-hidden bg-white m-4 md:m-8">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white p-6 border-r h-[800px]">
        <h2 className="flex items-center justify-between text-lg font-semibold pb-4 border-b mb-3">
          <span>Settings</span>
          <CiSettings className="text-3xl text-[#7E7E7E]" />
        </h2>

        <nav className="space-y-6">
          {menuItems.map((item) =>
            item.name === "Sign Out" ? (
              <button
                key={item.name}
                onClick={handleSignOut}
                className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition ${
                  selectedSection === item.name
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 text-[#7E7E7E]"
                }`}
              >
                <item.icon
                  className={
                    selectedSection === item.name
                      ? "text-white"
                      : "text-[#7E7E7E]"
                  }
                />
                {item.name}
              </button>
            ) : (
              <button
                key={item.name}
                onClick={() => setSelectedSection(item.name)}
                className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition ${
                  selectedSection === item.name
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 text-[#7E7E7E]"
                }`}
              >
                <item.icon
                  className={
                    selectedSection === item.name
                      ? "text-white"
                      : "text-[#7E7E7E]"
                  }
                />
                {item.name}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Profile Section */}
        {selectedSection === "Profile" && (
          <div className="mt-6">
 <div className="flex flex-row items-center justify-between w-full space-y-0 space-x-4 md:w-[90%]">
  <div className="flex items-center space-x-4 w-full md:w-auto">
    {/* Image with a cloud upload icon */}
    <div className="relative flex-shrink-0">
      <Image
        src={imagePreview || profileData.photoFile || "/default-profile.png"} // Fallback image if no photo
        alt="profile"
        width={60}
        height={60}
        className="w-full h-full object-cover rounded-full"
      />
      <label htmlFor="imageUpload" className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
        <FaCloudUploadAlt className="w-6 h-6" />
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>

    <div className="text-left flex-grow md:flex-shrink-0">
      <h3 className="text-lg font-semibold text-[#434966]">
        {profileData.firstName} {profileData.lastName}
      </h3>
      <p className="text-gray-500">India</p>
    </div>
  </div>

  <button
    className="border border-[#434966] px-4 md:px-5 py-2 text-[#434966] font-semibold rounded-lg flex items-center gap-2"
    onClick={handleEditClick}
  >
    Edit <LuPencilLine className="text-black h-5 w-5" />
  </button>
</div>

          


            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 flex items-center text-green-600 font-medium">
                <FaCheckCircle className="mr-2" /> {successMessage}
              </div>
            )}

            {/* Profile Form */}
            <form
              className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
              onSubmit={handleSaveClick}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-[#7E7E7E]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full ${
                    !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              {/* Save Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={!isEditing}
                  className={`text-white font-medium rounded-2xl text-sm px-6 md:px-16 py-2.5 text-center ${
                    isEditing
                      ? "bg-black hover:bg-gray-900 focus:ring-gray-300"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Other Sections */}
        {selectedSection === "Payment Methods" && <UserPaymentMethods />}
        {selectedSection === "Do you have code?" && <UserDiscountCode />}
        {selectedSection === "Gift Card" && (
          <UserGiftCard onContinue={() => setSelectedSection("BuyGiftCard")} />
        )}
        {selectedSection === "BuyGiftCard" && <UserBuyGiftCard />}
        {selectedSection === "Contact Us" && <UserExpertContactUs />}
        {selectedSection === "Payment History" && <UserPaymentHistory />}
      </div>
    </div>
  );
};

export default UserProfileSection;
