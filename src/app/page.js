'use client'
import './css/style.scss'
import World_section from '@/Components/worldSection';
import ExplorationsFarAway from '@/Components/countrySection';
import Slider from '@/Components/mainSlider';
export default function Home() {
  return (


   <div className='main_slider'>
   <div className='main_slider_inner'>
   <Slider/>
   </div>

     <div className='outer_section'>
   
      <World_section/>
      <ExplorationsFarAway/>
     </div>

     </div>  

     
  );
}
