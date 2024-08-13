import React from 'react'
import PackagesCatPackages from './component/packagesCatPackages'

function page({params}) {
    let {slug}=params
    
  return (
     <>
     <PackagesCatPackages slug={slug}/>
     </>
  )
}

export default page
