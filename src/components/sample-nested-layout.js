import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const SampleNestedLayout = ({ children }) => {
  return (
    <Wrapper>
      <Link href='/sample/one'>one</Link>
      <Link href='/sample/two'>two</Link>
      <Link href='/sample/three'>three</Link>
      <Link href='/sample/four'>four</Link>
      <main>{children}</main>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  a {
    margin-right: 1rem;
  }
`
export default SampleNestedLayout
