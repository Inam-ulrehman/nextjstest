import SampleNestedLayout from '@/components/sample-nested-layout'
import React from 'react'

const Two = () => {
  return <div>Two</div>
}

Two.getLayout = function (page) {
  return <SampleNestedLayout>{page}</SampleNestedLayout>
}

export default Two
