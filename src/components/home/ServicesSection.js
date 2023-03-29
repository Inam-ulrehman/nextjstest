import { servicesData } from '@/utils/data'
import React from 'react'
import styled from 'styled-components'
import ProductCard from '../cards/ProductCard'

const ServicesSection = () => {
  const data = servicesData

  return (
    <Wrapper>
      <div className='heading-title'>
        <span>SERVICES</span>
      </div>
      <div className='container'>
        {data?.map((item, index) => {
          return <ProductCard item={item} key={index} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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
  @media (min-width: 620px) {
    .heading-title {
    }
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`
export default ServicesSection
