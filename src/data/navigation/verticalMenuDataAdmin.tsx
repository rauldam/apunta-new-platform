// Type Imports

import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuDataAdmin =  (
  dictionary: Awaited<ReturnType<typeof getDictionary>>,
  rol: string
): VerticalMenuDataType[] => {
  if (rol === 'admin') {
   return [
      // This is how you will normally render submenu
      {
        label: dictionary['navigation'].dashboards,
        icon: 'ri-home-smile-line',
        href: '/home'
      },
      {
        label: 'Users',
        icon: 'ri-team-line',
        href: '/users'
      }
    ]
  }

  if (rol === 'distributor') {
    return [
      // This is how you will normally render submenu
      {
        label: 'Home',
        icon: 'ri-home-smile-line',
        href: '/home'
      },
      {
        label: 'Users',
        icon: 'ri-team-line',
        href: '/users'
      }
    ]
  }

  if (rol === 'user') {
    return [
      // This is how you will normally render submenu
      {
        label: 'Home',
        icon: 'ri-home-smile-line',
        href: '/home'
      },
      {
        label: 'Courts',
        icon: 'ri-basketball-line',
        href: '/courts'
      },
      {
        label: 'Streaming',
        icon: 'ri-video-chat-line',
        href: '/streaming'
      },
      {
        label: 'Invoices',
        icon: 'ri-receipt-line',
        href: '/invoices'
      },
      {
        label: 'Support',
        icon: 'ri-customer-service-2-line',
        href: '/support'
      }
    ]
  }

  return [] // Return an empty array if user is not admin to avoid rendering menu items unintentionally.
}

export default verticalMenuDataAdmin
