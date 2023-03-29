import React from 'react'
import { FaRegCopyright } from 'react-icons/fa'
import styled from 'styled-components'
const CopyRight = () => {
  return (
    <Wrapper>
      <span>
        <FaRegCopyright />
        Copyright {new Date().getFullYear()} INAM Web Solutions. All Rights
        Reserved. Web Design and Content Management by INAM Web Solutions.
      </span>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: var(--primary-8);
  overflow: hidden;
  text-align: center;
  padding: 1rem;
  bottom: 0;
  height: fit-content;
  color: var(--white);
  border-top: 2px solid var(--white);
  span {
    svg {
      margin-right: 5px;
      margin-bottom: -2px;
    }
  }
`
export default CopyRight
