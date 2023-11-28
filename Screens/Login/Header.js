import React from 'react'
import { View, Text, Heading, Image, styled, useTheme } from 'tamagui'
import logoPath from '../../assets/logo_white.png'

export function Header(props) {
  return (
    <Wrapper
      {...props}
      theme="dark"
      backgroundColor="$green8"
      borderRadius="$8"
      py="$6"
      size="$9"
    >
      <Image
        alt="logo"
        source={{ uri: logoPath }}
        height={42}
        width={42}
        mr="$4"
      />
      <Heading theme="dark" mr="$2">
        ECO
      </Heading>
      <Heading fontWeight="$1">UFPel</Heading>
    </Wrapper>
  )
}

const Wrapper = styled(View, {
  name: 'Wrapper',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
})
