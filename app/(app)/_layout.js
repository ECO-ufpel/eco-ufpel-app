import { memo, useEffect } from 'react'
import { Redirect, Slot, Stack, usePathname, useRouter } from 'expo-router'
import { Text, View } from 'tamagui'

import { useSession } from '../../providers/Auth'
import { LoadingScreen } from '../../components'

const Component = memo(() => {
  const { loadingUserInfo } = useSession()

  if (loadingUserInfo) return <LoadingScreen />

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
