import React from 'react'
import { View, Text, Heading, Image, styled, useTheme } from 'tamagui'
import logoPath from '../../assets/logo_white.png'
import Animated, { FadeIn, LightSpeedInLeft } from 'react-native-reanimated'

export function Header(props) {
  return (
    <Wrapper {...props} theme="dark" height="$12" size="$9">
      <Background
        position="absolute"
        borderRadius="$8"
        backgroundColor="$green8"
        sharedTransitionTag="sharedHeader"
        style={{ width: '100%', height: '100%' }}
      />

      <Logo
        entering={FadeIn.delay(500)}
        alt="logo"
        source={logoPath}
        height={42}
        width={42}
        mr="$4"
      />
      <Content display="flex" entering={FadeIn.delay(500)}>
        <Heading theme="dark" mr="$2">
          ECO
        </Heading>
        <Heading fontWeight="$1">UFPel</Heading>
      </Content>
    </Wrapper>
  )
}

const Content = styled(Animated.View, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})
const Background = styled(Animated.View, {})
const Wrapper = styled(View, {
  name: 'Wrapper',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
})

const Logo = styled(Animated.Image, {})
