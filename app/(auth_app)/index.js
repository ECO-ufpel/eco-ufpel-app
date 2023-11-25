import { Button, Text, View, styled, useTheme } from 'tamagui'
import { useSession } from '../../providers/Auth'

export default function AuthenticatedApp() {
  const { signOut } = useSession()
  const theme = useTheme()

  return (
    <Wrapper backgroundColor={theme.background}>
      <Button onPress={signOut}>Sign-out</Button>
      <Text>Auth</Text>
    </Wrapper>
  )
}

const Wrapper = styled(View, {
  name: 'Wrapper',
  flex: 1,
  alignContent: 'center',
  justifyContent: 'center',
})
