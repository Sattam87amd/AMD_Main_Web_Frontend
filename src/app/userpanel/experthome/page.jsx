"use client"
import UserThreepara from '@/components/userpanel/Experts/UserThreepara/UserThreepara'
import Footer from '@/components/userpanel/Layout/Footer'
import MobileNavSearch from '@/components/userpanel/Layout/MobileNavSearch'
import UserNavSearch from '@/components/userpanel/Layout/NavSearch'
import UserHomeexperts from '@/components/userpanel/UserExpert-Home/UserExpert-Home'
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
