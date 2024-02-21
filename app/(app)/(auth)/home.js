import { Button, Text, View, styled, useTheme } from 'tamagui'
import { useSession } from '../../../providers/Auth'
import { Link } from 'expo-router'
import * as Home from '../../../Screens/Home'
import * as Playground from '../../../Screens/Playground'

export default function Page() {
  const { signOut } = useSession()
  const theme = useTheme()

  return (
    <Wrapper backgroundColor={theme.background}>
      <Home.Header />
      <View flex={1}>
        <Playground.CircularExample />
        <Button onPress={signOut}>Sign-out</Button>
        <Text>Auth</Text>
        <Link href="/playground">Playground</Link>
        <Link href="/">aa</Link>
      </View>
    </Wrapper>
  )
}

const Wrapper = styled(View, {
  name: 'Wrapper',
  flex: 1,
  alignContent: 'center',
  justifyContent: 'center',
})
