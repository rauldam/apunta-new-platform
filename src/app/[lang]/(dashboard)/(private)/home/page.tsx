import { Suspense } from 'react'

import { Grid } from '@mui/material'

import { getServerSession } from 'next-auth/next'

import type { Court } from '@prisma/client'

import { authOptions } from '@/libs/auth'

import { getCourts } from '@/app/server/actions'
import { Loading } from '@/components/Loading'
import Transactions from '@/views/dashboards/analytics/Transactions'
import WeeklyOverview from '@/views/dashboards/analytics/WeeklyOverview'
import TotalSales from '@/views/dashboards/crm/TotalSales'
import CourtCard from '@/views/home'

const Home = async () => {
  //const token = session.user?.token
  const session = await getServerSession(authOptions)
  const rol = session && session?.user.role
  let data: Court[] = []

  if (session) {
    data = await getCourts(session)

    console.log(data)
  }

  return (
    <>
      {rol === 'admin' && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} className='mb-6'>
            <h3>Dashboard</h3>
          </Grid>

          <Grid item xs={12} sm={6} md={3} className='mb-6'>
            <Suspense fallback={<Loading />}>
              <WeeklyOverview title='Matches by day' data={[{ name: 'Sales', data: [37, 57, 45, 75, 57, 40, 65] }]} />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={6} md={6} className='mb-6'>
            <Transactions />
          </Grid>

          <Grid item xs={12} sm={6} md={3} className='mb-6'>
            <TotalSales />
          </Grid>
        </Grid>
      )}
      {rol === 'user' && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} className='mb-6'>
            <h3>Analytics</h3>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className='mb-6'>
            <Suspense fallback={<Loading />}>
              <WeeklyOverview title='Daily rentals' data={[{ name: 'Rentals', data: [3, 6, 4, 7, 5, 4, 6] }]} />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={6} md={6} className='mb-6'>
            <Suspense fallback={<Loading />}>
              <TotalSales />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className='mb-6'>
            <Suspense fallback={<Loading />}>
              <Transactions />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={12} md={21} className='mb-6'>
            <h3>Our Courts</h3>
          </Grid>
          <Suspense fallback={<Loading />}>
            {data?.map((court, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={3} className='self-end'>
                  <CourtCard court={court} />
                </Grid>
              )
            })}
          </Suspense>
        </Grid>
      )}
    </>
  )
}

export default Home
