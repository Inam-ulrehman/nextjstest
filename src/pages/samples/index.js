import List from '@/components/samples/List'
import Pagination from '@/components/samples/Pagination'
import React, { useState } from 'react'
import styled from 'styled-components'

const initialState = {
  page: 1,
  limit: 10,
}
const Sample = () => {
  const [state, setState] = useState(initialState)

  return (
    <div>
      <div className='title'>
        <strong>{state.page}</strong>
      </div>
      {/* List */}
      <List page={state.page} limit={state.limit} />
      <div style={{ display: 'none' }}>
        <List page={state.page + 1} limit={state.limit} />
      </div>
      {/* pagination buttons */}
      <Pagination state={state} setState={setState} />
    </div>
  )
}

const Wrapper = styled.div`
  min-height: 50px;
  text-align: center;
  box-shadow: var(--shadow-3);
  margin: 0.2rem auto;
  padding: 0.5rem;
  p {
    margin: 0;
  }
  max-width: fit-content;
  background-color: var(--white);
`

export default Sample