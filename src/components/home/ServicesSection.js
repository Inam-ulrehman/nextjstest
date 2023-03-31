import React from 'react'
import styled from 'styled-components'

const ServicesSection = () => {
  return (
    <Wrapper>
      <div className='heading-title'>
        <span>SERVICES</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: 1;
  background-color: var(--grey-05);
  .heading-title {
    font-weight: 700;
    text-align: center;
    padding: 1rem;
    font-size: 40px;
    color: var(--primary-7);
    span {
      border-bottom: 4px solid var(--primary-5);
    }
  }
`
export default ServicesSection
