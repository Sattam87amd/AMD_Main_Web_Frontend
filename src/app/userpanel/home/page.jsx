<<<<<<< HEAD
import AchieveTheLook from '@/components/HomePage/AchieveTheLook';
import CareerBusinessHomeCards from '@/components/HomePage/CareerBusinessHomeCards';
import ConnectWithExpertCard from '@/components/HomePage/ConnectWithExpertCard';
import ExpertCategories from '@/components/HomePage/ExpertCategories';
import FashionBeautyHomeCards from '@/components/HomePage/FashionBeautyHomeCards';
import HeroHome from '@/components/HomePage/HeroHome';
import HomeCards from '@/components/HomePage/HomeCards';
import HowItWorks from '@/components/HomePage/HowItWorks';
import OurClientsSay from '@/components/HomePage/OurClientsSay';
// import OurPartners from '@/components/HomePage/OurPartners';
import ExpertsCards from '@/components/HomePage/TopExpert';
import WellnessHomeCards from '@/components/HomePage/WellnessHomeCards';
import HowItWork from '@/components/JoinAsExpert/HowItWork';
=======

>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import UserAchieveTheLook from '@/components/UserPanel/Home/UserAchieveTheLook';
import UserCareerBusinessHomeCards from '@/components/UserPanel/Home/UserCareerBusinessHomeCards';
import UserConnectWithExpertCard from '@/components/UserPanel/Home/UserConnectWithExpertCard';
import UserExpertCategories from '@/components/UserPanel/Home/UserExpertCategories';
import UserFashionBeautyHomeCards from '@/components/UserPanel/Home/UserFashionBeautyHomeCards';
import UserHeroHome from '@/components/UserPanel/Home/UserHeroHome';
import UserHomeCards from '@/components/UserPanel/Home/UserHomeCards';
<<<<<<< HEAD
//import UserHowItWorks from '@/components/UserPanel/Home/UserHowItWorks';
import UserOurClientsSay from '@/components/UserPanel/Home/UserOurClientsSay';
import UserOurPartners from '@/components/UserPanel/Home/UserOurPatners';
// import UserOurPartners from '@/components/UserPanel/Home/UserOurPartners';
// import UserExpertsCards from '@/components/UserPanel/Home/UserTopExperts';
=======
import UserHowItWorks from '@/components/UserPanel/Home/UserHowItWorks';
import UserOurClientsSay from '@/components/UserPanel/Home/UserOurClientsSay';
import UserOurPartners from '@/components/UserPanel/Home/UserOurPartners';
import UserExpertsCards from '@/components/UserPanel/Home/UserTopExperts';
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
import UserWellnessHomeCards from '@/components/UserPanel/Home/UserWellnessHomeCards';
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <UserHeroHome/>
<<<<<<< HEAD
      <HowItWork/>
      <UserExpertCategories/>
      <ExpertsCards/>
=======
      <UserHowItWorks/>
      <UserExpertCategories/>
      <UserExpertsCards/>
>>>>>>> ee9e21b29f3d7a1a114ad1e8ca7698f64fd09a32
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
