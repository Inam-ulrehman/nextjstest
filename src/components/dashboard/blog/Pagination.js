import { index, next, prev } from '@/features/blogs/blogsSlice'
import PaginationHook from '@/hooks/PaginationHook'
import React from 'react'
import { useSelector } from 'react-redux'

const Pagination = () => {
  const { isLoading, page, nbHits, limit } = useSelector((state) => state.blogs)

  if (isLoading) {
    return <></>
  }
  return (
    <div>
      <PaginationHook
        page={page}
        nbHits={nbHits}
        limit={limit}
        prev={prev}
        next={next}
        index={index}
      />
    </div>
  )
}

export default Pagination
