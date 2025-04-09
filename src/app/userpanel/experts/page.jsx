'use client'
import UserCab from '@/components/UserPanel/Experts/UserCAD/Usercad'

import UserFbexpert from '@/components/UserPanel/Experts/UserFashion&Beauty-Expert/UserFbexpert'
import UserHomeexpert from '@/components/UserPanel/Experts/UserHomeexpert/UserHomeexpert'
import UserMobileNavSearch from '@/components/UserPanel/Experts/UserMobileexpert/UserMobileNavSearch'
import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
import UserTopExpert from '@/components/UserPanel/Experts/UserTopExpert/UserTopExpert'
import UserWellnessExperts from '@/components/UserPanel/Experts/UserWellnessExperts/UserWellnessExperts'
import Footer from '@/components/UserPanel/Layout/Footer'
import UserNavSearch from '@/components/UserPanel/Layout/NavSearch'
import React from 'react'

 const page = () => {
  return (

    //Desktop view navsearch
    <div >
      <div className='hidden md:block'>
       <UserNavSearch/>
       <UserTopExpert/>
       <UserWellnessExperts/>
       <UserFbexpert/>
       <UserCab/>
       <UserHomeexpert/>
       <UserThreepara/>
       <Footer/>
       </div>
       
       {/* Mobile View - MobileNavSearch */}
       <div className="block md:hidden">
        <UserMobileNavSearch/>
        <UserTopExpert/>
        <UserWellnessExperts/>
        <UserFbexpert/>
        <UserCab/>
        <UserHomeexpert/>
        <UserThreepara/>
        <Footer/>
        

       </div>

    </div>
   
  );

};

export default page;
