import { ScrollView, Text, View, XStack, useTheme } from 'tamagui'
import { MapaSVG } from '../../../assets/Mapa'
import { Dimensions } from 'react-native'
import { Map } from '@tamagui/lucide-icons'
import { Stack } from 'expo-router'
import useWebSocket from 'react-use-websocket'
import { useStorageState } from '../../../hooks'
import { useEffect, useState } from 'react'

const salas = Array.from({ length: 11 }, (_, i) => i + 330)

export default function Page() {
  const theme = useTheme()
  const background = theme.background.get()
  const [mapaConsumption, setMapaConsumption] = useState(() => {
    const initial = {}
    salas.forEach((sala) => {
      initial[sala] = null
    })
    return initial
  })

  const handlerMessage = (message) => {
    const parsed = JSON.parse(message.data)
    if (parsed['Room ID']) {
      setMapaConsumption((prev) => ({
        ...prev,
        [parsed['Room ID']]: parsed.Consumption,
      }))
    }
  }

  const handleOpenConection = () => {
    console.log('[MAPA] WS: Conexão aberta')
    salas.forEach((sala) => {
      console.log('[MAPA] Se inscrevedo na sala: ', String(sala))
      sendJsonMessage({
        type: 'subscribe',
        room_id: String(sala),
      })
    })
  }

  const width = Dimensions.get('window').width

  const [[_, token]] = useStorageState('session')
  const query = new URLSearchParams({ token: `Bearer ${token}` })

  const { getWebSocket, sendJsonMessage } = useWebSocket(
    `${process.env.EXPO_PUBLIC_WEBSOCKET_URL}/ws?${query}`,
    {
      onMessage: handlerMessage,
      onClose: (e) => console.log('[MAPA] conexão fechada', e),
      onOpen: handleOpenConection,
      onError: (err) => console.log('erro', err),
    },
  )

  useEffect(() => {
    return () => {
      getWebSocket().close()
    }
  }, [])

  return (
    <ScrollView backgroundColor={background}>
      <Stack.Screen
        options={{
          title: 'Mapa',
        }}
      />
      <View marginHorizontal="$4" marginVertical="$6">
        <XStack gap="$2">
          <Map />
          <Text fontSize="$7" fontWeight={600}>
            Mapa da instituição
          </Text>
        </XStack>
      </View>
      <View width={width} aspectRatio={0.4051008404}>
        <MapaSVG width={width} state={mapaConsumption} />
      </View>
    </ScrollView>
  )
}
