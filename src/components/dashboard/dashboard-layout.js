import React from 'react'
import styled from 'styled-components'
import DashboardSidebar from './Dashboard-Sidebar'
import { useSelector } from 'react-redux'
const DashboardLayout = ({ children }) => {
  const { dashboardSidebar } = useSelector((state) => state.global)

  return (
    <Wrapper showDashboardSidebar={dashboardSidebar}>
      <aside>
        <DashboardSidebar />
      </aside>
      <section>{children}</section>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  aside {
    margin-top: -1.1rem;
    position: relative;
    min-width: ${(props) => (props.showDashboardSidebar ? '200px' : '50px')};
    background-color: var(--grey-05);
  }
  section {
    padding: 10px;
    margin-top: 1rem;
    margin-right: 1rem;
    width: 100%;
    background-color: var(--white);
  }
  @media (max-width: 768px) {
    display: grid;
    min-height: auto;
    aside {
      margin-top: 0;
      height: fit-content;
    }
    section {
      margin-top: 0rem;
    }
  }
`
export default DashboardLayout
