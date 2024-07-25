'use client'
import World_section from '@/Components/worldSection';
import ExplorationsFarAway from '@/Components/countrySection';
import Slider from '@/Components/mainSlider';
import Destinations from '@/Components/topcoutrypackages';
import BestSellingPackages from '@/Components/packagecards';
import ExploreDestinations from '@/Components/exploredestinations';
import LatestBlog from '@/Components/blogs';

export default function Home() {
  return (


   <div className='main_slider'>
   <div className='main_slider_inner'>
   <Slider/>
   </div>

     <div className='outer_section'>
   
      <World_section/>
      <Destinations/>
        <ExplorationsFarAway/>

      <BestSellingPackages/>

      <ExploreDestinations/> 

      <LatestBlog/>  
      <h1></h1>  

     </div>

     </div>  

     
  );
}
