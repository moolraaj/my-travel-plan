 
import Topbanner from '@/app/_common/layout/topbanner'
 
import React from 'react'
import ActivityBloggallery from './component/activitySlugPage'

async function page({params}) {
    let {slug}=params

    
  return (
     <>
     <Topbanner slug={slug}/>
      <ActivityBloggallery slug={slug}/>
     </>
  )
}

export default page
