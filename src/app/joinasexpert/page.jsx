import Footer from '@/components/UserPanel/Layout/Footer'




import React from 'react'
import Navbar from '@/components/Layout/Navbar'
import BecomeExpert from '@/components/JoinAsExpert/BecomeExpert'
import WhyJoinUs from '@/components/JoinAsExpert/WhyJoinUs'
import OurClientsSay from '@/components/HomePage/OurClientsSay'
import FeatureHighights from '@/components/ContactUs/FeatureHighlights'
import HowItWork from '@/components/JoinAsExpert/HowItWork'
import GameChanger from '@/components/JoinAsExpert/GameChanger'

const page = () => {
    return (
        <div>
            <Navbar/>

            <BecomeExpert/>
            <div className='md:-mt-28 sm:-mt-96 '>

            <WhyJoinUs/>
            </div>
            <OurClientsSay/>
            <FeatureHighights/>
            <div className='mt-16'>

            <HowItWork/>
            </div>
            
            <GameChanger/>
            <Footer />
        </div>
    )
}

export default page
