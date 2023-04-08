import { Button, Text } from '@nextui-org/react'
import React from 'react'
import styled from 'styled-components'

const Test = () => {
  return (
    <Wrapper>
      <Button className='button-g'>Hello</Button>
      <Text
        css={{
          color: '$blue800',
          fontSize: '$sm',
          padding: '$2 $4',
          backgroundColor: '$accents0',
        }}
      >
        Using tokens
      </Text>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-height: 100vh;
  padding: 3rem;
`
export default Test
