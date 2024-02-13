import { useFocusEffect } from 'expo-router'
import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { Button, Text, View, styled } from 'tamagui'

export const WebSocketExample = () => {
  const [onScreen, setOnScreen] = useState(false)

  useFocusEffect(() => {
    setOnScreen(true)

    return () => {
      setOnScreen(false)
    }
  })

  return (
    <Wrapper>
      <Text>WebSocketExample</Text>
      {onScreen && <SocketComponent />}
    </Wrapper>
  )
}

const SocketComponent = () => {
  const { readyState, sendMessage, lastMessage, getWebSocket } = useWebSocket(
    'wss://echo.websocket.org',
    {
      onClose: () => console.log('conexão fechada'),
      onOpen: () => console.log('conexão aberta'),
    },
  )

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

      <Button onPress={() => sendMessage('ping')}>Knock Knock</Button>
    </View>
  )
}

const Wrapper = styled(View, {
  name: 'Wrapper',
  padding: '$4',
})
