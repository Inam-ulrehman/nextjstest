import { portfoliosData } from '@/utils/data'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const PortfolioCard = () => {
  return (
    <Wrapper>
      {portfoliosData.map((item, index) => {
        const first = item.image.split('/')[7]
        const second = item.image.split('/')[8].split('.')[0]
        const src = `${first}/${second}`

        return (
          <Link href={item.path} target='_blank' key={index} passHref>
            <div className='container'>
              <div className='title'>{item.title}</div>
              <CldImage src={src} width={400} height={400} alt={item.title} />
            </div>
          </Link>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  .title {
    font-weight: 700;
  }
  a {
    border: 2px solid var(--grey-2);
    transition: var(--transition);
    :hover {
      box-shadow: var(--shadow-4);
      background-color: var(--grey-2) !important;
      img {
        background-color: var(--grey-2) !important;
      }
    }
  }
  .container {
    transition: var(--transition);

    width: 30vw;
    .title {
      text-transform: capitalize;
    }
    img {
      transition: var(--transition);
      width: 100%;
      height: auto;

      background-color: var(--grey-05);
    }
  }
  @media (max-width: 620px) {
    .container {
      width: 45vw;
    }
  }
`
export default PortfolioCard
