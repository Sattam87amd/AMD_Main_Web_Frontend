import EditExpertProfile from '@/components/ExpertPanel/Expert/EditExpertProfile'
import ExpertProfile from '@/components/ExpertPanel/Expert/ExpertProfile'
import Sidebar from '@/components/ExpertPanel/SideBar/SideBar'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Right Side Content (Always Profile Section) */}
      <div className="flex-1 p-4">
        <ExpertProfile />
        <EditExpertProfile/>
      </div>
    </div>
  )
}

export default page