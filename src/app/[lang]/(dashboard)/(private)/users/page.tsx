import type { Prisma } from '@prisma/client'

import { getServerSession } from 'next-auth'

import UserList from '@/views/apps/user/list'
import { getUsers,getUsersByDistributor } from '@/app/server/actions'
import type { UsersType } from '@/types/apps/userTypes'
import { BufferToString } from '@/utils/uuidToBuffer'
import { authOptions } from '@/libs/auth'



const User = async () => {
  const session = await getServerSession(authOptions)

type UserWithProfile = Prisma.PromiseReturnType<typeof getUsers>
let users: UserWithProfile = []
const usersData: UsersType[] = []

if (session?.user.role === 'admin') {
  users = await getUsers()

  if (users.length > 0) {
    for (const user of users) {
      usersData?.push({
        id: BufferToString(user.id),
        role: 'user',
        email: user.email,
        status: user.active === 1 ? 'active' : 'inactive',
        avatar: 'images/avatars/avatar_1.png',
        company: user.profile[0].name,
        country: user.profile[0].address,
        contact: user.profile[0].email,
        fullName: user.profile[0].name,
        username: user.login
      })
    }
  }
}

if (session?.user.role === 'distributor') {
  users = await getUsersByDistributor(session?.user.id)

  if (users.length > 0) {
    for (const user of users) {
      usersData?.push({
        id: BufferToString(user.id),
        role: 'user',
        email: user.email,
        status: user.active === 1 ? 'active' : 'inactive',
        avatar: 'images/avatars/avatar_1.png',
        company: user.profile[0].name,
        country: user.profile[0].address,
        contact: user.profile[0].email,
        fullName: user.profile[0].name,
        username: user.login
      })
    }
  }
}

  
return <UserList userData={usersData} />
}

export default User
