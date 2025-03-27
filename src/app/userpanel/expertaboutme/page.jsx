import Footer from '@/components/UserPanel/Layout/Footer'
import Navbar from '@/components/UserPanel/Layout/Navbar'
import AboutMeReviewsUser from '@/components/UserPanel/Expertaboutme/AboutMeReviewsUser'
import ExpertAboutMeUser from '@/components/UserPanel/Expertaboutme/ExpertAboutMeUser'
import ScheduleQuickCallsUser from '@/components/UserPanel/Expertaboutme/ScheduleQuickCallsUser'
import SimilarExpertsUser from '@/components/UserPanel/Expertaboutme/SimilarExpertUser'
import WhatToExpectUser from '@/components/UserPanel/Expertaboutme/WhatToExpectUser'
import React from 'react'
import UserFeatureHighights from '@/components/UserPanel/JoinAsExpert/UserFeatureHighlights'


const page = () => {
  return (
    <div className="md:mt-20">
        <Navbar/>
       <ExpertAboutMeUser/>
       <WhatToExpectUser/>
       <ScheduleQuickCallsUser/>
       <AboutMeReviewsUser/>
      <div className=' lg:h-[300px]'>

       <UserFeatureHighights/>
      </div>
       
       
  
       <SimilarExpertsUser/>
        <Footer/>


    </div>
  )
}


export default page