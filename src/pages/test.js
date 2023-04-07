import { Button } from '@nextui-org/react'
import React from 'react'
import styled from 'styled-components'

const Test = () => {
  return (
    <Wrapper>
      <Button>Hello</Button>{' '}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-height: 100vh;
  padding: 3rem;
`
export default Test
