import React from 'react'
import PaymentMethods from '../footer/components/payment'
import Destinations from './components/destinations'
import FooterLinks from './components/otherlinks'
import ContactLinks from './components/contact'
import footerb from '../../assets/home_images/footerbackground.png';
import Offer from './components/offer';

function Footer() {
  return (

   <div className='offer_footer'>
    <Offer/>


    <div className='footer_main' style={{ backgroundImage: `url(${footerb.src})`}}>

      
      <div className='footer_section'>
      <PaymentMethods/>
      <Destinations/>
      <FooterLinks/>
      <ContactLinks/>

      </div>
      <div className='copyright_footer'>
        <p>© 2024 My Travel Plan | All Rights Reserved | Design By Spark Web Solutions</p>
      </div>
    </div>
    </div>
  )
}

export default Footer
