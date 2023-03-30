import { websiteContent } from '@/utils/data'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
const { address, email, mobile } = websiteContent.address
const Address = () => {
  return (
    <Wrapper>
      <div className='heading'>OUR ADDRESS</div>
      <ul className='body'>
        <li>
          <Link href={address.path} target={'_blank'} passHref>
            {address.title}
          </Link>
        </li>
        <li>
          <Link href={mobile.path} passHref>
            <span>Mobile:</span> {mobile.title}
          </Link>
        </li>
        <li>
          <Link href={email.path} passHref>
            <span>Email:</span> {email.title}
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .heading {
    font-weight: 600;
    color: var(--primary-2);
    border-bottom: 2px solid var(--primary-5);
    width: fit-content;
    margin: 0 auto;
  }
  ul {
    display: grid;
    justify-content: center;
  }
  a {
    font-weight: 400;
    color: var(--white);
    :hover {
      color: var(--primary-2);
      border-bottom: 2px solid var(--primary-2);
      span {
        border-bottom: 2px solid var(--primary-5);
        color: var(--primary-5);
      }
    }
  }
  span {
    :hover {
      border: transparent;
    }
  }
`

export default Address
