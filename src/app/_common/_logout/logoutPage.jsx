'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

function LogoutPage({role}) {
    const logoutHandler = async () => {
        await signOut({
            callbackUrl:role==='admin'?'/admin/login': '/login',
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
