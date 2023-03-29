import { getStateValues } from '@/features/websitecontent/websitecontentSlice'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Banner from './Banner'
import Navbar from './Navbar'

const Header = () => {
  const headerHeightRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (headerHeightRef.current === 'undefined') {
    }
    const height = headerHeightRef.current.clientHeight.toString()

    dispatch(
      getStateValues({
        name: 'headerHeight',
        value: height,
      })
    )
  }, [])
  return (
    <Wrapper ref={headerHeightRef}>
      <Banner />
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  background-color: var(--white);
  z-index: 1;
`
export default Header
