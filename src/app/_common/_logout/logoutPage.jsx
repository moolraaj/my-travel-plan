'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
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
      
            <span onClick={logoutHandler} className='dropdown-item'>Logout</span>

        </>
    )
}

export default LogoutPage
