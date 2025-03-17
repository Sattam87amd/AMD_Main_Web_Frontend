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

const page = () => {
  return (
    <div>
        <Navbar/>
        <HeroHome/>
        <HowItWorks/>
        <ExpertCategories/>
        <ExpertCard/>
        <OurClientsSay/>
        <WellnessHomeCards/>
        <FashionBeautyHomeCards/>
        <CareerBusinessHomeCards/>
        <HomeCards/>
        <AchieveTheLook/>
        <ConnectWithExpertCard/>
        <OurPartners/>
        <Footer/>
    </div>
  )
}

export default page