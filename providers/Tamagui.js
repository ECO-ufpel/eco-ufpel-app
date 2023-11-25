import { TamaguiProvider as TMProvider, Theme } from 'tamagui'

import tmConfig from '../tamagui.config'
import { useSchema } from './ColorSchema'

export function TamaguiProvider({ children }) {
  const { schema } = useSchema()

  return (
    <TMProvider config={tmConfig}>
      <Theme name={schema}>
        <Theme name="green">{children}</Theme>
      </Theme>
    </TMProvider>
  )
}
