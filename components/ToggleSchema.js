import { Button } from 'tamagui'
import { useSchema } from '../providers/ColorSchema'

export function ToggleSchema() {
  const { toggleSchema } = useSchema()

  return <Button onPress={toggleSchema}>Toggle color mode</Button>
}
