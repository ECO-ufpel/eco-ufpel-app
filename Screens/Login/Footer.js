import { Text, View } from 'tamagui'

export function Footer() {
  return (
    <View flexDirection="row" mb="$6">
      <Text color="$gray10" mr="$1">
        lorem ipsum dolor?
      </Text>
      <Text as="a" color="$green10">
        contate cobalto
      </Text>
    </View>
  )
}
