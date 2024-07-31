import AddressDetail from '../components/address_detail';
import Layout from '@/app/_common/layout/layout';

import Image from 'next/image';
import Link from 'next/link';
import Map from '../components/map';
import ContactForm from '../components/contactForm';
export default function contact() {
  return (
<Layout>
    <div className='main_slider contact_left_vector'>
      <div className='outer_sectioncontact'>
        <div className='breadcrumbs_section contact_breadcrumbs' style={{ backgroundImage: 'url(/images/contact.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className='inner-w-container'>
            <div className='breadcrumbs_inner_section'>
              <div className='breadcrumb-heading'>
                <h2>Contact Us</h2>
              </div>
              <div className='breadcrumb'>
                <Link href="/">
                  Home
                </Link>
                <a> / Contact Us</a>
              </div>
            </div>
          </div>
        </div>
        <div className='explorations-container'>
          <AddressDetail />
        </div>
        <div className='form_container' style={{ backgroundImage: 'url(/images/tourist.png)', backgroundSize: '568px', backgroundPosition: 'right bottom', backgroundRepeat: 'no-repeat' }}>
          <div className='explorations-container'>
          <ContactForm/>
          </div>
        </div>
        <div className='explorations-container'>
           <Map/>
        </div>
      </div>

    </div>
    </Layout>
  );
}