// ================particles ===========
import SampleNestedLayout from '@/components/sample-nested-layout'
import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
// ================particles ===========
import { Button } from '@/styles/Wrappers/Buttons'
import { LandingWrapper } from '@/styles/Wrappers/LandingWrapper'
import { CldImage } from 'next-cloudinary'

import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const src = 'Inamwebsolutions-nextjs/7_hc7dgu'

const Landing = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine)
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container)
  }, [])

  return (
    <>
      <Wrapper>
        <div className='color-particles'></div>
        <div className='particles-container'>
          <Particles
            className='particles'
            id='tsparticles'
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: '#c1c8cd',
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: 'push',
                  },
                  onHover: {
                    enable: true,
                    mode: 'repulse',
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: '#ffffff',
                },
                links: {
                  color: '#ffffff',
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  directions: 'none',
                  enable: true,
                  outModes: {
                    default: 'bounce',
                  },
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: 'circle',
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>

        <LandingWrapper
          className='landingWrapper'
          style={{
            minHeight: `calc
    
    (100vh - ${headerHeight}px)`,
          }}
        >
          <div className='text-box box'>
            <h1 className='first-heading'>
              Professional Website Designing Services.
            </h1>
            <h2 className='second-heading'>
              We have the expertise and resources to create a website that
              reflects your brand
            </h2>
            <p>
              At our website designing company, we offer professional and
              customized website design services that are tailored to meet the
              unique needs of your business.
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
              <Button>Lets Talk</Button>
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
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  /* initial body color hide  */
  .color-particles {
    background-color: var(--grey-5);
    z-index: -15;
    position: absolute;
    height: calc(100% - 94px);
    width: 100%;
  }
  .landingWrapper {
    background-color: transparent;
    .image-box {
      background: transparent;
    }
    .mobile-image {
      background: transparent;
    }
    .text-box {
      h1,
      h2,
      p {
        background-color: var(--grey-5);
        width: fit-content;
      }
      p {
        font-weight: 600;
      }
    }
  }

  .particles {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: -10;
  }
`

export default Landing
