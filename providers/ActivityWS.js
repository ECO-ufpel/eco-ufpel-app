import React, { useCallback, useState } from 'react'
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
  const [currentActivity, setCurrentActivity] = useState(null)
  const [currentConsumption, setCurrentConsumption] = useState(0)

  const handlerMessage = useCallback((message) => {
    const parsed = JSON.parse(message.data)
    if (parsed['Room ID']) {
      setCurrentActivity(parsed['Room ID'])
      setCurrentConsumption(parsed.Consumption)
    }
  }, [])

  const [[_, token]] = useStorageState('session')
  const query = new URLSearchParams({ token: `Bearer ${token}` })
  useWebSocket(`${process.env.EXPO_PUBLIC_WEBSOCKET_URL}/ws?${query}`, {
    onMessage: handlerMessage,
    onClose: () => console.log('conexão fechada'),
    onOpen: () => console.log('conexão aberta'),
    onError: (err) => console.log('erro', err),
  })

  return (
    <ActivityConsumeWS.Provider
      value={{
        currentActivity,
        currentConsumption,
      }}
    >
      {props.children}
    </ActivityConsumeWS.Provider>
  )
}
