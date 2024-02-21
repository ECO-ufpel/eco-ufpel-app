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
import { useSession } from '../../../providers/Auth'
import { Link } from 'expo-router'
import * as Home from '../../../Screens/Home'
import * as Playground from '../../../Screens/Playground'
import { CalendarClock, Map, PlaySquare } from '@tamagui/lucide-icons'

export default function Page() {
  const { signOut } = useSession()
  const theme = useTheme()

  return (
    <Wrapper backgroundColor={theme.background}>
      <Home.Header />
      <ScrollView flex={1}>
        <Playground.CircularExample />

        <XStack gap="$4" margin="$4">
          <Button flex={1} aspectRatio={1}>
            <Stack alignItems="center" justifyContent="center" gap="$2">
              <CalendarClock size={18} color="$green11" />
              <Text color="$green11">Histórico</Text>
            </Stack>
          </Button>
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
