import { Icons } from '@/styles/Icons'
import { servicesData, websiteContent } from '@/utils/data'
import { cloudinarySrc, titleCase } from '@/utils/helper'
import { CldImage } from 'next-cloudinary'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

const SingleService = ({ data }) => {
  if (!data) {
    return <></>
  }
  const { title, image, description, points } = data
  const src = cloudinarySrc(image)

  return (
    <>
      <Head>
        <title>{titleCase(title)}</title>
        <meta
          name='description'
          content={titleCase(description).slice(0, 160)}
        />
        <link
          rel='canonical'
          href={`${websiteContent.seo.websiteName}/services/${title
            .split(' ')
            .join('-')
            .toLowerCase()}`}
        />
      </Head>
      <Wrapper>
        <div className='header'>
          <div className='header-titles'>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className='header-image'>
            <CldImage src={src} width={720} height={720} alt={title} priority />
          </div>
        </div>
        <div className='body'>
          {points.map((item, index) => {
            return (
              <div className='body-container card' key={index}>
                <div className='body-container-header'>
                  <i>{Icons.development}</i>
                  <p>{item.title}</p>
                </div>
                <p className='description'>{item.description}</p>
              </div>
            )
          })}
        </div>
      </Wrapper>
    </>
  )
}

export default SingleService

export async function getStaticPaths() {
  const data = servicesData

  const paths = data.map((item) => {
    return { params: { id: item.title.split(' ').join('-').toLowerCase() } }
  })

  return { paths, fallback: true }
}
// This also gets called at build time
export async function getStaticProps({ params }) {
  const title = params.id.split('-').join(' ').toLowerCase()
  const result = servicesData
  const data = result.find((item) => item.title.toLowerCase() === title)

  // Pass post data to the page via props
  return JSON.parse(JSON.stringify({ props: { data } }))
}

// style

const Wrapper = styled.div`
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    .header-titles {
      margin-left: 3rem;
    }
    .header-image {
      height: 100%;
      display: grid;
      justify-content: center;
      background: linear-gradient(
        90deg,
        var(--grey-05) 0%,
        var(--grey-4) 50%,
        var(--grey-5) 100%
      );
      img {
        width: 100%;
        height: 100%;
      }
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      .header-titles {
        margin-left: 0rem;
        p {
          padding: 1rem;
        }
      }
      .header-image {
        background: linear-gradient(
          180deg,
          var(--grey-05) 0%,
          var(--grey-4) 50%,
          var(--grey-5) 100%
        );
      }
      img {
        width: 95vw;
        height: auto;
      }
      h1 {
        text-align: center;
        font-size: x-large;
      }
    }
    h1 {
      font-weight: 700;
      margin-left: 0;
      color: var(--primary-8);
      text-transform: capitalize;
    }
    p {
      max-width: 700px;
      font-weight: 500;
      font-size: var(--large-text);
      margin-left: 0;
      color: var(--grey-8);
    }
    img {
      margin: 0 auto;
    }
  }
  /* body */
  .body {
    display: grid;
    place-content: center;
  }
  .body-container {
    width: 90vw;
    display: grid;
    place-content: center;

    .body-container-header {
      display: grid;
      place-items: center;
      p {
        margin: 0;
        font-weight: 600;
        text-transform: capitalize;
      }
      i {
        background-color: var(--white);
        color: var(--primary-5);
        padding: 1rem;
        border-radius: 50% 50%;
      }
    }
    .description {
      text-align: center;
      color: var(--grey-8);
    }
    @media (max-width: 620px) {
      .description {
        text-align: start;
      }
    }
  }
`
