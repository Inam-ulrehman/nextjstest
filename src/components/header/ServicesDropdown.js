import { Icons } from '@/styles/Icons'
import { servicesData } from '@/utils/data'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const ServicesDropdown = () => {
  return (
    <>
      {servicesData.map((item, index) => {
        const path = item.title.split(' ').join('-').toLowerCase()
        return (
          <Wrapper key={index}>
            <Link href={`/services/${path}`} passHref>
              <div className='menu'>
                <i style={{ color: `var(--${item.color}-6)` }}>
                  {Icons[item.icon]}
                </i>
                <div className='span'>
                  <span
                    style={{ color: `var(--${item.color}-7)` }}
                    className='span-title'
                  >
                    {item.title}
                  </span>
                  <span className='description'>{item.description}</span>
                </div>
              </div>
            </Link>
          </Wrapper>
        )
      })}
    </>
  )
}
const Wrapper = styled.li`
  background-color: var(--white);
  width: 400px !important;
  :hover {
  }
  .menu {
    display: flex;
    align-items: center;
    i {
      margin-right: 10px;
    }
    .span {
      display: grid;
      .span-title {
        font-weight: 600;
        text-transform: capitalize;
      }
      .description {
        font-size: var(--extra-small-text);
        max-width: 300px;
      }
    }
  }
`
export default ServicesDropdown
