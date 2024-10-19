import { CircularProgress } from '@mui/material'

export function Loading() {
  return (
    <div className='flex items-center justify-center h-full w-full'>
      <CircularProgress />
    </div>
  )
}
