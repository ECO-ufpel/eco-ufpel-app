import {
  Button,
  Heading,
  Input,
  Label,
  Text,
  XStack,
  YStack,
  styled,
} from 'tamagui'
import { useSession } from '../../providers/Auth'
import { useCallback, useState } from 'react'
import { router } from 'expo-router'
import { Eye, EyeOff } from '@tamagui/lucide-icons'

export function Form() {
  const [showPass, setShowPass] = useState(false)
  const { signIn } = useSession()

  const onSubmit = useCallback(async () => {
    await signIn()
    router.replace('/')
  })

  const toggleShowPass = () => setShowPass(!showPass)

  return (
    <YStack space="$6" width="100%" flex={1} mt="$6">
      <YStack space="$2">
        <Heading>Entrar</Heading>
        <Text color="$gray11">lorem ipsum dolor imet</Text>
      </YStack>

      <YStack space>
        <YStack>
          <Label>CPF</Label>
          <Input />
        </YStack>
        <YStack>
          <Label>Senha</Label>
          <XStack width="100%">
            <Input secureTextEntry={!showPass} flex={1} />
            <PasswordIcon
              color="$green10"
              icon={Eye}
              chromeless
              position="absolute"
              onPress={toggleShowPass}
            />
          </XStack>
        </YStack>
        <Button mt="$4" onPress={onSubmit}>
          Entrar
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
