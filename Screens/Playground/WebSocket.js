import { useFocusEffect } from 'expo-router'
import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { Button, Text, View } from 'tamagui'
import * as SecureStore from 'expo-secure-store'

export const WebSocketExample = () => {
  const [onScreen, setOnScreen] = useState(false)
  const [tokenLocal, setTokenLocal] = useState('')

  useEffect(() => {
    const asyncToken = async () => {
      const token = await SecureStore.getItemAsync('session')
      setTokenLocal(token)
    }

    asyncToken()
  }, [])

  useFocusEffect(() => {
    setOnScreen(true)

    return () => {
      setOnScreen(false)
    }
  })

  return (
    <View>
      <Text fontSize="$8" marginTop="$10">
        Websocket
      </Text>
      {tokenLocal && onScreen && <SocketComponent token={tokenLocal} />}
    </View>
  )
}

const SocketComponent = ({ token }) => {
  const query = new URLSearchParams({ token: `Bearer ${token}` })
  const { readyState, sendJsonMessage, lastMessage, getWebSocket } =
    useWebSocket(`${process.env.EXPO_PUBLIC_WEBSOCKET_URL}/ws?${query}`, {
      onMessage: (event) => console.log('mensagem recebida', event),
      onClose: () => console.log('conexão fechada'),
      onOpen: () => console.log('conexão aberta'),
      onError: (err) => console.log('erro', err),
    })

  useEffect(() => {
    return () => {
      getWebSocket().close()
    }
  }, [])

  return (
    <View>
      <Text>Ready state: {readyState}</Text>
      <Text>
        Last message:{' '}
        {lastMessage ? JSON.stringify(lastMessage, null, 2) : 'none'}
      </Text>

      <Button
        onPress={() =>
          sendJsonMessage({
            teste: 'oi',
          })
        }
      >
        Knock Knock
      </Button>
    </View>
  )
}
