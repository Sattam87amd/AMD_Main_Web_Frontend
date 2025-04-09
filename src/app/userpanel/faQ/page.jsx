import Footer from '@/components/userpanel/Layout/Footer'
import Navbar from '@/components/userpanel/Layout/Navbar'
import UserFaQ from '@/components/userpanel/FaQ/UserFaQ'
import UserFrequentlyAskedQuestions from '@/components/userpanel/FaQ/UserFrequentlyAskedQuestion'
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