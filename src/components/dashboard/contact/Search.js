import { getStateValues } from '@/features/contacts/contactsSlice'
import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Search = () => {
  const dispatch = useDispatch()
  const { searchName, searchEmail, searchMobile } = useSelector(
    (state) => state.contacts
  )
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  return (
    <Wrapper>
      {/* name */}
      <div>
        <input
          type='text'
          name='searchName'
          placeholder='Name'
          value={searchName}
          onChange={handleChange}
        />
        <BiSearchAlt2 />
      </div>

      {/* email */}
      <div>
        <input
          type='email'
          name='searchEmail'
          placeholder='Email'
          value={searchEmail}
          onChange={handleChange}
        />
        <BiSearchAlt2 />
      </div>

      {/* Mobile */}
      <div>
        <input
          type='text'
          placeholder='Mobile'
          name='searchMobile'
          value={searchMobile}
          onChange={handleChange}
        />
        <BiSearchAlt2 />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 5px 0;
  div {
    margin-right: 1rem;
    background-color: var(--white);
    border: 2px solid var(--grey-5);
    input {
      border: transparent;
      height: 100%;
    }
    svg {
      margin: 0 5px;
    }
  }
  @media (max-width: 768px) {
    justify-content: center;
  }
`

export default Search
