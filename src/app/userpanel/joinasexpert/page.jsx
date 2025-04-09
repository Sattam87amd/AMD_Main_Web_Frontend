import Footer from '@/components/userpanel/Layout/Footer'
import Navbar from '@/components/userpanel/Layout/Navbar'
import UserBecomeExpert from '@/components/userpanel/JoinAsExpert/UserBecomeAnExpert'
import UserFeatureHighights from '@/components/userpanel/JoinAsExpert/UserFeatureHighlights'
import UserGameChangers from '@/components/userpanel/JoinAsExpert/UserGameChanger'
import UserHowItWorks from '@/components/userpanel/JoinAsExpert/UserHowITworkers'
import UserOurClientsSay from '@/components/userpanel/JoinAsExpert/UserOurClientsSay'
import UserWhyJoinUs from '@/components/userpanel/JoinAsExpert/UserWhyJoinUs'


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
