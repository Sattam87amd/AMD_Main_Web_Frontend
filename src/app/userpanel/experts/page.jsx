'use client'
import UserCab from '@/components/userpanel/Experts/UserCAD/Usercad'

import UserFbexpert from '@/components/userpanel/Experts/UserFashion&Beauty-Expert/UserFbexpert'
import UserHomeexpert from '@/components/userpanel/Experts/UserHomeexpert/UserHomeexpert'
import UserMobileNavSearch from '@/components/userpanel/Experts/UserMobileexpert/UserMobileNavSearch'
import UserThreepara from '@/components/userpanel/Experts/UserThreepara/UserThreepara'
import UserTopExpert from '@/components/userpanel/Experts/UserTopExpert/UserTopExpert'
import UserWellnessExperts from '@/components/userpanel/Experts/UserWellnessExperts/UserWellnessExperts'
import Footer from '@/components/userpanel/Layout/Footer'
import UserNavSearch from '@/components/userpanel/Layout/NavSearch'
import LoginExpertCategory from '@/components/userpanel/LoginExpertCategory/LoginExpertCategory'
import React from 'react'

 const page = () => {
  return (

    //Desktop view navsearch
    <div >
      <div className='hidden md:block'>
       <UserNavSearch/>
       <LoginExpertCategory/>
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
