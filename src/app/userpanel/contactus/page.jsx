import Footer from '@/components/UserPanel/Layout/Footer'
import Navbar from '@/components/UserPanel/Layout/Navbar'
import React from 'react'
import GetInTouchUser from '@/components/UserPanel/Contactus/GetInTouch'
import UserFeatureHighights from '@/components/UserPanel/JoinAsExpert/UserFeatureHighlights'

const page = () => {
  return (
    <div>
        <Navbar/>
        <GetInTouchUser/>
        {/* <FeatureHighights/> */}
        <UserFeatureHighights/>
        
        <Footer/>
    </div>
  )
}

export default page