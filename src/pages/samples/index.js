import List from '@/components/samples/List'
import Pagination from '@/components/samples/Pagination'
import { useSampleData } from '@/features/samples/swr'
import React, { useState } from 'react'
import styled from 'styled-components'

const initialState = {
  page: 1,
  limit: 10,
}
const Sample = () => {
  const [state, setState] = useState(initialState)
  const { page, limit } = state
  const { data, isLoading, error } = useSampleData({ page, limit })

  const { data: preloadData } = useSampleData({ page: page + 1, limit })
  if (!data) {
    return
  }
  return (
    <Wrapper>
      <div className='title'>
        <strong>{page}</strong>
      </div>
      {/* List */}
      <List data={data} />
      <div style={{ display: 'none' }}>
        <List data={preloadData} />
      </div>
      {/* pagination buttons */}
      <Pagination
        state={state}
        setState={setState}
        nbHits={data?.data?.nbHits}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
`

export default Sample
