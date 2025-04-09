import React, { Suspense } from 'react'
import Footer from '@/components/userpanel/Layout/Footer'
import UserRegisterPage from '@/components/userpanel/UserRegister/UserRegister'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <UserRegisterPage />
        <Footer />
      </div>
    </Suspense>
  )
}

export default Page
