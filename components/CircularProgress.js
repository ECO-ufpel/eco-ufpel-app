import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Stack, Text } from 'tamagui'

export const CircularProgress = ({ dv, kw, mean, status }) => {
  const max = (Number.parseInt(kw) + Number.parseInt(dv)) * 1.2

  const percentageProgress = (kw / max) * 100

  const colors = {
    good: '#187A4D',
    bad: '#CD2B30',
    warning: '#BC4C00',
  }

  const colorStatus = colors[status]

  return (
    <AnimatedCircularProgress
      size={300}
      width={32}
      fill={percentageProgress || 0}
      tintColor={colorStatus}
      lineCap="round"
      arcSweepAngle={270}
      rotation={225}
      backgroundColor="#0000000f"
    >
      {() => {
        return (
          <Stack>
            <Text marginBottom="$4">
              Uso atual:{' '}
              <Text color={colorStatus}>
                <Text color={colorStatus} fontSize={28} fontWeight={600}>
                  {kw ?? '-'}
                </Text>
                KW/h
              </Text>
            </Text>
            <Text>Uso normal: {mean} KW/h</Text>
          </Stack>
        )
      }}
    </AnimatedCircularProgress>
  )
}
