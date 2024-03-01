import { Stack } from 'expo-router'
import { ActivityProvider } from '../../../providers/ActivityWS'

export default function Layout() {
  return (
    <ActivityProvider>
      <Stack
        screenOptions={{
          animation: 'fade',
        }}
      />
    </ActivityProvider>
  )
}
