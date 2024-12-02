// MUI Imports
import Image from 'next/image'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

import type { Court, Plan } from '@prisma/client'

import { BufferToString } from '@/utils/uuidToBuffer'

// Components Imports

interface CourtPlan extends Court {
  plan: Plan
}

import OptionsMenu from '@core/components/option-menu'

const CourtCard = ({ court }: { court: CourtPlan }) => {
  const menuOptions = [
    { text: 'General Settings', href: 'courts/settings' },
    court.plan.type === 'basic'
      ? { text: 'Advertisement', href: 'courts/ads' }
      : { text: 'Digital Signage', href: 'courts/signage' },
    court.plan.type === 'basic'
      ? { text: 'Streaming', href: 'courts/streaming' }
      : { text: 'Streaming & Record', href: 'courts/streaming' },
    { divider: true },
    { text: 'Camera installation' },
    { text: 'Qr Generator Code', href: 'courts/qr' },
    court.plan.type === 'premium' ? { text: 'Virtual Display', href: `https://www.apunta.es/vd?mac=${court.mac}` } : ''
  ]

  return (
    <Card key={BufferToString(court.id)}>
      <CardHeader title={court.title} action={<OptionsMenu iconClassName='text-textPrimary' options={menuOptions} />} />
      <Divider></Divider>
      <Link href={`/courts/create/${court.mac}`}>
        <CardContent key={BufferToString(court.id)}>
          <Image alt={'court'} width={200} height={100} src={'/images/pista2.png'} />
          <p>{court.plan.type}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

export default CourtCard
