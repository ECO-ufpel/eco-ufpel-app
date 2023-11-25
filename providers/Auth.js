import React, { useCallback, useMemo } from 'react'
import { useStorageState } from '../hooks'

const AuthContext = React.createContext(null)

export function useSession() {
  const value = React.useContext(AuthContext)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  return value
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState('session')

  const signIn = useCallback(async () => {
    try {
      await setSession('xxx')
    } catch (err) {
      console.error(err)
    }
  }, [setSession])

  const signOut = useCallback(async () => {
    await setSession(null)
  }, [])

  const memoizedValue = useMemo(
    () => ({
      signIn,
      signOut,
      session,
      isLoading,
    }),
    [signIn, signOut, session, isLoading],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {props.children}
    </AuthContext.Provider>
  )
}
