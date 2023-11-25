import { useFonts } from 'expo-font'
import { TamaguiProvider } from 'tamagui'
import tmConfig from '../tamagui.config'
import { Slot, Stack } from 'expo-router'

import { Text, View } from 'react-native'
import { SessionProvider } from '../providers/Auth'

export default function AppLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    )
  }

  return (
    <SessionProvider>
      <TamaguiProvider config={tmConfig}>
        <Slot />
      </TamaguiProvider>
    </SessionProvider>
  )
}
