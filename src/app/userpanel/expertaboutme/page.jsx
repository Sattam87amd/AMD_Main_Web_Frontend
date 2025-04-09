import Footer from '@/components/UserPanel/Layout/Footer'
import AboutMeReviewsUser from '@/components/UserPanel/expertaboutme/AboutMeReviewsUser'
import ExpertAboutMeUser from '@/components/UserPanel/expertaboutme/ExpertAboutMeUser'
import ScheduleQuickCallsUser from '@/components/UserPanel/expertaboutme/ScheduleQuickCallsUser'
import SimilarExpertsUser from '@/components/UserPanel/expertaboutme/SimilarExpertUser'
import WhatToExpectUser from '@/components/UserPanel/expertaboutme/WhatToExpectUser'
import React from 'react'
import UserFeatureHighights from '@/components/UserPanel/JoinAsExpert/UserFeatureHighlights'
import Sidebar from '@/components/UserPanel/LoginUserExpert/Sidebar/Sidebar'
import NavSearch from '@/components/UserPanel/NavSearch/NavSearch'


const page = () => {
  return (
    <>
    <div className='flex min-h-screen flex-col '>
      <div className="flex flex-1">
        {/* Sidebar (Left Section - 20% Width) */}
        <aside className="w-[15%] h-[85%] hidden md:block bg-gray-100 overflow-y-auto -mt-5">
          <Sidebar />
        </aside>

    <div className="w-full md:w-[85%] flex flex-col ">
        <NavSearch />
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