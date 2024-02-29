import { Slot } from 'expo-router'
import { ActivityProvider } from '../../../providers/ActivityWS'

export default function Layout() {
  return (
    <ActivityProvider>
      <Slot />
    </ActivityProvider>
  )
}
