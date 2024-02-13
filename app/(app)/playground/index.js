import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from 'tamagui'

import * as Playground from '../../../Screens/Playground'

export default function Page() {
  return (
    <SafeAreaView>
      <View>
        <Text>Playground</Text>
        <Link href="/sign-in">Sign in</Link>

        <Playground.WebSocketExample />
      </View>
    </SafeAreaView>
  )
}
