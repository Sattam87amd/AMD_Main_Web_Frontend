import LoginPage from '@/components/RegisterLogin/Login'
import Footer from '@/components/UserPanel/Layout/Footer'
import UserLoginPage from '@/components/UserPanel/Login/UserLogin'
import React from 'react'

const page = () => {
  return (
    <div>
      <LoginPage/>
        <Footer/>
    </div>
  )
}
export default page