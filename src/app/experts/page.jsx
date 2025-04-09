
import Footer from '@/components/Layout/Footer'
import NavSearch from '@/components/Layout/navsearch'
import TopExpert from '@/components/HomePage/TopExpert'
import React from 'react'
import WellnessHomeCards from '@/components/HomePage/WellnessHomeCards'
import FashionBeautyHomeCards from '@/components/HomePage/FashionBeautyHomeCards'
import CareerBusinessHomeCards from '@/components/HomePage/CareerBusinessHomeCards'
import HomeCards from '@/components/HomePage/HomeCards'
import MobileNavSearch from '@/components/Layout/mobilenavsearch'
import Threepara from '@/components/Experts/Threepara/threepara'
import ExpertCategory from '@/components/ExpertCategory/ExpertCategory'

 const page = () => {
  return (

  
    <div >
      <div className=''>
        <MobileNavSearch/>
       <NavSearch/>
       <ExpertCategory/>
       <TopExpert/>
       <WellnessHomeCards/>
       <FashionBeautyHomeCards/>
       <CareerBusinessHomeCards/>
       <HomeCards/>
       <Threepara />
       <Footer/>
       </div>
      




    </div>
    


   
  );

};

export default page;
