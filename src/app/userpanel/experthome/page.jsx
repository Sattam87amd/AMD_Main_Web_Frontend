"use client"
import Footer from '@/components/Layout/Footer'
import MobileNavSearch from '@/components/Layout/mobilenavsearch'
// import NavSearch from '@/components/Layout/navsearch'
import NavSearch from '@/components/Layout/navsearch'
import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
// import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
import UserHomeexperts from '@/components/UserPanel/UserExpert-Home/UserExpert-Home'
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
