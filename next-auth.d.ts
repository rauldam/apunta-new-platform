import type { DefaultSession, DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      name: string
      image: string
      email: string
      token?: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    id: string
    role: string
    name: string
    image: string
    email: string
  }
}

interface JWT extends DefaultJWT {
  id: string
  role: string
  token?: string
}
