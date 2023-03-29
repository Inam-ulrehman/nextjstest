import Head from 'next/head'
import React from 'react'
import DashboardLayout from '@/components/dashboard/dashboard-layout'
import { vercelDeploy } from '@/utils/axios'

const Dashboard = () => {
  //
  return (
    <>
      <Head>
        <title>Welcome to your dashboard</title>
        <meta name='description' content='Your dashboard page.' />
      </Head>
      <div>
        <button onClick={() => vercelDeploy()} className='btn' type='button'>
          Vercel build
        </button>
      </div>
    </>
  )
}

Dashboard.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard
