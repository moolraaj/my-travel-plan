import React from 'react'
import Overview from '../components/Overview'
import Stats from '../components/Stats'
import RecentBookings from '../components/RecentBookings'
import DataPercentage from '../components/DataPercentage'


async function page() {
 

  return (
    <div className="dashboard-page">
      <Overview />
      <Stats />
      <DataPercentage/>
      <RecentBookings />
    </div>
  )
}

export default page
