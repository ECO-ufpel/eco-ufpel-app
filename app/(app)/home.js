import { Button, Text, View, ScrollView, styled, useTheme } from 'tamagui'
import { useSession } from '../../providers/Auth'
import Navbar from '../../components/Navbar'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import * as Home from '../../Screens/Home'

export default function Page() {
  const { signOut } = useSession()
  const theme = useTheme()

  return (
    <Wrapper backgroundColor={theme.background}>
      <Home.Header />
      <ScrollView flex={1}>
      <AnimatedCircularProgress
        style={{marginVertical: 20}}
        size={150}
        width={15}
        rotation={0}
        prefill={0}
        fill={20}
        duration={500}
        tintColor="#18794E"
        backgroundColor="#DEE2E6">
          {
            (fill) => (
              <CircularBarText>
                { fill }kW
              </CircularBarText>
            )
          }
        </AnimatedCircularProgress>
        <Button onPress={signOut}>Sign-out</Button>
      </ScrollView>
    <Navbar style={{position: "absolute", bottom: 5}}/>
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

const CircularBarText = styled(Text, {
  name: 'CircularBarText',
  fontSize: 24,
  fontWeight: 'bold',
  color: '#18794E'
})