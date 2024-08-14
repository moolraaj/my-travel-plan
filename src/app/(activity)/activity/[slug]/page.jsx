 
import Topbanner from '@/app/_common/layout/topbanner'
 
import React from 'react'
import ActivityBloggallery from './component/activitySlugPage'
import Layout from '@/app/_common/layout/layout'

async function page({params}) {
    let {slug}=params

    
  return (
     <>
     <Layout>
     <Topbanner slug={slug}/>
      <ActivityBloggallery slug={slug}/>
      </Layout>
     </>
  )
}

export default page
