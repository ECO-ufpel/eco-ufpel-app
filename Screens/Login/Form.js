import {
  Button,
  Heading,
  Input,
  Label,
  Spinner,
  Text,
  XStack,
  YStack,
  styled,
} from 'tamagui'
import { useSession } from '../../providers/Auth'
import { useCallback, useState } from 'react'
import { router } from 'expo-router'
import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { Alert } from 'react-native'

export function Form() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)
  const { signIn, signInLoading } = useSession()

  const onSubmit = useCallback(async () => {
    try {
      await signIn({ username, password })
      router.push('/home')
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar realizar o login')
      console.log(err)
    }
  })

  const toggleShowPass = () => setShowPass(!showPass)

  return (
    <YStack space="$6" width="100%" flex={1}>
      <YStack space="$2">
        <Heading>Entrar</Heading>
        <Text color="$gray11">lorem ipsum dolor imet</Text>
      </YStack>

      <YStack space>
        <YStack>
          <Label>CPF</Label>
          <Input
            onChangeText={setUsername}
            value={username}
            keyboardType="numeric"
          />
        </YStack>
        <YStack>
          <Label>Senha</Label>
          <XStack width="100%">
            <Input
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPass}
              flex={1}
            />
            <PasswordIcon
              color="$green10"
              icon={!showPass ? Eye : EyeOff}
              chromeless
              position="absolute"
              onPress={toggleShowPass}
            />
          </XStack>
        </YStack>
        <Button mt="$4" onPress={onSubmit} disabled={signInLoading}>
          {signInLoading ? <Spinner /> : 'Entrar'}
        </Button>
      </YStack>
    </YStack>
  )
}

const PasswordIcon = styled(Button, {
  name: 'PasswordIcon',
  position: 'absolute',
  right: 0,
  height: '100%',
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
})
