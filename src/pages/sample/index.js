import { customFetch } from '@/utils/axios'
import React from 'react'
import useSWR from 'swr'

const Sample = () => {
  const { data, error, isLoading } = useSWR('/blogs', customFetch)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // render data
  return (
    <div>
      {' '}
      {data.data.blog.map((item, index) => {
        return (
          <div className='' key={index}>
            hello {item._id}
          </div>
        )
      })}
      !
    </div>
  )
}

export default Sample
