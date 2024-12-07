// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'

// Type Imports
import type { Prisma } from '@prisma/client'

import { getServerSession } from 'next-auth'

import type { ThemeColor } from '@core/types'

// Component Imports
import EditUserInfo from '@components/dialogs/edit-user-info'
import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import CustomAvatar from '@core/components/mui/Avatar'
import { getUserById } from '@/app/server/actions'
import type { UsersType } from '@/types/apps/userTypes'
import { authOptions } from '@/libs/auth'

const UserDetails = async ({ id }: { id: string }) => {
  type UserWithProfile = Prisma.PromiseReturnType<typeof getUserById>
  let users: UserWithProfile = []
  const usersData: UsersType[] = []

  const session = await getServerSession(authOptions)
  const rol = session && session?.user.role

  users = await getUserById(id)

  if (users.length > 0) {
    for (const user of users) {
      usersData?.push({
        id: id,
        login: user.login,
        vat: user.profile[0].vat,
        role: 'user',
        email: user.email,
        status: 'active',
        avatar: 'images/avatars/avatar_1.png',
        company: user.profile[0].name,
        country: user.profile[0].address,
        contact: user.profile[0].email,
        fullName: user.profile[0].name,
        username: user.login
      })
    }
  }

  const buttonProps = (children: string, color: ThemeColor, variant: ButtonProps['variant']): ButtonProps => ({
    children,
    color,
    variant
  })

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center flex-col gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <CustomAvatar alt='user-profile' src='/images/avatars/1.png' variant='rounded' size={120} />
                <Typography variant='h5'>{`${usersData[0].login} | ${usersData[0].fullName}`}</Typography>
              </div>
            </div>
          </div>
          <div>
            <Typography variant='h5'>Details</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Username:
                </Typography>
                <Typography>{usersData[0].fullName}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Billing Email:
                </Typography>
                <Typography>{usersData[0].email}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Tax ID:
                </Typography>
                <Typography color='text.primary'>{usersData[0].vat}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Contact:
                </Typography>
                <Typography color='text.primary'>{usersData[0].email}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  Country:
                </Typography>
                <Typography color='text.primary'>{usersData[0].country}</Typography>
              </div>
            </div>
          </div>
          {rol === 'admin' && (
            <div className='flex gap-4 justify-center'>
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps('Edit', 'primary', 'contained')}
                dialog={EditUserInfo}
                dialogProps={{ data: usersData[0] }}
              />
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps('Suspend', 'error', 'outlined')}
                dialog={ConfirmationDialog}
                dialogProps={{ type: 'suspend-account' }}
              />
            </div>
          )}
          {rol != 'user' && (
            <div className='flex gap-4 justify-center'>
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps('Edit', 'primary', 'contained')}
                dialog={EditUserInfo}
                dialogProps={{ data: usersData[0] }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default UserDetails
