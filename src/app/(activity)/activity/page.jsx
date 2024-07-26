import TopActivities from '../activity/Components/top_activities';
import TopDiscountedActivities from '../activity/Components/top_discounted_activities';
import TopDestinations from '../activity/Components/Top_destination';
import LatestNews from '../activity/Components/latest_news_blog';
import Layout from '@/app/_common/layout/layout';
import Topbanner from '@/app/_common/layout/topbanner';

export default function Home() {
  return (
<Layout>
     <div className='outer_section_abanner'>
      <Topbanner/>
     </div> 
      <TopActivities/>
      <TopDiscountedActivities/>
      <TopDestinations/>
      <LatestNews/>
     
     </Layout>    
  );
}
