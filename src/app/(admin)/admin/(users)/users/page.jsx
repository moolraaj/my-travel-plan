'use client';
import Breadcrumb from '@/app/(admin)/_common/Breadcrumb'
import React from 'react'

function page() {
  return (
   <>
   <Breadcrumb path="/admin/users"/>
    <div>This is users page </div>
   </>
  )
}

export default page