import Footer from '@/components/UserPanel/Layout/Footer'
import Navbar from '@/components/UserPanel/Layout/Navbar'
import UserFaQ from '@/components/UserPanel/FaQ/UserFaQ'
import UserFrequentlyAskedQuestions from '@/components/UserPanel/FaQ/UserFrequentlyAskedQuestion'
import React from 'react'

 const page = () => {
  return (
    <div>
   <Navbar/>
   <UserFaQ/>
   <UserFrequentlyAskedQuestions/>
   <Footer/>

    </div>
  )
}

export default page