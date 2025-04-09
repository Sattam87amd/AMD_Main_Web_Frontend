import Footer from '@/components/userpanel/Layout/Footer'
import Navbar from '@/components/userpanel/Layout/Navbar'
import React from 'react'
import GetInTouchUser from '@/components/userpanel/Contactus/GetInTouch'
import UserFeatureHighights from '@/components/userpanel/JoinAsExpert/UserFeatureHighlights'

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