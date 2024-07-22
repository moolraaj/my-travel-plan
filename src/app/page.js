import World_section from '@/Components/worldSection';
import ExplorationsFarAway from '@/Components/countrySection';
import Slider from '@/Components/mainSlider';
import Destinations from '@/Components/topcoutrypackages';
import BestSellingPackages from '@/Components/packagecards';

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
     

     </div>

     </div>  

     
  );
}
