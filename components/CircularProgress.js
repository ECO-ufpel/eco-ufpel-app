import { useMemo } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Button, Stack, Text } from 'tamagui'

export const CircularProgress = ({ max, progress, mean }) => {
  const ideal = 60 // Recive from api

  const status = useMemo(() => {
    const idealRange = ideal * 0.15

    if (progress > ideal - idealRange && progress < ideal + idealRange)
      return 'warning'

    if (progress > ideal) return 'bad'
    return 'good'
  }, [progress])

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
      fill={Number.parseInt(progress)}
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
                  {progress}
                </Text>
                KW/h
              </Text>
            </Text>
            <Text>Uso normal: {ideal} KW/h</Text>
          </Stack>
        )
      }}
    </AnimatedCircularProgress>
  )
}
