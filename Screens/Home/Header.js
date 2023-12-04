import { Heading, Text, View, styled } from 'tamagui'
import logoPath from '../../assets/logo_white.png'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Header() {
  const insets = useSafeAreaInsets()

  return (
    <View
      theme="dark"
      height="$14"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <HeaderBg
        borderRadius="$8"
        backgroundColor="$green8"
        sharedTransitionTag="sharedHeader"
        style={{ width: '100%', height: '100%' }}
      />
      <View
        paddingTop={insets.top}
        flexDirection="row"
        maxWidth="85%"
        flex={1}
        justifyContent="space-between"
      >
        <Animated.View entering={FadeIn.delay(500)}>
          <Heading>Daniel Núñez</Heading>
          {/* ToDo: add text overflow */}
          <Text>Atividade atual: Algoritmos e estrutu...</Text>
        </Animated.View>
        <Avatar
          width={50}
          height={50}
          entering={FadeIn.delay(500)}
          source={logoPath}
        />
      </View>
    </View>
  )
}

const HeaderBg = styled(Animated.View, {
  position: 'absolute',
})

const Avatar = styled(Animated.Image, {})
