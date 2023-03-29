import SampleNestedLayout from '@/components/sample-nested-layout'
import React from 'react'

const Sample = () => {
  return <div>main</div>
}

Sample.getLayout = function (page) {
  return <SampleNestedLayout>{page}</SampleNestedLayout>
}
export default Sample
