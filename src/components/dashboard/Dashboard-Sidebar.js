import { Icons } from '@/styles/Icons'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const DashboardSidebar = () => {
  const { dashboardSidebar } = useSelector((state) => state.global)
  return (
    <Wrapper dashboardSidebar={dashboardSidebar}>
      <li>
        <Link href={'/dashboard'}>
          {Icons.dashboard} {dashboardSidebar && 'Dashboard'}
        </Link>
      </li>
      <li>
        <Link href={'/dashboard/contact'}>
          {Icons.contact} {dashboardSidebar && 'Contact'}
        </Link>
      </li>
      <li>
        <Link href={'/dashboard/profile'}>
          {Icons.profile} {dashboardSidebar && 'Profile'}
        </Link>
      </li>
      <li>
        <Link href={'/dashboard/blogs'}>
          {Icons.blog} {dashboardSidebar && 'Blogs'}
        </Link>
      </li>
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  position: sticky;
  top: 16%;

  li {
    padding: 0.5rem;

    svg {
      margin: 0 7px;
    }

    :hover {
      background-color: var(--grey-5);
    }
  }
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    li {
      svg {
        display: none;
      }
      a {
        padding: 5px;
        background-color: var(--grey-4);
        margin-right: 5px;
        :hover {
        }
      }
    }
  }
`
export default DashboardSidebar
