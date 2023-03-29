import { imagesData } from '@/utils/data'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Error = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name='description' content='Problem Generating page' />
      </Head>
      <Wrapper style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
        <Image
          src={imagesData.error}
          width={400}
          height={400}
          alt='Page not found'
          priority
        />
        <Link href={'/'} className='btn '>
          Back To Home Page
        </Link>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  place-items: center;

  a {
    width: fit-content;
  }
  @media (max-width: 620px) {
    img {
      width: 95vw;
      height: auto;
    }
  }
`
export default Error
