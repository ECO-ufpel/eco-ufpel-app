import { memo } from 'react'
import { Stack } from 'expo-router'

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
