import React from 'react'
import Overview from '../components/Overview'
import Stats from '../components/Stats'
import RecentBookings from '../components/RecentBookings'

function page() {
  return (
    <div className="dashboard-page">
      <Overview />
      <Stats />
      <RecentBookings />
    </div>
  )
}

export default page
