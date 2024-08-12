import React from 'react'

function page({params}) {
    let {slug}=params
  return (
    <div>
      <h1>this is {slug}</h1>
    </div>
  )
}

export default page
