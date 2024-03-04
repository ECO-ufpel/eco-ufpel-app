import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useStorageState } from '../hooks'
import useWebSocket from 'react-use-websocket'
import { Theme } from 'tamagui'

const ActivityConsumeWS = React.createContext(null)

export function useActivity() {
  const value = React.useContext(ActivityConsumeWS)
  if (!value) {
    throw new Error('useSession must be wrapped in a <ActivityProvider />')
  }

  return value
}

const defaultActivityData = {
  label: null,
  roomId: null,
  currentConsumption: null,
  usualConsumption: {
    average: null,
    stdDev: null,
  },
}

export function ActivityProvider(props) {
  const [activityData, setActivityData] = useState(defaultActivityData)
  const [loading, setLoading] = useState(true)

  const currentConsumption = activityData.currentConsumption
  const avg = activityData.usualConsumption.average
  const stdDev = activityData.usualConsumption.stdDev

  const handlerMessage = useCallback((message) => {
    const data = JSON.parse(message.data)
    console.log('[Provider] WS: Mensagem recebida', data)

    // Consumption message doenst have type specified
    // inject type
    if (data['Room ID']) {
      data.type = 'consumption'
    }

    switch (data.type) {
      case 'consumption': {
        setActivityData((e) => ({
          ...e,
          currentConsumption: data.Consumption,
        }))
        break
      }
      case 'course_change': {
        const isFree = !JSON.parse(data.current_activity)
        if (isFree) {
          setLoading(true)
          setActivityData(defaultActivityData)

          // Test subscription
          // const roomId = 333
          // const acitivityLabel = 'Computação Gráfica'
          // setActivityData((e) => ({
          //   ...e,
          //   roomId,
          //   label: acitivityLabel,
          // }))
          // sendJsonMessage({
          //   type: 'subscribe',
          //   room_id: roomId,
          // })

          // Delete this ^
          setLoading(false)
        } else {
          const roomId = data.room_id
          const acitivityLabel = data.current_activity
          setActivityData((e) => ({
            ...e,
            roomId,
            label: acitivityLabel,
          }))
          sendJsonMessage({
            type: 'subscribe',
            room_id: roomId,
          })
          setLoading(false)
        }

        break
      }
      case 'expected_consumption': {
        setActivityData((e) => ({
          ...e,
          usualConsumption: {
            average: Math.round(data.average * 10) / 10,
            stdDev: Math.round(data.std_dev * 10) / 10,
          },
        }))
        break
      }
      default: {
        console.log('[Provider] WS: Mensagem não tratada', data)
      }
    }
  }, [])

  const handleOpenConection = (e) => {
    console.log('[Provider] WS: Conexão aberta')
    console.log(e)
  }

  const [[_, token]] = useStorageState('session')
  const query = new URLSearchParams({ token: `Bearer ${token}` })

  const { getWebSocket, sendJsonMessage } = useWebSocket(
    `${process.env.EXPO_PUBLIC_WEBSOCKET_URL}/ws?${query}`,
    {
      onMessage: handlerMessage,
      onClose: (e) => console.log('[Provider] conexão fechada', e),
      onOpen: handleOpenConection,
      onError: (err) => console.log('[Provider] erro', err),
    },
  )

  const consumptionStatus = useMemo(() => {
    if (!currentConsumption || !avg || !stdDev) return 'good'
    const maxBoardWarning = avg + stdDev
    const minBoardWarning = avg - stdDev

    if (currentConsumption < minBoardWarning) {
      return 'good'
    } else if (currentConsumption > maxBoardWarning) {
      return 'bad'
    } else {
      return 'warning'
    }
  }, [avg, stdDev, currentConsumption])

  useEffect(() => {
    return () => {
      getWebSocket().close()
    }
  }, [])

  const colors = {
    good: 'green',
    bad: 'red',
    warning: 'orange',
  }

  return (
    <ActivityConsumeWS.Provider
      value={{
        data: activityData,
        loading,
        consumptionStatus,
      }}
    >
      <Theme name={colors[consumptionStatus]}>{props.children}</Theme>
    </ActivityConsumeWS.Provider>
  )
}
