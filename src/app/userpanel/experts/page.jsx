
import Footer from '@/components/Layout/Footer'
import NavSearch from '@/components/Layout/navsearch'
import UserCab from '@/components/UserPanel/Experts/UserCAD/Usercad'

import UserFbexpert from '@/components/UserPanel/Experts/UserFashion&Beauty-Expert/UserFbexpert'
import UserHomeexpert from '@/components/UserPanel/Experts/UserHomeexpert/UserHomeexpert'
import UserMobileNavSearch from '@/components/UserPanel/Experts/UserMobileexpert/UserMobileNavSearch'
import UserThreepara from '@/components/UserPanel/Experts/UserThreepara/UserThreepara'
import UserTopExpert from '@/components/UserPanel/Experts/UserTopExpert/UserTopExpert'
//import UserTopExpert from '@/components/UserPanel/Experts/UserTopeexpert/UserTopeexpert'
import UserWellnessExperts from '@/components/UserPanel/Experts/UserWellnessExperts/UserWellnessExperts'
// import LoginUserMobileNavSearch from '@/components/UserPanel/LoginUserExpert/LoginUserMoblieNavSearch/LoginUserMoblieNavSearch'
import React from 'react'

 const page = () => {
  return (

    //Desktop view navsearch
    <div >
      <div className='hidden md:block'>
       <NavSearch/>
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
