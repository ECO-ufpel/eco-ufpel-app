import { useEffect, useState } from 'react'
import { Text, View } from 'tamagui'
import { api } from '../../../service/api'
import { useActivity } from '../../../providers/ActivityWS'

import * as React from 'react'
import { CartesianChart, Line, useChartPressState } from 'victory-native'
import {
  Circle,
  useFont,
  vec,
  Line as SkiaLine,
  Text as SkiaText,
} from '@shopify/react-native-skia'
import inter from '../../../assets/inter.ttf'
import { useDerivedValue } from 'react-native-reanimated'
import { Stack } from 'expo-router'

export default function Page() {
  const { currentActivity } = useActivity()
  const [monthHistory, setActivityMonthHistoric] = useState([])

  useEffect(() => {
    if (currentActivity) {
      api
        .get('https://backend-deploy-0bfm.onrender.com/sensor/data/history', {
          params: {
            room_id: Number(currentActivity),
            start_time: '2024-01-25T00:00:00', // ToDo: endDate - 30 days
            end_time: '2024-02-25T00:00:00', // ToDo: new Date()
          },
        })
        .then((response) => {
          setActivityMonthHistoric(
            response.map((e) => ({
              day:
                new Date(e.date).getDate() +
                '/' +
                Number(new Date(e.date).getMonth() + 1),
              value: e.avgConsumption,
            })),
          )
        })
        .catch((error) => {
          console.log('aqui no erro', error)
        })
    }
  }, [currentActivity])

  return (
    <View marginHorizontal="$4" marginTop="$4">
      <Stack.Screen options={{ title: 'Histórico' }} />
      <Text fontSize="$9">Histórico</Text>
      <Text>Referente a atividade: {currentActivity}</Text>
      {monthHistory.length > 0 && <ChartMonth data={monthHistory} />}
      {/* ToDo: consumo semanal em barras */}
    </View>
  )
}

export function ChartMonth({ data }) {
  const font = useFont(inter, 12)
  const { state, isActive } = useChartPressState({ x: 0, y: { value: 0 } })

  return (
    <View style={{ height: 300 }} marginVertical="$6">
      <View alignItems="center" marginBottom="$4">
        <Text fontSize="$6">Consumo Mensal</Text>
      </View>
      <Text fontSize="$4" color="green" marginBottom="$4">
        kW/h
      </Text>
      <CartesianChart
        data={data} // 👈 specify your data
        xKey="day" // 👈 specify data key for x-axis
        yKeys={['day', 'value']} // 👈 specify data keys used for y-axis
        axisOptions={{
          font,
          labelColor: 'green',
          labelPosition: 'outset',
        }} // 👈 we'll generate axis labels using given font.
        domainPadding={{ left: 7, top: 7, right: 7, bottom: 7 }}
        chartPressState={state}
        renderOutside={({ chartBounds }) => (
          <>
            {isActive ? (
              <ActiveValueIndicator
                xPosition={state.x.position}
                yPosition={state.y.value.position}
                bottom={chartBounds.bottom}
                top={chartBounds.top}
                activeValue={state.y.value.value}
                activeDay={state.x.value}
                textColor="black"
                lineColor={'#71717a'}
                indicatorColor={'green'}
              />
            ) : null}
          </>
        )}
        // renderOutside={true} // 👈 render axis outside of the chart
      >
        {/* 👇 render function exposes various data, such as points. */}
        {({ points }) => (
          // 👇 and we'll use the Line component to render a line path.
          <>
            <Line
              canv
              points={points.value}
              curveType="natural"
              color="green"
              strokeWidth={3}
            />
          </>
        )}
      </CartesianChart>
    </View>
  )
}

const ActiveValueIndicator = ({
  xPosition,
  yPosition,
  top,
  bottom,
  activeValue,
  textColor,
  lineColor,
  indicatorColor,
  topOffset = 0,
  activeDay,
}) => {
  const FONT_SIZE = 16
  const font = useFont(inter, FONT_SIZE)
  const start = useDerivedValue(() => vec(xPosition.value, bottom))
  const end = useDerivedValue(() =>
    vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset),
  )
  // Text label
  const activeValueDisplay = useDerivedValue(
    () => activeValue.value.toFixed(2) + ' kW/h' + ' - ' + activeDay.value,
  )
  const activeValueWidth = useDerivedValue(
    () => font?.getTextWidth(activeValueDisplay.value) || 0,
  )
  const activeValueX = useDerivedValue(
    () => xPosition.value - activeValueWidth.value / 2,
  )

  return (
    <>
      <SkiaLine p1={start} p2={end} color={lineColor} strokeWidth={1} />
      <Circle cx={xPosition} cy={yPosition} r={10} color={indicatorColor} />
      <Circle
        cx={xPosition}
        cy={yPosition}
        r={8}
        color="hsla(0, 0, 100%, 0.25)"
      />
      <SkiaText
        color={textColor}
        font={font}
        text={activeValueDisplay}
        x={activeValueX}
        y={top + FONT_SIZE + topOffset}
      />
    </>
  )
}
