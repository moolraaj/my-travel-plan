'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function LogoutPage() {
    const logoutHandler = async () => {
        await signOut({
            callbackUrl: '/login',
            redirect: true
        })
    }

    return (
        <>
      
            <button onClick={logoutHandler}>logout</button>

        </>
    )
}

export default LogoutPage
