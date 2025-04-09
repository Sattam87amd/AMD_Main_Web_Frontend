import Footer from '@/components/userpanel/Layout/Footer'
import AboutMeReviewsUser from '@/components/userpanel/Expertaboutme/AboutMeReviewsUser'
import ExpertAboutMeUser from '@/components/userpanel/Expertaboutme/ExpertAboutMeUser'
import ScheduleQuickCallsUser from '@/components/userpanel/Expertaboutme/ScheduleQuickCallsUser'
import SimilarExpertsUser from '@/components/userpanel/Expertaboutme/SimilarExpertUser'
import WhatToExpectUser from '@/components/userpanel/Expertaboutme/WhatToExpectUser'
import React from 'react'
import UserFeatureHighights from '@/components/userpanel/JoinAsExpert/UserFeatureHighlights'
import UserNavSearch from '@/components/userpanel/Layout/NavSearch'
import UserSidebar from "@/components/userpanel/UseSideBar/UserSidebar";
// import Sidebar from '@/components/UserPanel/LoginUserExpert/SideBar/Sidebar'


const page = () => {
  return (
    <>
    <div className='flex min-h-screen flex-col '>
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[15%] h-[85%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <UserSidebar />
        </aside>

    <div className="w-full md:w-[85%] flex flex-col ">
        <UserNavSearch />
       <ExpertAboutMeUser/>
       <WhatToExpectUser/>
       <ScheduleQuickCallsUser/>
       <AboutMeReviewsUser/>
      <div className=' lg:h-[300px]'>

       <UserFeatureHighights/>
       
      </div>
      <SimilarExpertsUser/>


    </div>
    </div>
    </div>
    <Footer/>
    </>
    
  )
}


export default page