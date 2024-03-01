import {
  Button,
  ScrollView,
  Stack,
  Text,
  View,
  XStack,
  styled,
  useTheme,
} from 'tamagui'
import { Stack as ExpoStack, Link } from 'expo-router'
import { useSession } from '../../../providers/Auth'
import * as Home from '../../../Screens/Home'
import { CalendarClock, Map, PlaySquare } from '@tamagui/lucide-icons'
import { CircularProgress } from '../../../components/CircularProgress'
import { useActivity } from '../../../providers/ActivityWS'

export default function Page() {
  const { signOut } = useSession()
  const { currentConsumption, currentActivity } = useActivity()

  const theme = useTheme()

  return (
    <Wrapper backgroundColor={theme.background}>
      <ExpoStack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Home.Header />
      <ScrollView flex={1}>
        <View marginVertical="$8">
          <View justifyContent="center" alignItems="center">
            <CircularProgress max={100} progress={currentConsumption} />
          </View>
        </View>
        <XStack gap="$4" margin="$4" marginTop="0">
          <Link asChild href="/historic" disabled={!currentActivity}>
            <Button
              flex={1}
              aspectRatio={1}
              opacity={!currentActivity ? 0.5 : 1}
            >
              <Stack alignItems="center" justifyContent="center" gap="$2">
                <CalendarClock size={18} color="$green11" />
                <Text color="$green11">Histórico</Text>
              </Stack>
            </Button>
          </Link>
          <Button flex={1} aspectRatio={1}>
            <Stack alignItems="center" justifyContent="center" gap="$2">
              <Map size={18} color="$green11" />
              <Text color="$green11">Mapa</Text>
            </Stack>
          </Button>
          <Link replace asChild href="/playground">
            <Button flex={1} aspectRatio={1}>
              <Stack alignItems="center" justifyContent="center" gap="$2">
                <PlaySquare size={18} color="$green11" />
                <Text color="$green11">Playground</Text>
              </Stack>
            </Button>
          </Link>
        </XStack>
        <Button onPress={signOut}>Sign-out</Button>
      </ScrollView>
    </Wrapper>
  )
}

const Wrapper = styled(View, {
  name: 'Wrapper',
  flex: 1,
  alignContent: 'center',
  justifyContent: 'center',
})
