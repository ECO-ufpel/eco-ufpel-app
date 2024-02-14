import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, styled } from 'tamagui'

import * as Playground from '../../../Screens/Playground'

export default function Page() {
  return (
    <SafeAreaView>
      <Wrapper>
        <Text>Playground</Text>
        <Link href="/sign-in">Sign in</Link>

        <Playground.WebSocketExample />
        <Playground.ChartsExample />
      </Wrapper>
    </SafeAreaView>
  )
}

const Wrapper = styled(View, {
  // 👈 styled is a helper function to create a styled component  ){
  paddingHorizontal: '$4',
})
