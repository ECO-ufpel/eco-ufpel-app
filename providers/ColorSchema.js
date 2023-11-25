import React, { useCallback, useMemo } from 'react'
import { useStorageState } from '../hooks'

const Schema = React.createContext(null)

export function useSchema() {
  const value = React.useContext(Schema)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SchemaProvider />')
  }

  return value
}

export function SchemaProvider(props) {
  const [[isLoading, schema], setSchema] = useStorageState('schema')

  const toggleSchema = useCallback(async () => {
    const newValue = schema !== 'light' ? 'light' : 'dark'
    await setSchema(newValue)
  }, [schema])

  const memoizedValue = useMemo(
    () => ({
      toggleSchema,
      schema: schema || 'light',
    }),
    [toggleSchema, schema],
  )

  return (
    <Schema.Provider value={memoizedValue}>{props.children}</Schema.Provider>
  )
}
