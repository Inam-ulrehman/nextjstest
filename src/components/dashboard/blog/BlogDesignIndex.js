import { Icons } from '@/styles/Icons'
import { formatDate } from '@/utils/helper'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const initialState = {
  images: [],
}
const BlogDesignIndex = ({ blogs, readMore }) => {
  const [state, setState] = useState(initialState)
  const {
    image,
    heading,
    description,
    blogHeading,
    blogDescription,
    author,
    createdAt,
  } = blogs

  const path = heading.split(' ').join('-').toLowerCase()
  useEffect(() => {
    setState({ ...state, images: image })
  }, [image])
  return (
    <Wrapper>
      <div className='title-description'>
        <Link
          href={`/blog/[id]`}
          as={`/blog/${path}`}
          className='title description-title'
        >
          {heading}
        </Link>
        <div className='name-time'>
          <div className='name'>
            <span>Written By :</span>
            <span> {author}</span>
          </div>
          <div className='time'>
            <span>Posted On :</span>
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>
        <div className='image-container'>
          {state.images.length > 0 && (
            <CldImage
              width={1200}
              height={600}
              alt={heading}
              src={state.images[0]?.public_id}
            ></CldImage>
          )}
        </div>
        <span className='description'>
          {description}{' '}
          {readMore && (
            <Link href={`/blog/[id]`} as={`/blog/${path}`}>
              <span>Read More {Icons.link}</span>
            </Link>
          )}
        </span>
      </div>
      {/* =========Body container====== */}
      {/* {!readMore && (
        <div className='body-container'>
          <div className='body-heading-description'>
            <div className='body-heading'>{blogHeading}</div>
            <div
              className='description'
              dangerouslySetInnerHTML={{ __html: blogDescription }}
            />
          </div>
        </div>
      )} */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* max-width: 600px; */
  .title-description {
    /* span {
      display: block;
    } */
    .title {
      text-align: start;
      padding: 1rem 0;
      font-size: 2rem;
      font-weight: 650;
      text-transform: capitalize;
      border-bottom: 2px solid var(--primary-4);
      width: fit-content;
      :hover {
        cursor: pointer;
        color: var(--primary-5);
      }
    }
    .description {
      display: block;
      font-size: 1.1rem;
      font-weight: 500;
      :first-letter {
        text-transform: capitalize;
      }
      a {
        color: var(--primary-4);
        span {
          display: inline-block;
          margin: 0 0.5rem;
        }
        :hover {
          color: var(--primary-6);
        }
      }
    }
  }
  .name-time {
    margin-top: 1rem;
    .name {
      span:nth-child(2) {
        text-transform: uppercase;
        font-weight: 500;
        border-bottom: 2px solid var(--grey-7);
        margin-left: 1rem;
      }
    }
    .time {
      span:nth-child(2) {
        text-transform: uppercase;
        margin-left: 1rem;
        border-bottom: 2px solid var(--grey-7);
        font-weight: 500;
      }
    }
  }
  /* image */
  .image-container {
    /* display: grid;
    place-items: center; */
    img {
      width: 100%;
      height: auto;
      padding: 1rem 0;
    }
  }
  /* body */

  .body-heading {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
    border-bottom: 2px solid var(--grey-4);
    width: fit-content;
    padding: 1rem 0;
  }
  .description {
    p {
      :first-letter {
        text-transform: capitalize;
      }
    }
  }
`
export default BlogDesignIndex
