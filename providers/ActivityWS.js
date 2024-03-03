import React, { useCallback, useEffect, useState } from 'react'
import { useStorageState } from '../hooks'
import useWebSocket from 'react-use-websocket'

const ActivityConsumeWS = React.createContext(null)

export function useActivity() {
  const value = React.useContext(ActivityConsumeWS)
  if (!value) {
    throw new Error('useSession must be wrapped in a <ActivityProvider />')
  }

  return value
}

export function ActivityProvider(props) {
  const [loading, setLoading] = useState(true)
  const [activityUsualConsumption, setActivityUsualConsumption] = useState({})
  const [currentActivity, setCurrentActivity] = useState(null)
  const [currentActivityLabel, setCurrentActivityLabel] = useState(null)
  const [currentConsumption, setCurrentConsumption] = useState(0)

  const handlerMessage = useCallback((message) => {
    console.log('[Provider] WS: Mensagem recebida', message.data)
    const parsed = JSON.parse(message.data)

    if (parsed?.type === 'course_change') {
      const roomId = JSON.parse(parsed.room_id)
      setCurrentActivity(roomId)
      setCurrentActivityLabel(
        parsed?.current_activity === 'null' ? null : parsed.current_activity,
      )

      if (roomId) {
        sendJsonMessage({
          type: 'subscribe',
          room_id: roomId,
        })
      }

      setActivityUsualConsumption({})
      setLoading(false)
    } else if (parsed.type === 'expected_consumption') {
      setActivityUsualConsumption({
        avarage: parsed.avarage,
        stdDev: parsed.std_dev,
      })
    }
    // Adicionar para caso a mensagem seja de troca de sala
    else if (parsed['Room ID']) {
      setCurrentActivity(parsed['Room ID'])
      setCurrentConsumption(parsed.Consumption)
    }
  }, [])

  const handleOpenConection = (e) => {
    console.log('[Provider] WS: Conexão aberta')
    console.log(e)
  }

  const [[_, token]] = useStorageState('session')
  const query = new URLSearchParams({ token: `Bearer ${token}` })
  // console.log('token', token)

  const { getWebSocket, sendJsonMessage } = useWebSocket(
    `${process.env.EXPO_PUBLIC_WEBSOCKET_URL}/ws?${query}`,
    {
      onMessage: handlerMessage,
      onClose: (e) => console.log('[Provider] conexão fechada', e),
      onOpen: handleOpenConection,
      onError: (err) => console.log('[Provider] erro', err),
    },
  )

  useEffect(() => {
    return () => {
      getWebSocket().close()
    }
  }, [])

  return (
    <ActivityConsumeWS.Provider
      value={{
        loadingActivity: loading,
        currentActivity,
        currentActivityLabel,
        currentConsumption,
      }}
    >
      {props.children}
    </ActivityConsumeWS.Provider>
  )
}
