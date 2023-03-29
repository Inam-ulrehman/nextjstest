import { Icons } from '@/styles/Icons'
import { websiteContent } from '@/utils/data'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const { email, mobile } = websiteContent.address
const { facebook, instagram, linkedin, twitter } = websiteContent.socialMedia

const Banner = () => {
  return (
    <Wrapper>
      <div className='contact'>
        <Link className='email' href={email.path} passHref>
          <i>{Icons.email}</i> <span>{email.title}</span>
        </Link>
        <Link className='mobile' href={mobile.path} passHref>
          <i>{Icons.mobile}</i> <span>{mobile.title}</span>
        </Link>
      </div>
      <div className='social'>
        <Link
          alt='facebook'
          className='facebook'
          target={'_blank'}
          href={facebook}
          passHref
        >
          <i>{Icons.facebook}</i>
        </Link>
        <Link
          alt='linkedin'
          className='linkedin'
          target={'_blank'}
          href={linkedin}
          passHref
        >
          <i>{Icons.linkedin}</i>
        </Link>
        <Link
          alt='instagram'
          className='instagram'
          target={'_blank'}
          href={instagram}
          passHref
        >
          <i>{Icons.instagram}</i>
        </Link>
        <Link
          alt='twitter'
          className='twitter'
          target={'_blank'}
          href={twitter}
          passHref
        >
          <i>{Icons.twitter}</i>
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: var(--primary-7);
  color: var(--white);
  /* address */
  .contact {
    display: flex;
    a {
      color: var(--white);
      display: flex;
      align-items: center;
      i {
      }
      span {
        margin-top: -6px;
        margin-left: 10px;
      }
    }
    .email {
      transition: var(--transition);
      border-right: 2px solid var(--white);
      padding-right: 1rem;
      :hover {
        color: var(--primary-3);
      }
    }
  }
  .mobile {
    padding-left: 1rem;
    transition: var(--transition);
    :hover {
      color: var(--primary-3);
    }
  }
  /* social  */
  .social {
    display: flex;

    a {
      color: var(--white);
      margin-left: 1rem;
      margin-bottom: -5px;
      padding: 2px;
    }
    .facebook,
    .linkedin,
    .instagram,
    .twitter {
      transition: var(--transition);
      :hover {
        color: var(--primary-3);
      }
    }
  }
  @media (max-width: 620px) {
    display: none;
  }
`
export default Banner
