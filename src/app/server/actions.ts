/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */

'use server'

// Data Imports
import { PrismaClient } from '@prisma/client'

import type { Session } from 'next-auth'

import { db as eCommerceData } from '@/fake-db/apps/ecommerce'
import { db as academyData } from '@/fake-db/apps/academy'
import { db as vehicleData } from '@/fake-db/apps/logistics'
import { db as invoiceData } from '@/fake-db/apps/invoice'
import { db as userData } from '@/fake-db/apps/userList'
import { db as permissionData } from '@/fake-db/apps/permissions'
import { db as profileData } from '@/fake-db/pages/userProfile'
import { db as faqData } from '@/fake-db/pages/faq'
import { db as pricingData } from '@/fake-db/pages/pricing'
import { db as statisticsData } from '@/fake-db/pages/widgetExamples'

import { StringToBuffer } from '@/utils/uuidToBuffer'

const prisma = new PrismaClient()

export const getEcommerceData = async () => {
  return eCommerceData
}

export const getAcademyData = async () => {
  return academyData
}

export const getLogisticsData = async () => {
  return vehicleData
}

export const getInvoiceData = async () => {
  return invoiceData
}

export const getUserData = async () => {
  return userData
}

export const getPermissionsData = async () => {
  return permissionData
}

export const getProfileData = async () => {
  return profileData
}

export const getFaqData = async () => {
  return faqData
}

export const getPricingData = async () => {
  return pricingData
}

export const getStatisticsData = async () => {
  return statisticsData
}

export const getCourts = async (session: Session) => {
  // Simulate a delay for fetching court number
  console.log('BINARY UUID: ' + StringToBuffer(session?.user.id) + ' String uuid: ' + session?.user.id)

  const courts = await prisma.court.findMany({
    orderBy: [
      {
        is_available: 'desc'
      },
      {
        created_at: 'asc'
      }
    ],
    where: {
      users_id: StringToBuffer(session?.user.id)
    },
    include: { plan: true }
  })

  return courts
}

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      roles: { rol: 'user' }
    },
    select: {
      id: true,
      email: true,
      active: true,
      login: true,
      profile: {
        select: {
          name: true,
          email: true,
          vat: true,
          address: true,
          created_at: true
        }
      }
    }
  })

  return users
}

export const getUsersByDistributor = async (id: string) => {
  const users = await prisma.user.findMany({
    where: {
      courts: {
        some: { distributor_id: StringToBuffer(id) }
      },
      roles: { rol: 'user' }
    },
    select: {
      id: true,
      email: true,
      active: true,
      login: true,
      profile: {
        select: {
          name: true,
          email: true,
          vat: true,
          address: true,
          created_at: true
        }
      }
    }
  })

  return users
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findMany({
    where: {
      id: StringToBuffer(id)
    },
    select: {
      email: true,
      login: true,
      profile: {
        select: {
          name: true,
          email: true,
          vat: true,
          address: true,
          created_at: true
        }
      }
    }
  })

  return user
}

export const resetCourt = async (id: string) => {
  const court = await prisma.court.update({
    where: {
      id: StringToBuffer(id)
    },
    data: {
      is_available: 1
    }
  })

  if (court === null) return false
  if (court.is_available === 1) return true
}
