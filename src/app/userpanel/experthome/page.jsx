"use client"
import Footer from '@/components/Layout/Footer'
import MobileNavSearch from '@/components/Layout/mobilenavsearch'
import NavSearch from '@/components/Layout/navsearch'
import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
<<<<<<< HEAD
//mport UserExpertAboutMe from '@/components/UserPanel/UserAboutMe/UserExpertAboutMe'
import UserHomeexperts from '@/components/UserPanel/UserHomeexperts/UserHomeexperts'
// import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
//import UserHomeexperts from '@/components/UserPanel/UserExpert-Home/UserExpert-Home'
=======
// import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
import UserHomeexperts from '@/components/UserPanel/UserExpert-Home/UserExpert-Home'
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
import React from 'react'

const page = () => {
  return (

    <div className="md:flex min-h-screen relative">
        <div className="hidden  md:block">
      <NavSearch/>
      <UserHomeexperts/>
      <UserThreepara/>
      <Footer/>
      
      </div>

      <div className="block md:hidden">
        <MobileNavSearch/>
        <UserHomeexperts/>
        <UserThreepara/>
        <Footer/>

      </div>
    </div>
  )
}

export default page

// src\app\userpanel\experthome\page.jsx
