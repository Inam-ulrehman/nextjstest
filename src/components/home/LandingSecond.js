import { Button } from '@/styles/Wrappers/Buttons'
import { LandingWrapper } from '@/styles/Wrappers/LandingWrapper'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
const src = 'Inamwebsolutions-nextjs/5_tj2xjb'

const LandingSecond = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)
  return (
    <LandingWrapper style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
      <div className='text-box box'>
        <h3 className='first-heading'>Where Creativity Meets Technology</h3>
        <h4 className='second-heading'>
          Contact us today to learn more about our services and how we can help
          you succeed online.
        </h4>
        <p>
          Whether you need a simple website to showcase your products or a
          complex e-commerce platform to sell your services, we have the
          expertise to deliver results that exceed your expectations.
        </p>
        <div className='mobile-image'>
          <CldImage
            src={src}
            width={720}
            height={720}
            alt='Home page image'
          ></CldImage>
        </div>
        <Link href='/contact'>
          <Button shadow outlined>
            Contact us
          </Button>
        </Link>
      </div>
      <div className='image-box box'>
        <CldImage
          src={src}
          width={720}
          height={720}
          alt='Home page image'
        ></CldImage>
      </div>
    </LandingWrapper>
  )
}

export default LandingSecond
