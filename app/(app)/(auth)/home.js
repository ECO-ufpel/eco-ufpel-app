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
import { CalendarClock, Map, PlaySquare } from '@tamagui/lucide-icons'
import Carousel from 'react-native-reanimated-carousel'
import { Dimensions } from 'react-native'
import { CircularProgress } from '../../../components/CircularProgress'

export default function Page() {
  const { signOut } = useSession()
  const theme = useTheme()
  const width = Dimensions.get('window').width

  return (
    <Wrapper backgroundColor={theme.background}>
      <Home.Header />
      <ScrollView flex={1}>
        <View marginVertical="$8">
          <Carousel
            loop={false}
            data={[...new Array(6).keys()]}
            width={width}
            height={300}
            renderItem={() => (
              <View justifyContent="center" alignItems="center">
                <CircularProgress />
              </View>
            )}
          />
        </View>
        <XStack gap="$4" margin="$4" marginTop="0">
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
