import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FooterLogo } from '../header/Logo'
import Address from './Address'
import CopyRight from './CopyRight'
import NavbarLinks from './NavbarLinks'
import SocialMedia from './SocialMedia'

const Footer = () => {
  const { headerHeight } = useSelector((state) => state.websitecontent)
  return (
    <Wrapper style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
      <div className='logo'>
        <FooterLogo />
      </div>
      <div className='footer-body'>
        <NavbarLinks />
        <SocialMedia />
        <Address />
      </div>
      <CopyRight />
    </Wrapper>
  )
}
const Wrapper = styled.footer`
  display: grid;
  align-content: space-between;
  .logo {
    display: grid;
    justify-content: center;
  }
  background-color: var(--primary-7);
  @media (min-width: 768px) {
    .footer-body {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      max-width: var(--max-width);
      margin: 0 auto;
    }
  }
`
export default Footer
