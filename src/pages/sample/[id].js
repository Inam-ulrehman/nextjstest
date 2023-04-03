import { deleteSample, singleSample } from '@/features/samples/swr'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'

const SingleSample = () => {
  const router = useRouter()

  const { data, isLoading, isError } = singleSample(router.query.id)

  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    toast.error(isError.response.data.msg)
    return <div>Error</div>
  }
  const sample = data?.data?.result
  return (
    <div>
      <h1>{sample.name}</h1>
      <p>{sample._id}</p>
      <p>{sample.updatedAt}</p>
      <p>{sample.createdAt}</p>
      <button onClick={() => deleteSample(sample._id)}>Delete</button>
    </div>
  )
}

export default SingleSample
