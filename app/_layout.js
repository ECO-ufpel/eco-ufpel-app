import { useFonts } from 'expo-font'
import { View } from 'tamagui'
import { Slot, Stack } from 'expo-router'

import { Text } from 'react-native'
import { SessionProvider } from '../providers/Auth'
import { TamaguiProvider } from '../providers/Tamagui'
import { SchemaProvider } from '../providers/ColorSchema'

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
      <SchemaProvider>
        <TamaguiProvider>
          <Slot />
        </TamaguiProvider>
      </SchemaProvider>
    </SessionProvider>
  )
}
