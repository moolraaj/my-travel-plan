

import Layout from '@/app/_common/layout/layout'
import Topbanner from '@/app/_common/layout/topbanner'
import React from 'react'
import CityAllpackages from './components/packagesCard';
 
 

 
 

function page({ params }) {
  let { slug } = params

  const slugArray = Array.isArray(slug) ? slug : slug.split('/');

  console.log(slug)

   





  return (
    <>
      <Layout>
        {slugArray.length===1&&(
          <>
          
                  <Topbanner slug_one={slugArray[0]} />
                  <CityAllpackages slug_one={slugArray[0]} />
          
          </>
        )}
        
      </Layout>
    </>
  )
}

export default page
