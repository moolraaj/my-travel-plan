import React from 'react'
import offerimage from '../../../assets/home_images/offer.png';


function Offer() {
  return (
    <div className='offer_inner'>
      <div className='left_offer_side'>
         <h2>Book Your Package To Stay Updated With Our Latest Discounts more than 40% !!</h2>
         <button>View Discounts</button>
      </div>

      <div className='right_side_offer'>
          <img src={offerimage.src}/>
      </div>


        
     </div>
  )
}

export default Offer