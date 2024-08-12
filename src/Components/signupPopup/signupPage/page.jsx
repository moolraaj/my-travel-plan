'use client'
import React, { Suspense } from 'react'

import loginbg from '../../../../public/images/login-bg.png'
import SignupPopup from '../Components/popup'

function SignupPage() {
  return (
    <div className='popup-bg' style={{ backgroundImage: `url(${loginbg.src})` }}>
      <Suspense fallback={<div>Loading...</div>}>
      <SignupPopup/>
    </Suspense>
    </div>
  )
}

export default SignupPage
