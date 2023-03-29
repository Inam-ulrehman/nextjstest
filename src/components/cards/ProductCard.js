import { Icons } from '@/styles/Icons'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const LinkWrapper = styled.div`
  :hover {
    color: ${(props) => props.inputColor};
    background-color: var(--${(props) => props.inputColor}-1);
  }
`

const ProductCard = ({ item }) => {
  const path = item.title.split(' ').join('-').toLowerCase()

  return (
    <Wrapper inputColor={item.color} className='body-container '>
      <Link href={`/services/[id]`} as={`/services/${path}`} passHref>
        <div className='body-container-header'>
          <i style={{ color: `var(--${item.color}-7)` }}>{Icons[item.icon]}</i>
          <p style={{ color: `var(--${item.color}-7)` }}>{item.title}</p>
        </div>
        <p>{item.description}</p>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  :hover {
    color: ${(props) => props.inputColor};
    background-color: var(--${(props) => props.inputColor}-05);
  }

  position: relative;
  z-index: 0;
  transition: var(--transition);
  width: 30vw;
  background-color: var(--white);
  padding: 1rem;
  margin: 0.5rem;
  :hover {
    cursor: pointer;
    box-shadow: var(--shadow-5);
  }

  .body-container-header {
    text-align: center;
    p {
      font-weight: 700;
      margin-bottom: 0;
      text-transform: capitalize;
    }
  }
  @media (max-width: 620px) {
    min-width: 90vw;
  }
`

export default ProductCard
