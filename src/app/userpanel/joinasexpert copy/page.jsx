import Footer from '@/components/UserPanel/Layout/Footer'
import Navbar from '@/components/UserPanel/Layout/Navbar'
import UserBecomeExpert from '@/components/UserPanel/JoinAsExpert/UserBecomeAnExpert'
import UserFeatureHighights from '@/components/UserPanel/JoinAsExpert/UserFeatureHighlights'
import UserGameChangers from '@/components/UserPanel/JoinAsExpert/UserGameChanger'
import UserHowItWorks from '@/components/UserPanel/JoinAsExpert/UserHowITworkers'
import UserOurClientsSay from '@/components/UserPanel/JoinAsExpert/UserOurClientsSay'
import UserWhyJoinUs from '@/components/UserPanel/JoinAsExpert/UserWhyJoinUs'


import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar />

            <UserBecomeExpert/>
            <div className='md:-mt-28 sm:-mt-96 '>

            <UserWhyJoinUs/>
            </div>
            <UserOurClientsSay/>
            <UserFeatureHighights/>
            <div className='mt-16'>

            <UserHowItWorks/>
            </div>
            
            <UserGameChangers />
            <Footer />
        </div>
    )
}

export default page
