import { deleteSample, singleSample } from '@/features/samples/swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'

const SingleSample = () => {
  const router = useRouter()
  const { query } = useRouter()
  const { isLoading, error, data } = singleSample(query.id)

  if (isLoading) {
    return <div>Loading</div>
  }
  if (error) {
    toast.error(error.response.data.msg)
    router.push('/samples')
    return
  }

  const { name, _id, updatedAt, createdAt } = data?.data?.result

  return (
    <div>
      <h1>{name}</h1>
      <p>{_id}</p>
      <p>{updatedAt}</p>
      <p>{createdAt}</p>
      <button onClick={() => deleteSample(_id)}>Delete</button>
      <Link href={'/samples'}>Go back</Link>
    </div>
  )
}

export default SingleSample
