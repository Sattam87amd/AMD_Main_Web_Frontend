"use client";


import Footer from "@/components/userpanel/Layout/Footer";
import UserNavSearch from "@/components/userpanel/Layout/NavSearch";
import LoginExpertCategory from "@/components/userpanel/LoginExpertCategory/LoginExpertCategory";
import LoginUserMobileNavSearch from "@/components/userpanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import LoginUserWellnessexpert from "@/components/userpanel/LoginUserExpert/LoginUserWellness/LoginUserWellness";
import UseSidebar from "@/components/userpanel/UseSideBar/UserSidebar";


const Page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content and Sidebar Container */}
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[15%] h-[85%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <UseSidebar />
        </aside>

        {/* Main Content (Right Section - 80% Width) */}
        <div className="w-full md:w-[85%] flex flex-col">
          {/* Desktop View - NavSearch */}
          <div className="hidden md:block">
            <UserNavSearch />
            <LoginExpertCategory/>
            <div className="space-y-8 px-4 md:px-8">
              <LoginUserWellnessexpert /> 
             
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden">
            <LoginUserMobileNavSearch />
            <div className="space-y-8 px-4">
              < LoginUserWellnessexpert/>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Full Width) */}
      <div className="w-full ">
        <Footer/>
      </div>
    </div>
  );
};

export default Page;