import { Button } from '@/styles/Wrappers/Buttons'
import { LandingWrapper } from '@/styles/Wrappers/LandingWrapper'
import { CldImage } from 'next-cloudinary'

import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const src = 'Inamwebsolutions-nextjs/7_hc7dgu'

const Landing = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)
  return (
    <LandingWrapper style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
      <div className='text-box box'>
        <h1 className='first-heading'>
          Professional Website Designing Services.
        </h1>
        <h2 className='second-heading'>
          We have the expertise and resources to create a website that reflects
          your brand
        </h2>
        <p>
          At our website designing company, we offer professional and customized
          website design services that are tailored to meet the unique needs of
          your business.
        </p>
        <div className='mobile-image'>
          <CldImage
            src={src}
            width={720}
            height={720}
            alt='Home page image'
            priority
          ></CldImage>
        </div>
        <Link href='/contact' passHref>
          <Button shadow outlined>
            Lets Talk
          </Button>
        </Link>
      </div>
      <div className='image-box box'>
        <CldImage
          src={src}
          width={720}
          height={720}
          alt='Home page image'
          priority
        ></CldImage>
      </div>
    </LandingWrapper>
  )
}

export default Landing
