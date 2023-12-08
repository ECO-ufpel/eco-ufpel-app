import { View, Spinner } from 'tamagui'

export function LoadingScreen() {
  return (
    <View
      theme="dark"
      backgroundColor="$green8"
      flex={1}
      alignContent="center"
      justifyContent="center"
    >
      <Spinner size="large" />
    </View>
  )
}
