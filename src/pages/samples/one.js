import SampleNestedLayout from '@/components/sample-nested-layout'
import React from 'react'

const One = () => {
  return <div>One</div>
}

One.getLayout = function (page) {
  return <SampleNestedLayout>{page}</SampleNestedLayout>
}

export default One
