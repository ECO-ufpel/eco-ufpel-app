import { useEffect, useState } from 'react'
import { Separator, Text, View } from 'tamagui'
import { api } from '../../../service/api'
import { useActivity } from '../../../providers/ActivityWS'

import * as React from 'react'
import { CartesianChart, Line, Bar, useChartPressState } from 'victory-native'
import {
  Circle,
  useFont,
  vec,
  LinearGradient,
  Line as SkiaLine,
  Text as SkiaText,
} from '@shopify/react-native-skia'
import inter from '../../../assets/inter.ttf'
import { useDerivedValue } from 'react-native-reanimated'
import { Stack } from 'expo-router'

export default function Page() {
  const {
    data: { roomId: currentActivity },
  } = useActivity()
  const [loading, setLoading] = useState(true)
  const [monthHistory, setActivityMonthHistoric] = useState([])
  const [weekHistory, setActivityWeekHistoric] = useState([])

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
          const monthDates = response.map((e) => ({
            day:
              new Date(e.date).getDate() +
              '/' +
              Number(new Date(e.date).getMonth() + 1),
            value: e.avgConsumption,
          }))
          setActivityMonthHistoric(monthDates)
          setActivityWeekHistoric(monthDates.slice(monthDates.length - 7))
        })
        .catch((error) => {
          console.log(
            '[HISTORICO] Erro ao carregar informações do historico',
            error,
          )
        })
        .finally(() => setLoading(false))
    }
  }, [currentActivity])

  return (
    <View marginHorizontal="$4" marginTop="$4">
      <Stack.Screen options={{ title: 'Histórico' }} />
      <Text fontSize="$9">Histórico</Text>
      <Text>Referente a atividade: {currentActivity}</Text>
      {loading ? (
        <Text
          textAlign="center"
          fontSize="$6"
          marginVertical="$10"
          opacity={0.5}
        >
          Carregando...
        </Text>
      ) : monthHistory.length > 0 ? (
        <ChartMonth data={monthHistory} />
      ) : (
        <Text
          textAlign="center"
          fontSize="$6"
          marginVertical="$10"
          opacity={0.5}
        >
          Sem Dados mensais referentes a essa sala
        </Text>
      )}

      <Separator theme="light" />

      {loading ? (
        <Text
          textAlign="center"
          fontSize="$6"
          marginVertical="$10"
          opacity={0.5}
        >
          Carregando...
        </Text>
      ) : weekHistory.length > 0 ? (
        <ChartWeek data={weekHistory} />
      ) : (
        <Text
          textAlign="center"
          fontSize="$6"
          marginVertical="$10"
          opacity={0.5}
        >
          Sem Dados semanais referentes a essa sala
        </Text>
      )}
    </View>
  )
}

export function ChartWeek({ data }) {
  const font = useFont(inter, 12)
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

  return (
    <View style={{ height: 300 }} marginVertical="$4">
      <View alignItems="center" marginBottom="$4">
        <Text fontSize="$6">Consumo Semanal</Text>
      </View>
      <Text fontSize="$4" color="green" marginBottom="$4">
        kW/h
      </Text>
      <CartesianChart
        data={data}
        xKey="day"
        yKeys={['value']}
        axisOptions={{
          font,
          labelColor: 'green',
          formatXLabel(value) {
            const year = new Date().getFullYear()
            const month = parseInt(value.split('/')[1])
            const day = parseInt(value.split('/')[0])
            const date = new Date(year, month - 1, day).getDay()

            return weekDays[date]
          },
        }} // 👈 we'll generate axis labels using given font.
        domainPadding={{ left: 30, top: 7, right: 30, bottom: 7 }}
      >
        {({ points, chartBounds }) => (
          <Bar
            chartBounds={chartBounds} // 👈 chartBounds is needed to know how to draw the bars
            points={points.value} // 👈 points is an object with a property for each yKey
            roundedCorners={{
              topLeft: 5,
              topRight: 5,
            }}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, 400)}
              colors={['#008000', '#23bd6d50']}
            />
          </Bar>
        )}
      </CartesianChart>
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
