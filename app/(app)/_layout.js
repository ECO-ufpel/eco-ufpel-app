import { memo, useEffect } from 'react'
import { Redirect, Slot, Stack, usePathname, useRouter } from 'expo-router'
import { Text, View } from 'tamagui'

import { useSession } from '../../providers/Auth'

const Component = memo(() => {
  const { session, isLoading } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      if (!session && pathname !== '/sign-in') {
        router.push('/sign-in')
      }
    }, 200)
  }, [session, pathname])

  // You can keep the splash screen open, or render a loading screen like we do here.

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.

  // This layout can be deferred because it's not the root layout.

  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerShown: false,
      }}
    />
  )
})

export default Component
