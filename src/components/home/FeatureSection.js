import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PortfolioCard from '../cards/PortfolioCard'

const FeatureSection = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)

  return (
    <Wrapper>
      <div className='heading-title'>
        <span>PORTFOLIOS</span>
      </div>

      <PortfolioCard />
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
`
export default FeatureSection
