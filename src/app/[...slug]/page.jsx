// /app/[...slug]/page.jsx

import React from 'react'
import PackagesCatPackages from './component/packagesCatPackages'
import Topbanner from '../_common/layout/topbanner'
import Layout from '../_common/layout/layout'

function page({params}) {
    let {slug}=params
    
  return (
     <>
     <Layout>

     <Topbanner slug={slug}/>
     <PackagesCatPackages slug={slug}/>

     </Layout>
     </>
  )
}

export default page
