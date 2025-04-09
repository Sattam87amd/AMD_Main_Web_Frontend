"use client"
import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
import Footer from '@/components/UserPanel/Layout/Footer'
import MobileNavSearch from '@/components/UserPanel/Layout/MobileNavSearch'
import UserNavSearch from '@/components/UserPanel/Layout/NavSearch'
import UserHomeexperts from '@/components/UserPanel/UserExpert-Home/UserExpert-Home'
import React from 'react'

const page = () => {
  return (

    <div className="md:flex min-h-screen relative">
        <div className="hidden  md:block">
      <UserNavSearch/>
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
