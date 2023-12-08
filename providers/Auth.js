import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useStorageState } from '../hooks'
import { router } from 'expo-router'
import { api } from '../service/api'

import * as SecureStore from 'expo-secure-store'

const AuthContext = React.createContext(null)

export function useSession() {
  const value = React.useContext(AuthContext)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  return value
}

export function SessionProvider(props) {
  const [userInfo, setUserInfo] = useState({})
  const [[isLoading, session], setSession] = useStorageState('session')

  const signIn = useCallback(async () => {
    // ToDo: remove mocked userdata
    const { token, ...userData } = await api.post('/auth/login', {
      username: 'kminchelle',
      password: '0lelplR',
    })

    setUserInfo(userData)

    await setSession(token)
  }, [setSession])

  const signOut = useCallback(async () => {
    await setSession(null)
    router.replace('/sign-in')
  }, [])

  useEffect(() => {
    const getUserInfo = async () => {
      // ToDo: change to /me
      const { token, ...userData } = await api.post('/auth/login', {
        username: 'kminchelle',
        password: '0lelplR',
      })
      setUserInfo(userData)

      router.push('/home')
    }

    if (!isLoading && session) {
      getUserInfo(session)
    }
  }, [isLoading, session])

  const memoizedValue = useMemo(
    () => ({
      signIn,
      signOut,
      session,
      isLoading,
      userInfo,
    }),
    [signIn, signOut, session, isLoading, userInfo],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {props.children}
    </AuthContext.Provider>
  )
}
