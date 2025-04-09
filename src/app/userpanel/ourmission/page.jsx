'use client'
import UserGameChangers from '@/components/UserPanel/JoinAsExpert/UserGameChanger'
import Footer from '@/components/UserPanel/Layout/Footer'
import Navbar from '@/components/UserPanel/Layout/Navbar'
import UserOurMission from '@/components/UserPanel/OurMission/UserOurMisson'

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