import React, { useCallback } from 'react'
import { useStorageState } from '../hooks'

const AuthContext = React.createContext(null)

export function useSession() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState('session')

  const signIn = useCallback(async () => {
    try {
      await setSession('xxx')
    } catch (err) {
      console.log(err)
    }
  }, [setSession])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null)
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
