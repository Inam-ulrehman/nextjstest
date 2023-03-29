import ProductCard from '@/components/cards/ProductCard'
import { Icons } from '@/styles/Icons'
import { servicesData, websiteContent } from '@/utils/data'
import { titleCase } from '@/utils/helper'
import { CldImage } from 'next-cloudinary'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

const Services = ({ data }) => {
  const { title, subtitle, description, image } = websiteContent.services
  const first = image.split('/')[7]
  const second = image.split('/')[8].split('.')[0]
  const src = `${first}/${second}`

  return (
    <>
      <Head>
        <title>{titleCase(title)}</title>
        <meta name='description' content={titleCase(subtitle)} />
        <link
          rel='canonical'
          href={`${websiteContent.seo.websiteName}/services`}
        />
      </Head>
      <Wrapper>
        <div className='heading'>
          <div className='heading-container'>
            <div className='heading-titles'>
              <h1>{title}</h1>
              <h2>{subtitle}</h2>
            </div>
            <div className='heading-image'>
              <CldImage
                src={src}
                width={720}
                height={720}
                alt={title}
                priority
              ></CldImage>
            </div>
          </div>
          <p className='description'>{description}</p>
        </div>
        <div className='body'>
          <div className='heading-title'>
            <span>SERVICES</span>
          </div>
          <div className='container'>
            {data?.map((item, index) => {
              return <ProductCard key={index} item={item} />
            })}
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default Services

export async function getStaticProps() {
  let data = servicesData

  return {
    props: {
      data,
    },
  }
}

// style
const Wrapper = styled.div`
  .heading {
    img {
    }
    .description {
      padding: 1rem;
      min-width: 90vw;
      margin: 0 auto;
      color: var(--grey-7);
    }
  }
  .heading-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .heading-titles {
    padding: 1rem;

    h1 {
      font-weight: 700;
      margin-left: 0;
      color: var(--primary-8);
      text-transform: capitalize;
    }
    h2 {
      max-width: 700px;
      font-weight: 500;
      font-size: var(--large-text);
      margin-left: 0;
    }
    margin-left: 3rem;
  }
  .heading-image {
    display: grid;
    justify-content: center;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(241, 243, 245, 1) 0%,
      var(--primary-8) 100%
    );
    img {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 768px) {
    .heading-container {
      display: grid;
      grid-template-columns: 1fr;
    }
    .heading {
      h1 {
        text-align: center;
        font-size: x-large;
      }
      img {
        width: 95vw;
        height: auto;
      }
    }
    .heading-titles {
      text-align: center;
      margin-left: 0rem;
    }
    .heading-image {
      background: linear-gradient(
        180deg,
        rgba(241, 243, 245, 1) 0%,
        var(--primary-8) 100%
      );
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /* body */
  .body {
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
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
  }
`
