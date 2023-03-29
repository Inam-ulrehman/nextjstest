import { Button } from '@/styles/Wrappers/Buttons'
import { LandingWrapper } from '@/styles/Wrappers/LandingWrapper'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
const src = 'Inamwebsolutions-nextjs/11_pz70pn'

const LandingThird = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)
  return (
    <LandingWrapper style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
      <div className='text-box box'>
        <h4 className='first-heading'>
          Your Ultimate Destination for Exceptional Website{' '}
        </h4>
        <h5 className='second-heading'>
          We are committed to ensuring that you are completely satisfied with
          the final product.
        </h5>
        <p>
          We understand that every business is different, which is why we take
          the time to get to know your brand, your goals, and your audience
          before we start the design process.
        </p>
        <div className='mobile-image'>
          <CldImage
            src={src}
            width={400}
            height={400}
            alt='Home page image'
          ></CldImage>
        </div>
        <Link href='/portfolios'>
          <Button shadow outlined>
            portfolios
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

export default LandingThird
