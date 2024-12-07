import type { Prisma } from '@prisma/client'

import { getServerSession } from 'next-auth'

import { Grid } from '@mui/material'

import { getCourts } from '@/app/server/actions'
import { authOptions } from '@/libs/auth'
import type { CourtsTypeList } from '@/types/home/courtsType'
import { BufferToString } from '@/utils/uuidToBuffer'
import CourtsListTable from '@/components/courts/CourtsListTable'

const CourtsView = async () => {
  type CourtWithPlan = Prisma.PromiseReturnType<typeof getCourts>
  let data: CourtWithPlan = []
  const session = await getServerSession(authOptions)

  const courtsData: CourtsTypeList[] = []

  if (session) {
    data = await getCourts(session)
    data.map(court => {
      courtsData.push({
        id: BufferToString(court.id),
        title: court.title,
        mac: court.mac,
        is_available: court.is_available,
        plan_name: court.plan.type
      })
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CourtsListTable courtData={courtsData} />
      </Grid>
    </Grid>
  )
}

export default CourtsView
