
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import UserAchieveTheLook from '@/components/UserPanel/Home/UserAchieveTheLook';
import UserCareerBusinessHomeCards from '@/components/UserPanel/Home/UserCareerBusinessHomeCards';
import UserConnectWithExpertCard from '@/components/UserPanel/Home/UserConnectWithExpertCard';
import UserExpertCategories from '@/components/UserPanel/Home/UserExpertCategories';
import UserFashionBeautyHomeCards from '@/components/UserPanel/Home/UserFashionBeautyHomeCards';
import UserHeroHome from '@/components/UserPanel/Home/UserHeroHome';
import UserHomeCards from '@/components/UserPanel/Home/UserHomeCards';
import UserHowItWorks from '@/components/UserPanel/Home/UserHowItWorks';
import UserOurClientsSay from '@/components/UserPanel/Home/UserOurClientsSay';
import UserOurPartners from '@/components/UserPanel/Home/UserOurPartners';
import UserExpertsCards from '@/components/UserPanel/Home/UserTopExperts';
import UserWellnessHomeCards from '@/components/UserPanel/Home/UserWellnessHomeCards';
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <UserHeroHome/>
      <UserHowItWorks/>
      <UserExpertCategories/>
      <UserExpertsCards/>
      <UserOurClientsSay/>
      <UserWellnessHomeCards/>
      <UserFashionBeautyHomeCards/>
      <UserCareerBusinessHomeCards/>
      <UserHomeCards/>
      <UserAchieveTheLook/>
      <UserConnectWithExpertCard/>
      <UserOurPartners/>
      <Footer/>

      
    </div>
  )
}

export default page;
