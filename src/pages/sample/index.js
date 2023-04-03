import { useSampleData } from '@/features/samples/swr'
import Link from 'next/link'

import React from 'react'
import styled from 'styled-components'

const Sample = () => {
  const { data, error, isLoading } = useSampleData()

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // render data
  return (
    <div>
      {data.data.sample.map((item, index) => {
        return (
          <Wrapper className='' key={index}>
            <Link href={`/sample/${item._id}`}>hello {item._id}</Link>
          </Wrapper>
        )
      })}
    </div>
  )
}

const Wrapper = styled.div`
  min-height: 50px;
  text-align: center;
  border: 2px solid black;
  margin: 2rem;
`

export default Sample
