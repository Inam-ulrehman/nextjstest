import { getStateValues } from '@/features/blogs/blogsSlice'
import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Search = () => {
  const dispatch = useDispatch()
  const {
    searchHeading,
    searchDescription,
    searchBlogHeading,
    searchBlogDescription,
  } = useSelector((state) => state.blogs)
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  return (
    <Wrapper>
      {/* Heading */}
      <div>
        <input
          type='text'
          name='searchHeading'
          placeholder='Heading'
          value={searchHeading}
          onChange={handleChange}
        />
        <BiSearchAlt2 />
      </div>
      {/* Description */}
      <div>
        <input
          type='text'
          name='searchDescription'
          placeholder='Description'
          value={searchDescription}
          onChange={handleChange}
        />
        <BiSearchAlt2 />
      </div>
      {/* BlogHeading */}
      <div>
        <input
          type='text'
          name='searchBlogHeading'
          placeholder='BlogHeading'
          value={searchBlogHeading}
          onChange={handleChange}
        />
        <BiSearchAlt2 />
      </div>
      {/* BlogDescription */}
      <div>
        <input
          type='text'
          name='searchBlogDescription'
          placeholder='Blog Description'
          value={searchBlogDescription}
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
