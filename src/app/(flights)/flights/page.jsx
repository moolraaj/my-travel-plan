
import EnquiryForm from '../components/flightForm';
import Holiday from '../components/howWorks';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/app/_common/layout/layout';
export default function flight() {
  return (
<Layout>
    <div className='main_slider vector-image'>
      <div className='outer_section-flight'>
      <div className='form_container'>
          <div className='explorations-container'>
          <div className='flight-container'>
            <Holiday />
            <EnquiryForm />
          </div>
          </div>
        </div>
      </div>
    </div>

    </Layout>
  );
}