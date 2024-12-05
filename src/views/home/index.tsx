// MUI Imports
import Image from 'next/image'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Divider } from '@mui/material'

import type { Court, Plan } from '@prisma/client'

import { BufferToString } from '@/utils/uuidToBuffer'
import OptionsMenu from '@core/components/option-menu'
import type { OptionType } from '@/@core/components/option-menu/types'

// Components Imports

interface CourtPlan extends Court {
  plan: Plan
}
let menuOptions: OptionType[] = []

const CourtCard = ({ court }: { court: CourtPlan }) => {
  if (court.is_available) {
    const menuData = [
      { text: 'General Settings', href: 'court/' + BufferToString(court.id) },
      court.plan.type === 'basic'
        ? { text: 'Advertisement', href: 'court/ads/' + court.id }
        : { text: 'Digital Signage', href: 'court/signage/' + court.id },
      court.plan.type === 'basic'
        ? { text: 'Streaming', href: 'court/streaming/' + court.id }
        : { text: 'Streaming & Record', href: 'court/streaming/' + court.id },
      { divider: true },
      { text: 'Camera installation' },
      { text: 'Qr Generator Code', href: 'courts/qr/' + court.id },
      court.plan.type === 'premium'
        ? { text: 'Virtual Display', href: `https://www.apunta.es/vd?mac=${court.mac}` }
        : ''
    ]

    menuOptions = menuData
  } else {
    const menuData = [
      { text: 'Reset actual match', reset: BufferToString(court.id) },
      court.plan.type === 'premium' ? { text: 'Virtual Display', href: 'courts/qr' } : ''
    ]

    menuOptions = menuData
  }




return (
    <Card key={BufferToString(court.id)}>
      {court.is_available === 1 ? (
        <>
          <CardHeader
            title={court.title}
            action={<OptionsMenu iconClassName='text-textPrimary' options={menuOptions} />}
          />
          <Divider></Divider>
          <Link href={`/court/${BufferToString(court.id)}`}>
            <CardContent key={BufferToString(court.id)}>
              <Image alt={'court'} width={200} height={100} src={'/images/pista2.png'} />
              <p>{court.plan.type}</p>
            </CardContent>
          </Link>
        </>
      ) : (
        <>
          <CardHeader
            title={court.title}
            action={<OptionsMenu iconClassName='text-textPrimary' options={menuOptions} />}
          />
          <Divider></Divider>
          <CardContent key={BufferToString(court.id)}>
            <p>This court isn`t available right now</p>
            <p>{court.plan.type}</p>
          </CardContent>
        </>
      )}
    </Card>
  )
}

export default CourtCard
