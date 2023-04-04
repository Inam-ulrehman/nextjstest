import { useSampleData } from '@/features/samples/swr'
import { customFetch } from '@/utils/axios'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import styled from 'styled-components'

const List = ({ page, limit }) => {
  const { data, error, isLoading } = useSampleData({ page, limit })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <Wrapper>
      {data.data.result.map((item, index) => {
        return (
          <div className='container' key={index}>
            <p>
              <strong>{index}. </strong>
              <span>{item.name}</span>
            </p>
            <p>{item._id}</p>
          </div>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  .container {
  }
`
export default List
