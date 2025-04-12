import React from 'react'
import Navbar from '@/components/Layout/Navbar'
import ExpertCategories from '@/components/HomePage/ExpertCategories'
import HeroHome from '@/components/HomePage/HeroHome'
import HowItWorks from '@/components/HomePage/HowItWorks'
import OurClientsSay from '@/components/HomePage/OurClientsSay'
import ExpertCard from '@/components/HomePage/TopExpert'
import WellnessHomeCards from '@/components/HomePage/WellnessHomeCards'
import FashionBeautyHomeCards from '@/components/HomePage/FashionBeautyHomeCards'
import CareerBusinessHomeCards from '@/components/HomePage/CareerBusinessHomeCards'
import HomeCards from '@/components/HomePage/HomeCards'
import AchieveTheLook from '@/components/HomePage/AchieveTheLook'
import ConnectWithExpertCard from '@/components/HomePage/ConnectWithExpertCard'
import OurPartners from '@/components/HomePage/OurPartners'
import Footer from '@/components/Layout/Footer'
import ExpertsCardsBefore from '@/components/ExpertBeforeLogin/TopExpertsBefore'
import WellnessBefore from '@/components/ExpertBeforeLogin/WellnessBefore'
import FashionBeautyBefore from '@/components/ExpertBeforeLogin/Fasion&BeautyBefore'
import CareerBusinessBefore from '@/components/ExpertBeforeLogin/Career&BusinessBefore'
import HomeExpertsBefore from '@/components/ExpertBeforeLogin/HomeExpertBefore'

const page = () => {
  return (
    <div>
        <Navbar/>
        <HeroHome/>
        <HowItWorks/>
        <ExpertCategories/>
        <ExpertsCardsBefore/>
        <OurClientsSay/>
        <WellnessBefore/>
        <FashionBeautyBefore/>
        <CareerBusinessBefore/>
        <HomeExpertsBefore/>
        <AchieveTheLook/>
        <ConnectWithExpertCard/>
        <OurPartners/>
        <Footer/>
    </div>
  )
}

export default page