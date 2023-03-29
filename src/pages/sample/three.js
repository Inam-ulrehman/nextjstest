import SampleNestedLayout from '@/components/sample-nested-layout'
import React from 'react'

const three = () => {
  return <div>three</div>
}

three.getLayout = function (page) {
  return <SampleNestedLayout>{page}</SampleNestedLayout>
}

export default three
