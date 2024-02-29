import * as React from 'react'
import { CartesianChart, Line, useChartPressState } from 'victory-native'
import {
  Circle,
  useFont,
  vec,
  Line as SkiaLine,
  Text as SkiaText,
} from '@shopify/react-native-skia'
import inter from '../../assets/inter.ttf'
import { Text, View } from 'tamagui'
import { useDerivedValue } from 'react-native-reanimated'

export function ChartsExample() {
  const font = useFont(inter, 12)
  const { state, isActive } = useChartPressState({ x: 0, y: { value: 0 } })

  return (
    <View style={{ height: 300 }} marginVertical="$6">
      <View alignItems="center" marginBottom="$4">
        <Text fontSize="$8">Consumo Mensal</Text>
      </View>
      <Text fontSize="$4" color="green" marginBottom="$4">
        kW/h
      </Text>
      <CartesianChart
        data={DATA} // 👈 specify your data
        xKey="day" // 👈 specify data key for x-axis
        yKeys={['lowTmp', 'value']} // 👈 specify data keys used for y-axis
        axisOptions={{
          font,
          labelColor: 'green',
          labelPosition: 'outset',
        }} // 👈 we'll generate axis labels using given font.
        domain={{ y: [0, 100] }} // 👈 specify domain for y-axis
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
}) => {
  const FONT_SIZE = 16
  const font = useFont(inter, FONT_SIZE)
  const start = useDerivedValue(() => vec(xPosition.value, bottom))
  const end = useDerivedValue(() =>
    vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset),
  )
  // Text label
  const activeValueDisplay = useDerivedValue(
    () => activeValue.value.toFixed(2) + ' kW/h',
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

function ToolTip({ x, y }) {
  return <Circle cx={x} cy={y} r={8} color="black" />
}

const DATA = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  lowTmp: 20 + 10 * Math.random(),
  value: 40 + 30 * Math.random(),
}))
