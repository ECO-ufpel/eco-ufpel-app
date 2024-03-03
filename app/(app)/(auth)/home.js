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
import {
  CalendarClock,
  Map,
  PlaySquare,
  ToggleRight,
} from '@tamagui/lucide-icons'
import { CircularProgress } from '../../../components/CircularProgress'
import { useActivity } from '../../../providers/ActivityWS'
import { useSchema } from '../../../providers/ColorSchema'

export default function Page() {
  const { signOut } = useSession()
  const { toggleSchema } = useSchema()
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
        {/* <ScrollView horizontal>
          
        </ScrollView> */}
        <XStack gap="$6" margin="$6" marginTop="0">
          <Link asChild href="/historic" disabled={!currentActivity}>
            <StyledButton
              flex={1}
              aspectRatio={1}
              opacity={!currentActivity ? 0.5 : 1}
            >
              <Stack alignItems="center" justifyContent="center" gap="$2">
                <CalendarClock size={32} color="$green11" />
                <Text color="$green11" fontSize={16}>
                  Histórico
                </Text>
              </Stack>
            </StyledButton>
          </Link>
          <Link asChild href="/map">
            <StyledButton flex={1} aspectRatio={1}>
              <Stack alignItems="center" justifyContent="center" gap="$2">
                <Map size={32} color="$green11" />
                <Text color="$green11" fontSize={16}>
                  Mapa
                </Text>
              </Stack>
            </StyledButton>
          </Link>
        </XStack>
        <XStack gap="$6" margin="$6" marginTop="0">
          <StyledButton flex={1} aspectRatio={1} onPress={toggleSchema}>
            <Stack alignItems="center" justifyContent="center" gap="$2">
              <ToggleRight size={32} color="$green11" />
              <Text textAlign="center" fontSize={16} color="$green11">
                Trocar Tema
              </Text>
            </Stack>
          </StyledButton>
          <StyledButton flex={1} aspectRatio={1} onPress={signOut}>
            <Stack alignItems="center" justifyContent="center" gap="$2">
              <PlaySquare size={32} color="$green11" />
              <Text color="$green11" fontSize={16}>
                Sair
              </Text>
            </Stack>
          </StyledButton>

          {/* <Link replace asChild href="/playground">
              <StyledButton flex={1} aspectRatio={1}>
                <Stack alignItems="center" justifyContent="center" gap="$2">
                  <PlaySquare size={32} color="$green11" />
                  <Text color="$green11" fontSize={16}>Playground</Text>
                </Stack>
              </StyledButton>
            </Link> */}
        </XStack>
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

const StyledButton = styled(Button, {
  name: 'StyledButton',
  flex: 1,
  aspectRatio: 1,
  minWidth: 110,
})
