//MUI Imports
import { Suspense } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Type Imports
import type { ThemeColor } from '@core/types'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { Loading } from '@/components/Loading'

type DataType = {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

// Vars
const data: DataType[] = [
  {
    stats: '359',
    title: 'Rentals',
    color: 'primary',
    icon: 'ri-pie-chart-2-line'
  },
  {
    stats: '683',
    title: 'Emails',
    color: 'success',
    icon: 'ri-mail-check-line'
  },
  {
    stats: '2',
    color: 'warning',
    title: 'Courts',
    icon: 'ri-macbook-line'
  },
  {
    stats: '34k',
    color: 'info',
    title: 'Revenue',
    icon: 'ri-money-dollar-circle-line'
  }
]

const Transactions = () => {
  return (
    <Card>
      <CardHeader title='Transactions' />
      <CardContent className='!pbs-4'>
        <Suspense fallback={<Loading />}>
          <Grid container spacing={2}>
            {data.map((item, index) => (
              <Grid item xs={6} md={6} key={index}>
                <div className='flex items-center gap-3'>
                  <CustomAvatar variant='rounded' color={item.color} className='shadow-xs'>
                    <i className={item.icon}></i>
                  </CustomAvatar>
                </div>
                <div>
                  <Typography>{item.title}</Typography>
                  <Typography variant='h5'>{item.stats}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Suspense>
      </CardContent>
    </Card>
  )
}

export default Transactions
