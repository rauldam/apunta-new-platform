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
    court.plan.type === 'premium'
      ? { text: 'Virtual Display', href: `https://www.apunta.es/vd?mac=${court.mac}`, linkProps: { target: '_blank' } }
      : ''
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
