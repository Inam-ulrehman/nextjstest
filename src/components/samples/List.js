import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import styled from 'styled-components'

const List = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>
  }
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
