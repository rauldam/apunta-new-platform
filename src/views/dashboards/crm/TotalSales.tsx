'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const TotalSales = () => {
  //  Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: true },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.6,
        opacityFrom: 1,
        shadeIntensity: 0,
        type: 'horizontal',
        stops: [0, 100, 100]
      }
    },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round'
    },
    legend: { show: false },
    colors: [theme.palette.success.main],
    grid: {
      xaxis: { lines: { show: false } },
      strokeDashArray: 7,
      padding: { left: 0, top: -20, bottom: 13 },
      borderColor: 'var(--mui-palette-divider)'
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          fontSize: '0.9375rem',
          colors: 'var(--mui-palette-text-disabled)'
        }
      }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetY: 2,
        offsetX: -17,
        style: { colors: 'var(--mui-palette-text-disabled)', fontSize: theme.typography.body2.fontSize as string },
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(2)}k` : value}€`
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Monthly Revenue' />
      <CardContent>
        <AppReactApexCharts
          type='line'
          height={204}
          width='100%'
          options={options}
          series={[{ name: 'Monthly Revenue', data: [0, 2580, 300, 2400, 1500, 4000, 0, 905, 3259, 2465, 1599, 7000] }]}
        />
      </CardContent>
    </Card>
  )
}

export default TotalSales
