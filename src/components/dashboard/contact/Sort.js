import { clearState, getStateValues } from '@/features/contacts/contactsSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Sort = () => {
  const { limit, sort, nbHits, page } = useSelector((state) => state.contacts)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  const handleClear = () => {
    dispatch(clearState())
  }
  return (
    <Wrapper>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>
      <div className='page-total'>
        <div className='page'>
          Page No: <strong>{page}</strong>
        </div>
        <div className='total'>
          Total: <strong>{nbHits}</strong>
        </div>
      </div>
      <div className='limit-sort'>
        <div className='limit'>
          <label htmlFor='limit'>Limit</label>
          <select name='limit' id='limit' value={limit} onChange={handleChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
          </select>
        </div>
        <div className='sort'>
          <label htmlFor='sort'>Sort</label>
          <select name='sort' id='sort' value={sort} onChange={handleChange}>
            <option value='-createdAt'>SELECT OPTIONS</option>
            <option value='-createdAt'>DATE NEW</option>
            <option value='createdAt'>DATE OLD</option>
          </select>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .page-total {
    display: flex;
    .page {
      margin-right: 1rem;
    }
  }
  .limit-sort {
    display: flex;
    label {
      padding: 0 5px;
    }
  }
  @media (max-width: 768px) {
    padding: 5px;
    justify-content: center;
    .clear-filter {
      margin-right: 1rem;
    }
  }
`
export default Sort
