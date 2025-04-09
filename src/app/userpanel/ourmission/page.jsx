'use client'
import UserGameChangers from '@/components/userpanel/JoinAsExpert/UserGameChanger'
import Footer from '@/components/userpanel/Layout/Footer'
import Navbar from '@/components/userpanel/Layout/Navbar'
import UserOurMission from '@/components/userpanel/OurMission/UserOurMisson'

import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar />
            <UserOurMission />
            <div className='mt-10'>

            <UserGameChangers/>
            </div>
            <Footer />

        </div>
    )
}

export default page