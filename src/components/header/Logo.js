import { toggleDashboardSidebar } from '@/features/global/globalSlice'
import { Icons } from '@/styles/Icons'
import { CldImage } from 'next-cloudinary'

import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { imagesData } from '../../utils/data'

export const Logo = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const dashboardRoute = router.pathname.startsWith('/dashboard')

  return (
    <Wrapper>
      <CldImage width={40} height={40} src={imagesData.logo} alt='logo' />
      <div className='logo-text'>
        <span>INAM</span>
        <span>WEB SOLUTIONS</span>
      </div>
      {dashboardRoute && (
        <ButtonWrapper
          className='btn'
          type='button'
          onClick={() => dispatch(toggleDashboardSidebar())}
        >
          {Icons.menu}
        </ButtonWrapper>
      )}
    </Wrapper>
  )
}
export const FooterLogo = () => {
  return (
    <Wrapper white>
      <CldImage
        width={40}
        height={40}
        src={imagesData.whiteFooterLogo}
        alt='logo'
      />
      <div className='logo-text'>
        <span>INAM</span>
        <span>WEB SOLUTIONS</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-left: 1rem;
  margin-top: 10px;
  display: flex;
  .logo-text {
    display: grid;
    text-align: center;
    color: ${(props) => (props.white ? `var(--white)` : 'var(--primary-8)')};

    height: 50px;
    overflow: hidden;

    > * {
      &:first-child {
        font-weight: 700;
        font-size: large;
        margin-top: -5px;
      }
      &:nth-child(2) {
        font-weight: 700;
        font-size: var(--text-medium);
        margin-top: -0.7rem;
      }
    }
  }
`
const ButtonWrapper = styled.div`
  margin-left: 1rem;
  margin-top: 5px;
  height: 37px;
  padding: 4px;
  @media (max-width: 768px) {
    display: none;
  }
`
