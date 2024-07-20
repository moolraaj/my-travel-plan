import TopActivities from '../activity/Components/top_activities';
import TopDiscountedActivities from '../activity/Components/top_discounted_activities';
import TopDestinations from '../activity/Components/Top_destination';
import LatestNews from '../activity/Components/latest_news_blog';

export default function Home() {
  return (

     <div className='outer_section'>
     <div className='breadcrumbs_section'  style={{ backgroundImage: 'url(/images/europe_img_1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='inner-w-container'>
        <div className='breadcrumbs_inner_section'>
            <div className='breadcrumb-heading'>
                <h2>Find Next Place To Visit</h2>
            </div>
            <div className='breadcrumb'>
                <p>Home</p><a>Page Name</a>
            </div>
        </div>
     </div>
     </div> 
      <TopActivities/>
      <TopDiscountedActivities/>
      <TopDestinations/>
      <LatestNews/>
     </div>      
  );
}
