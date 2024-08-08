
import { getServerSession } from 'next-auth'
import React from 'react'
import authOptions from '../api/(nextauth)/auth/[...nextauth]/options'
 
import LogoutPage from '../_common/_logout/logoutPage'


async function page() {
    let session=await getServerSession(authOptions)
    
  
  return (
    <div>
        <h1>{JSON.stringify(session)}</h1>
      <h1>this is user dashboard admin cant excess this dashboard</h1>

      <LogoutPage/>

      
    
    </div>
  )
}

export default page
