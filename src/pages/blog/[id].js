import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/Blog'
import { Icons } from '@/styles/Icons'
import { websiteContent } from '@/utils/data'
import { formatDateStatic, titleCase } from '@/utils/helper'
import { CldImage, CldOgImage } from 'next-cloudinary'
import Head from 'next/head'

import React from 'react'
import styled from 'styled-components'

const SingleBlog = ({ data }) => {
  if (!data) {
    return <></>
  }
  const {
    heading,
    description,
    image,
    author,
    createdAt,
    updatedAt,
    blogHeading,
    blogDescription,
  } = data

  const url = `${websiteContent.seo.websiteName}/blog/${heading
    .split(' ')
    .join('-')
    .toLowerCase()}`
  return (
    <>
      <Head>
        <title>{titleCase(heading)}</title>
        <meta
          name='description'
          content={titleCase(description).slice(0, 160)}
        />
        <meta name='og:description' content={titleCase(description)} />
        <meta property='og:type' content='article'></meta>
        <meta name='author' content={author}></meta>
        <meta name='og:title' content={titleCase(heading)} />
        <meta name='og:url' content={url} />
        <meta property='og:locale' content='en_CA' />
        <meta
          name='article-published_time'
          property='article:published_time'
          content={createdAt}
        />
        <meta
          name='article-modified_time'
          property='article:modified_time'
          content={updatedAt}
        />

        <link rel='canonical' href={url} />
      </Head>

      <CldOgImage
        width={1200}
        height={628}
        alt={heading}
        src={image[0].public_id}
        twitterTitle={titleCase(heading)}
      ></CldOgImage>

      <Wrapper>
        <div className='blog-container'>
          <div className='bog-design'>
            <div className='title-description'>
              <h1 className='title'>{heading}</h1>
              <div className='name-time'>
                <div className='name'>
                  <span>Written By :</span>
                  <span> {author}</span>
                </div>
                <div className='time'>
                  <span>Posted On :</span>
                  <span>
                    <time dateTime={createdAt}>
                      {formatDateStatic(createdAt)}
                    </time>
                  </span>
                </div>
              </div>
              <span className='description'>{description}</span>
            </div>
            <div className='image-container'>
              <CldImage
                width={1200}
                height={628}
                alt={heading}
                src={image[0]?.public_id}
                priority
              ></CldImage>
            </div>
            <div className='body-container'>
              <div className='body-heading-description'>
                <div className='body-heading'>{blogHeading}</div>
                <div
                  className='description'
                  dangerouslySetInnerHTML={{ __html: blogDescription }}
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default SingleBlog

export async function getStaticPaths() {
  await dbConnect()
  const data = await Blog.find()

  const paths = data.map((item) => {
    return { params: { id: item.heading.split(' ').join('-').toLowerCase() } }
  })

  return { paths, fallback: true }
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  await dbConnect()
  const heading = params.id.split('-').join(' ').toLowerCase()
  const result = await Blog.find()
  const data = result.find((item) => item.heading.toLowerCase() === heading)

  // Pass post data to the page via props
  return JSON.parse(JSON.stringify({ props: { data } }))
}

// style

const Wrapper = styled.div`
  .blog-container {
    width: 90vw;
    margin: 0 auto;
    p {
      min-width: 100% !important;
    }
  }
  .bog-design {
    /* max-width: 600px; */
    .title-description {
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
        margin-left: 0;
      }
      .name-time {
        margin: 2rem 0;
        .name {
          span:nth-child(2) {
            text-transform: capitalize;
            font-weight: 500;
            border-bottom: 2px solid var(--grey-7);
            margin-left: 1rem;
          }
        }
        .time {
          span:nth-child(2) {
            text-transform: capitalize;
            margin-left: 1rem;
            border-bottom: 2px solid var(--grey-7);
            font-weight: 500;
          }
        }
      }
      .description {
        display: block;
        font-size: 1rem;
        font-weight: 400;
        :first-letter {
          text-transform: capitalize;
        }
      }
    }

    /* image */
    .image-container {
      max-width: var(--max-width);
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
      a {
        color: var(--primary-5);
        font-weight: 500;
        :hover {
          color: var(--primary-7);
        }
      }
    }
  }
`
