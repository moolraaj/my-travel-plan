'use client'
import React from 'react'
import Navbar from './components/navbar'
import logo from '../../assets/home_images/logo.png'
import ContactUs from './components/profile'



function Header() {
  return (
    <div>
     <div className='outer_header'>
     <div className='top_header'>

      <div className='header_logo'>
        <img src={logo.src}/>
      </div>
      <Navbar/>
         <ContactUs/>
       
      </div>
      </div> 
    </div>
  )
}

export default Header
