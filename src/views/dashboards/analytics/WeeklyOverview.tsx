'use client'

// Next Imports

import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading'


// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'),{ ssr: false })

const WeeklyOverview = (props: any) => {
  // Props
  const { title, data } = props

  // Hooks
  const theme = useTheme()

  // Vars
  const divider = 'var(--mui-palette-divider)'
  const disabled = 'var(--mui-palette-text-disabled)'

  const today = new Date()
  const dd = today.getDay()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        distributed: true,
        columnWidth: '40%'
      }
    },
    stroke: {
      width: 2,
      colors: ['var(--mui-palette-background-paper)']
    },
    legend: { show: false },
    grid: {
      xaxis: { lines: { show: false } },
      strokeDashArray: 7,
      padding: { left: -9, top: -20, bottom: 13 },
      borderColor: divider
    },
    dataLabels: { enabled: false },
    colors: [
      dd === 1 ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-customColors-trackBg)',
      dd === 2 ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-customColors-trackBg)',
      dd === 3 ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-customColors-trackBg)',
      dd === 4 ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-customColors-trackBg)',
      dd === 5 ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-customColors-trackBg)',
      dd === 6 ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-customColors-trackBg)',
      dd === 0 ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-customColors-trackBg)'
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetY: 2,
        offsetX: -17,
        style: { colors: disabled, fontSize: theme.typography.body2.fontSize as string },
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
      }
    }
  }

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
      <Suspense fallback={<Loading />}>
          <AppReactApexCharts type='bar' height={204} width='100%' series={data} options={options} />
        </Suspense>
          {/*<div className='flex items-center mbe-4 gap-4'>
          <Typography variant='h4'>45%</Typography>
          <Typography>Your sales performance is 45% 😎 better compared to last month</Typography>
        </div>
        <Button fullWidth variant='contained'>
          Details
        </Button>*/}
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
