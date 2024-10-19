// Type Imports
import type { CourtsTypes } from '@/types/home/courtsType'

export const db: CourtsTypes = {
  courts: [
    {
      id: 1,
      title: 'First Court',
      mac: '00:00:00:00:01',
      plan: [{ id: 2, title: 'Premium' }]
    },
    {
      id: 2,
      title: 'Second Court',
      mac: '00:00:00:00:02',
      plan: [{ id: 1, title: 'Basic' }]
    },
    {
      id: 3,
      title: 'Third Court',
      mac: '00:00:00:00:03',
      plan: [{ id: 1, title: 'Basic' }]
    },
    {
      id: 4,
      title: 'Fourth Court',
      mac: '00:00:00:00:04',
      plan: [{ id: 2, title: 'Premium' }]
    }
  ]
}
