// MUI Imports
import Image from 'next/image'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

import type { Court } from '@prisma/client'

import { BuffertoString } from '@/utils/uuidToBuffer'

// Components Imports

import OptionsMenu from '@core/components/option-menu'

const CourtCard = ({ court }: { court: Court }) => {
  const menuOptions = [
    'General Settings',
    'Advertisements',
    'Streaming',
    { divider: true },
    'Camera Installation',
    'Qr Code Generator',
    'Virtual Display'
  ]

  return (
    <Card key={BuffertoString(court.id)}>
      <CardHeader title={court.title} action={<OptionsMenu iconClassName='text-textPrimary' options={menuOptions} />} />
      <Divider></Divider>
      <Link href={`/courts/create/${court.mac}`}>
        <CardContent key={BuffertoString(court.id)}>
          <Image alt={'court'} width={200} height={100} src={'/images/pista2.png'} />
          <p>{court.plan.type}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

export default CourtCard
