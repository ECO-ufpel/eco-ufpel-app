import { Button, Text, View } from 'tamagui'
import { useSession } from '../../providers/Auth'

export default function AuthenticatedApp() {
  const { signOut } = useSession()

  return (
    <View>
      <Button onPress={signOut}>Signout</Button>
      <Text>Auth</Text>
    </View>
  )
}
