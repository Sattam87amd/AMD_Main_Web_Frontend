"use client";
import UserTopExpert from "@/components/UserPanel/Experts/UserTopExpert/UserTopExpert";
// import UserTopExpert from "@/components/UserPanel/Experts/UserTopeexpert/UserTopeexpert";
import Footer from "@/components/UserPanel/Layout/Footer";
import LoginExpertCategory from "@/components/UserPanel/LoginExpertCategory/LoginExpertCategory";
import LoginUserMobileNavSearch from "@/components/UserPanel/LoginUserExpert/LoginUserMobileNavSearch/LoginUserMobileNavSearch";
import NavSearch from "@/components/UserPanel/NavSearch/NavSearch";
import UserBottomNav from "@/components/UserPanel/UserBottomNav/UserBottomNav";
import UseSidebar from "@/components/UserPanel/UseSideBar/UserSidebar";


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
            <NavSearch/>
            <LoginExpertCategory/>
            <div className="space-y-8 px-4 pb-12 md:pb-0">
              <UserTopExpert/>
              
             
            </div>
          </div>

          {/* Mobile View - MobileNavSearch */}
          <div className="block md:hidden pb-12 md:pb-0">
            <LoginUserMobileNavSearch />
            <div className="space-y-8 px-4">
              <UserTopExpert />
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Full Width) */}
      <div className="w-full hidden sm:block">
        <Footer/>
      </div>
      <div className="block sm:hidden ">
  <UserBottomNav />
</div>
    </div>
  );
};

export default Page;