import React from 'react'

import Explorations from './Components/citiesinnercards'
import Layout from '../../_common/layout/layout'
import Topbanner from '@/app/_common/layout/topbanner'


export default function page() {
  return (
    <Layout>
    <div>
      <Topbanner/>
      <Explorations/>
    </div>
    </Layout>
  )
}
