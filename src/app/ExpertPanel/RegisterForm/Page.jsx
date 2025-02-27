import RegisterForm from '@/components/ExpertPanel/RegisterForm/RegisterForm'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Navbar />
      <RegisterForm />
      <Footer />
    </div>
  )
}

export default Page;
