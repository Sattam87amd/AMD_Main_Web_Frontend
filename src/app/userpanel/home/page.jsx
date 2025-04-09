import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import UserAchieveTheLook from '@/components/userpanel/Home/UserAchieveTheLook';
import UserCareerBusinessHomeCards from '@/components/userpanel/Home/UserCareerBusinessHomeCards';
import UserConnectWithExpertCard from '@/components/userpanel/Home/UserConnectWithExpertCard';
import UserExpertCategories from '@/components/userpanel/Home/UserExpertCategories';
import UserFashionBeautyHomeCards from '@/components/userpanel/Home/UserFashionBeautyHomeCards';
import UserHeroHome from '@/components/userpanel/Home/UserHeroHome';
import UserHomeCards from '@/components/userpanel/Home/UserHomeCards';
import UserHowItWorks from '@/components/userpanel/Home/UserHowItWorks';
import UserOurClientsSay from '@/components/userpanel/Home/UserOurClientsSay';
import UserOurPartners from '@/components/userpanel/Home/UserOurPartners';
import UserExpertsCards from '@/components/userpanel/Home/UserTopExperts';
import UserWellnessHomeCards from '@/components/userpanel/Home/UserWellnessHomeCards';
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
