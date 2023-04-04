import { customFetch } from '@/utils/axios'
import React from 'react'
import styled from 'styled-components'

const Pagination = ({ state, setState, nbHits }) => {
  if (!state) {
    return
  }
  const totalPages = Math.ceil(nbHits / state.limit)
  const pagesArray = Array.from({ length: totalPages }, (v, i) => i + 1)

  //

  const handleNext = () => {
    if (state.page === totalPages) {
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setState({ ...state, page: state.page + 1 })
  }
  const handlePrev = () => {
    if (state.page === 1) {
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setState({ ...state, page: state.page - 1 })
  }
  const handleIndex = (index) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setState({ ...state, page: index })
  }

  return (
    <Wrapper className='btn-container'>
      {nbHits && pagesArray.length !== 1 && (
        <>
          <button className='prev' onClick={handlePrev}>
            Prev
          </button>

          <div className='index-button-container'>
            {pagesArray
              .map((item, index) => {
                return (
                  <button
                    className={
                      state.page === item
                        ? `active index-button`
                        : 'index-button'
                    }
                    onClick={() => handleIndex(item)}
                    key={index}
                  >
                    {item}
                  </button>
                )
              })
              .slice(state.page - 1, state.page + 3)}
          </div>
          {state.page < totalPages - 3 && <strong>...</strong>}
          <button className='next' onClick={handleNext}>
            Next
          </button>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  display: flex;

  justify-content: space-between;
  button {
    padding: 6px;
    border: transparent;
    background-color: var(--grey-5);
    border-radius: var(--radius-1);
    :hover {
      cursor: pointer;
      background-color: var(--grey-6);
    }
  }
  .prev,
  .next {
    margin: 5px;
  }
  .index-button {
    padding: 5px 15px;
    margin: 3px;
    margin-top: 5px;
  }
  .active {
    background-color: var(--grey-9);
    color: var(--white);
  }
`

export default Pagination
