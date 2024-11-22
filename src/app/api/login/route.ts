import { NextResponse } from 'next/server'

// Next Imports

import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcryptjs'

import { BufferToString } from '@/utils/uuidToBuffer'

const prisma = new PrismaClient()

// Mock data for demo purpose
//import { users } from './users'
/* eslint no-use-before-define: 2 */
export async function POST(req: Request) {
  // Vars
  const { email, password } = await req.json()

  //const user = users.find(u => u.email === email && u.password === password)
  //let response: null | ResponseUser = null

  const user = await prisma.user.findMany({
    where: {
      email: email
    },
    include: {
      roles: {
        select: {
          rol: true
        }
      },
      profile: {
        select: {
          name: true,
          email: true
        }
      }
    }
  })

  //console.log(user)

  if (user && user[0].pwd) {
    console.log(user)

    // Hash the password before comparing it to the stored hash
    const hashedPassword = await bcrypt.hash(password, 10)

    // If the password matches, return the user data

    const match = await bcrypt.compare(password, hashedPassword)

    if (match) {
      const response = {
        id: BufferToString(user[0].id),
        role: user[0].roles.rol,
        name: user[0].profile[0].name,
        email: user[0].profile[0].email,
        image: '/images/avatars/1.png'
      }

      console.log(user[0].profile)

      return NextResponse.json(response)
    } else {
      return NextResponse.json(
        {
          // We create object here to separate each error message for each field in case of multiple errors
          message: ['Password is invalid']
        },
        {
          status: 401,
          statusText: 'Unauthorized Access'
        }
      )
    }
  } else {
    // We return 401 status code and error message if user is not found
    return NextResponse.json(
      {
        // We create object here to separate each error message for each field in case of multiple errors
        message: ['Email or Password is invalid']
      },
      {
        status: 401,
        statusText: 'Unauthorized Access'
      }
    )
  }
}
