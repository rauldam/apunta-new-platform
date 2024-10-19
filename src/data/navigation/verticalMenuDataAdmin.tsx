// Type Imports

import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuDataAdmin = (
  dictionary: Awaited<ReturnType<typeof getDictionary>>,
  rol: string
): VerticalMenuDataType[] => {
  if (rol === 'admin') {
    return [
      // This is how you will normally render submenu
      {
        label: dictionary['navigation'].dashboards,
        icon: 'ri-home-smile-line',
        children: [
          // This is how you will normally render menu item
          {
            label: dictionary['navigation'].crm,
            icon: 'ri-pie-chart-2-line',
            href: '/dashboards/crm'
          },
          {
            label: dictionary['navigation'].analytics,
            icon: 'ri-bar-chart-line',
            href: '/dashboards/analytics'
          },
          {
            label: dictionary['navigation'].eCommerce,
            icon: 'ri-shopping-bag-3-line',
            href: '/dashboards/ecommerce'
          },
          {
            label: dictionary['navigation'].academy,
            icon: 'ri-graduation-cap-line',
            href: '/dashboards/academy'
          },
          {
            label: dictionary['navigation'].logistics,
            icon: 'ri-car-line',
            href: '/dashboards/logistics'
          }
        ]
      }
    ]
  }

  if (rol === 'user') {
    return [
      // This is how you will normally render submenu
      {
        label: dictionary['navigation'].dashboards,
        icon: 'ri-home-smile-line'
      }
    ]
  }

  return [] // Return an empty array if user is not admin to avoid rendering menu items unintentionally.
}

export default verticalMenuDataAdmin
