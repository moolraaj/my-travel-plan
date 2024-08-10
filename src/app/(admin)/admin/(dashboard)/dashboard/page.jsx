import React from 'react'
import Overview from '../components/Overview'
import Stats from '../components/Stats'
import RecentBookings from '../components/RecentBookings'
import DataPercentage from '../components/DataPercentage'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/(nextauth)/auth/[...nextauth]/options'
 
 

async function page() {
  let session=await getServerSession(authOptions)
  
 

  return (
    <div className="dashboard-page">
    <h1>{JSON.stringify(session)}</h1>
      <Overview />
      <Stats />
      <DataPercentage/>
      <RecentBookings />
    </div>
  )
}

export default page
