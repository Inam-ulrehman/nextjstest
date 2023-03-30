import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
const navList = [
  { title: 'Home', path: '/' },
  { title: 'Blog', path: '/blog' },
  { title: 'Portfolios', path: '/portfolios' },
  { title: 'Services', path: '/services' },
  { title: 'Client Portal', path: '/user/login' },
  { title: 'Contact', path: '/contact' },
]
const NavbarLinks = () => {
  return (
    <Wrapper>
      <div className='heading'>QUICK LINKS</div>
      <ul>
        {navList.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.path}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .heading {
    font-weight: 600;
    color: var(--primary-2);
    border-bottom: 2px solid var(--primary-5);
    width: fit-content;
    margin: 0 auto;
  }
  ul {
    font-weight: 400;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 300px;
    margin: 1rem auto;

    text-align: center;
    li {
      padding: 0.3rem;
    }
    a {
      padding: 5px;

      color: var(--white);
      :hover {
        color: var(--primary-2);
        border-bottom: 2px solid var(--primary-2);
      }
    }
    display: grid;
    justify-content: center;
  }
`

export default NavbarLinks
