import { Heading, Text, View, styled } from 'tamagui'
import logoPath from '../../assets/logo_white.png'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSession } from '../../providers/Auth'
import { useActivity } from '../../providers/ActivityWS'

export function Header() {
  const {
    userInfo: { name, image },
  } = useSession()
  const { currentActivity } = useActivity()

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
        <Animated.View entering={FadeIn.delay(500)} style={{ maxWidth: '90%' }}>
          <Heading>{name}</Heading>
          <Text>
            {currentActivity ? `Sala ${currentActivity}` : 'Carregando'}
          </Text>
        </Animated.View>
        <Avatar
          width={50}
          height={50}
          entering={FadeIn.delay(500)}
          source={
            image
              ? { uri: image }
              : {
                  uri: 'https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef.jpg',
                }
          }
          borderRadius={999}
        />
      </View>
    </View>
  )
}

const HeaderBg = styled(Animated.View, {
  position: 'absolute',
})

const Avatar = styled(Animated.Image, {})
