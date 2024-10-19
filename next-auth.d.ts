import type { DefaultSession, DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number | string
      role: string
      token?: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    id: number | string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number | string
    role: string
    token?: string
  }
}
