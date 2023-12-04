import { View, YStack, styled, useTheme } from 'tamagui'
import { ToggleSchema } from '../../components'
import * as Login from '../../Screens/Login'

export default function SignIn() {
  const theme = useTheme()

  return (
    <Wrapper backgroundColor={theme.background}>
      <Content space>
        <Login.Header mt="$12" />
        <Login.Form />
        <ToggleSchema />
        <Login.Footer />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled(View, {
  name: 'Wrapper',
  flex: 1,
  alignItems: 'center',
})

const Content = styled(YStack, {
  name: 'Content',
  alignItems: 'center',
  flex: 1,
  width: '95%',
  maxWidth: 400,
  padding: '$4',
})
