import { BlogDesign } from '@/components/dashboard/blog'
import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/Blog'
import { Icons } from '@/styles/Icons'
import { websiteContent } from '@/utils/data'
import { CldImage } from 'next-cloudinary'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const src = 'Inamwebsolutions-nextjs/nnzlsqedlgak3awdem5y'
const Blogs = ({ data }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta
          name='description'
          content=' Stay Informed and Up-to-Date with Our Thought-Provoking Blog Posts'
        />
        <link rel='canonical' href={`${websiteContent.seo.websiteName}/blog`} />
      </Head>
      <Wrapper>
        <div className='blog-container'>
          <div className='heading-container'>
            <div className='heading-titles'>
              <h1>Our Comprehensive Blogging Service</h1>
              <h2>
                Stay informed and up-to-date with our thought-provoking blog
                posts
              </h2>
            </div>
            <div className='heading-image'>
              <CldImage
                src={src}
                width={720}
                height={720}
                alt={'blog'}
                priority
              ></CldImage>
            </div>
          </div>

          <div className='blog-body'>
            {data.map((item) => {
              return (
                <div className='blog-holder' key={item._id}>
                  {/* <BlogDesign blogs={item} readMore={true} /> */}
                </div>
              )
            })}
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default Blogs

export async function getStaticProps() {
  await dbConnect()
  const data = await Blog.find().sort('-createdAt')

  return JSON.parse(JSON.stringify({ props: { data } }))
}

// style
const Wrapper = styled.div`
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
  /* body */
  .blog-body {
    padding: 3rem;
  }

  /* desktop only */
  @media (min-width: 768px) {
    /* blog inside class */
    .title-description {
      .description-title {
        height: 120px;
        display: block;
        border-bottom: none;
      }
    }

    /* body */
    .blog-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

  /* mobile only */
  @media (max-width: 768px) {
    .heading-container {
      display: grid;
      grid-template-columns: 1fr;
    }
    .heading-titles {
      margin-left: 0rem;

      h1 {
        font-size: 2rem;
        text-align: center;
      }
      h1,
      h2 {
        max-width: 90vw;
      }
    }
    .heading-image {
      background: linear-gradient(
        180deg,
        rgba(241, 243, 245, 1) 0%,
        var(--primary-8) 100%
      );
    }
  }
  /* body */
  .blog-body {
    padding: 1rem;
    margin: 0 auto;
    max-width: 100vw;
  }
`
