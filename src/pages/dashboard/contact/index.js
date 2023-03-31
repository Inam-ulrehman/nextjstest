import List from '@/components/dashboard/contact/List'
import Pagination from '@/components/dashboard/contact/Pagination'
import Search from '@/components/dashboard/contact/Search'
import Sort from '@/components/dashboard/contact/Sort'
import DashboardLayout from '@/components/dashboard/dashboard-layout'
import Head from 'next/head'

import styled from 'styled-components'

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact Request</title>
        <meta name='description' content='Your dashboard page.' />
      </Head>
      <Wrapper>
        <Sort />
        <Search />
        <List />
        <Pagination />
      </Wrapper>
    </>
  )
}

Contact.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

const Wrapper = styled.div``
export default Contact
