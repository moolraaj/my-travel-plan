'use client'
import React from 'react'
import Login from '../Components/login'
import loginbg from '../../../../public/images/login-bg.png'

function page() {
  return (
    <div className='popup-bg' style={{ backgroundImage: `url(${loginbg.src})` }}>
      <Login/>
    </div>
  )
}

export default page
