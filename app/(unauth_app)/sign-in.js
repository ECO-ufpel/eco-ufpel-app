import { router } from 'expo-router'

import { useSession } from '../../providers/Auth'
import { Button, View, styled, useTheme } from 'tamagui'
import { ToggleSchema } from '../../components'

export default function SignIn() {
  const { signIn } = useSession()
  const theme = useTheme()

  return (
    <Wrapper backgroundColor={theme.background}>
      <Button
        onPress={async () => {
          await signIn()
          router.replace('/')
        }}
      >
        Sign In
      </Button>
      <ToggleSchema />
    </Wrapper>
  )
}

const Wrapper = styled(View, {
  name: 'Wrapper',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})
