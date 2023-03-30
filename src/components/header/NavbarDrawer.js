import { Icons } from '@/styles/Icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import styled from 'styled-components'

const servicesData = [
  { title: 'mango' },
  { title: 'apple' },
  { title: 'banana' },
]
const NavbarDrawer = ({ state, setState, handleNavbarDrawer }) => {
  const router = useRouter()
  const servicesHeightRef = useRef()

  const handleServices = (e) => {
    setState({ ...state, showServices: !state.showServices })
  }
  return (
    <Wrapper>
      <ul className='drawer-list'>
        <li
          onClick={handleNavbarDrawer}
          className={router.pathname === '/' ? 'active' : ''}
        >
          <Link href={'/'}>Home</Link>
        </li>
        <li
          onClick={handleNavbarDrawer}
          className={router.pathname.startsWith('/blog') ? 'active' : ''}
        >
          <Link href={'/blog'}>Blog</Link>
        </li>
        {/* Drawer Drop Down */}
        {/* services */}
        <li>
          <button type='button' onClick={handleServices}>
            Services <i>{Icons.dropDown}</i>
          </button>
          <div
            className='drawer-dropdown'
            style={{
              height: `${
                state.showServices
                  ? `${servicesHeightRef?.current?.clientHeight}px`
                  : '0px'
              }`,
              overflow: 'hidden',
            }}
          >
            <ul ref={servicesHeightRef}>
              {servicesData.map((item, index) => {
                const path = item.title.split(' ').join('-').toLowerCase()
                return (
                  <li onClick={handleNavbarDrawer} key={index}>
                    <Link href={`/services/${path}`}>{item.title}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </li>

        <li
          onClick={handleNavbarDrawer}
          className={router.pathname === '/contact' ? 'active' : ''}
        >
          <Link href={'/contact'}>Contact</Link>
        </li>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-weight: 600;

  height: 100vh;
  overflow: scroll;
  .drawer-list {
    padding: 2rem;
    li {
      width: fit-content;
      padding: 8px;
    }
  }

  button {
    background-color: transparent;
    border: transparent;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    i {
      width: fit-content;
      svg {
      }
    }
  }
  /* drawer  */
  .drawer-dropdown {
    transition: var(--transition-1);
    li {
      text-transform: capitalize;
      border-bottom: 2px solid var(--grey-05);
    }
  }
`
export default NavbarDrawer
