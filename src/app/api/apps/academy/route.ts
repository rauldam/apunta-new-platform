/**
 * ! We haven't used this file in our template. We've used the server actions in the
 * ! `src/app/server/actions.ts` file to fetch the static data from the fake-db.
 * ! This file has been created to help you understand how you can create your own API routes.
 * ! Only consider making API routes if you're planing to share your project data with other applications.
 * ! else you can use the server actions or third-party APIs to fetch the data from your database.
 */

// Next Imports
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Data Imports
import { getToken } from 'next-auth/jwt'

import { db } from '@/fake-db/apps/academy'

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret })

  if (token) {
    return NextResponse.json({ token: token, db })
  } else {
    return NextResponse.json({ message: 'Not allowed' })
  }

  /*
  // Check if the user is authenticated
  if (!session.user) {
    return NextResponse.status(401).json({ message: 'Unauthorized' })
  }

  // Check if the request is authorized
  if (!auth || auth.split(' ')[0] !== 'Bearer' || !session.user.role || session.user.role !== 'admin') {
    return NextResponse.status(403).json({ message: 'Forbidden' })
  }

  // If the user is authenticated and authorized, return the data from the fake-db
  // In a real-world application, this would be replaced with a call to your own API or database.

  // Fetch data from the fake-db
  // For demonstration purposes, we're returning the entire fake-db as JSON response
  // In a real-world application, this would be replaced with a call to your own API or database.

 */
}
