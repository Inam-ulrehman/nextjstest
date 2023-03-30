import { Button } from '@/styles/Wrappers/Buttons'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Landing = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)

  return (
    <>
      <Wrapper
        className='landingWrapper'
        style={{
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
      ></Wrapper>
    </>
  )
}

const Wrapper = styled.div``

export default Landing
