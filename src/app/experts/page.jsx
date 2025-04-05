
import Footer from '@/components/Layout/Footer'
import NavSearch from '@/components/Layout/navsearch'
import TopExpert from '@/components/HomePage/TopExpert'
import UserCab from '@/components/UserPanel/Experts/UserCAD/Usercad'
import UserFbexpert from '@/components/UserPanel/Experts/UserFashion&Beauty-Expert/UserFbexpert'
import UserHomeexpert from '@/components/UserPanel/Experts/UserHomeexpert/UserHomeexpert'
import UserMobileNavSearch from '@/components/UserPanel/Experts/UserMobileexpert/UserMobileNavSearch'
import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
import UserTopExpert from '@/components/UserPanel/Experts/UserTopeexpert/UserTopeexpert'
import UserWellnessExperts from '@/components/UserPanel/Experts/UserWellnessExperts/UserWellnessExperts'
import React from 'react'
import WellnessHomeCards from '@/components/HomePage/WellnessHomeCards'
import FashionBeautyHomeCards from '@/components/HomePage/FashionBeautyHomeCards'
import CareerBusinessExperts from '@/components/Experts/Career&Buisness/Career&Buisness'
import CareerBusinessHomeCards from '@/components/HomePage/CareerBusinessHomeCards'
import HomeCards from '@/components/HomePage/HomeCards'
import MobileNavSearch from '@/components/Layout/mobilenavsearch'

 const page = () => {
  return (

  
    <div >
      <div className=''>
        <MobileNavSearch/>
       <NavSearch/>
       <TopExpert/>
       <WellnessHomeCards/>
       <FashionBeautyHomeCards/>
       <CareerBusinessHomeCards/>
       <HomeCards/>
       <UserThreepara/>
       <Footer/>
       </div>
      




    </div>
    


   
  );

};

export default page;
