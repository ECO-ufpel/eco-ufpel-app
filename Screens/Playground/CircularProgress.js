import { useMemo, useState } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Button, Stack, Text, View } from 'tamagui'

export const CircularExample = () => {
  const ideal = 60 // Recive from api

  const [progress, setProgress] = useState(0)

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

  const handleProgress = () => {
    setProgress((prev) => {
      if (prev === 100) return 0
      return prev + 5
    })
  }

  return (
    <AnimatedCircularProgress
      size={300}
      width={32}
      fill={progress}
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
              <Button onPress={handleProgress}>Change Progress</Button>
            </Text>
            <Text>Uso normal: {ideal} KW/h</Text>
          </Stack>
        )
      }}
    </AnimatedCircularProgress>
  )
}
