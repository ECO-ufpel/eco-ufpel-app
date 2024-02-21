import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, styled } from 'tamagui'

import * as Playground from '../../../Screens/Playground'

export default function Page() {
  return (
    <SafeAreaView>
      <Wrapper>
        <Text>Playground</Text>
        <Link href="/sign-in">Sign in</Link>
        <Link href="/home">Home</Link>

        <Playground.WebSocketExample />
        <Playground.ChartsExample />
        <Playground.CircularExample />
        <Playground.MapExample />
      </Wrapper>
    </SafeAreaView>
  )
}

const Wrapper = styled(ScrollView, {
  // 👈 styled is a helper function to create a styled component  ){
  paddingHorizontal: '$4',
})
