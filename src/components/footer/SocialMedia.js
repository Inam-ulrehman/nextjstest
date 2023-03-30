import { Icons } from '@/styles/Icons'
import { websiteContent } from '@/utils/data'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const { facebook, instagram, linkedin, twitter } = websiteContent.socialMedia
const SocialMedia = () => {
  return (
    <Wrapper>
      <div className='heading'>SOCIAL MEDIA</div>
      <ul>
        <li>
          <Link className='facebook' target='_blank' href={facebook} passHref>
            {Icons.facebook}
          </Link>
        </li>
        <li>
          <Link className='linkedin' target='_blank' href={linkedin} passHref>
            {Icons.linkedin}
          </Link>
        </li>
        <li>
          <Link className='instagram' target='_blank' href={instagram} passHref>
            {Icons.instagram}
          </Link>
        </li>
        <li>
          <Link className='twitter' target='_blank' href={twitter} passHref>
            {Icons.twitter}
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;

  .heading {
    font-weight: 600;
    color: var(--primary-2);
    border-bottom: 2px solid var(--primary-5);
    width: fit-content;
    margin: 0 auto;
  }
  ul {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  .facebook,
  .linkedin,
  .instagram,
  .twitter {
    transition: var(--transition);
    color: var(--white);
    :hover {
      color: var(--primary-3);
    }
  }
`
export default SocialMedia
