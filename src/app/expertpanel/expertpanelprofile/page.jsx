import ProfileSection from '@/components/ExpertPanel/ExpertPanelProfile/ProfileSection'
import ProfileSidebar from '@/components/ExpertPanel/ProfileSidebar/ProfileSidebar'
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Sidebar/>
        <ProfileSidebar/>
        <ProfileSection/>
    </div>
  )
}

export default page