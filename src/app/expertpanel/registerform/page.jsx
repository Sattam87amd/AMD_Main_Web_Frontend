"use client"
import RegisterForm from '@/components/ExpertPanel/RegisterForm/RegisterForm'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <RegisterForm/>
      <Footer />
    </div>
  )
}

export default page;
