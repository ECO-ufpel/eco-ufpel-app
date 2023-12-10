import { Text, View, ScrollView, styled, useTheme } from 'tamagui'
import Navbar from '../../components/Navbar'

export default function Profile() {
  const theme = useTheme()

  return (
    <Wrapper backgroundColor={theme.background}>
      <ScrollView flex={1}>
        <Text>Profile</Text>
      </ScrollView>
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled(View, {
    name: 'Wrapper',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100%'
  })
