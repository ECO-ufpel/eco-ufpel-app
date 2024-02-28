import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useStorageState } from '../hooks'
import { router } from 'expo-router'
import { api } from '../service/api'

const AuthContext = React.createContext(null)

export function useSession() {
  const value = React.useContext(AuthContext)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  return value
}

export function SessionProvider(props) {
  const [signInLoading, setSignInLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [loadingUserInfo, setLoadingUserInfo] = useState(true)
  const [[isLoading, session], setSession] = useStorageState('session')

  const signIn = useCallback(
    async ({ username, password }) => {
      try {
        setSignInLoading(true)
        const { token } = await api.post('/auth/login', {
          cpf: username,
          password,
        })

        const userData = await api.get('/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        await setSession(token)

        setUserInfo(userData)
        setSignInLoading(false)
      } catch (err) {
        setSignInLoading(false)
        return Promise.reject(err)
      }
    },
    [setSession],
  )

  const signOut = useCallback(async () => {
    await setSession(null)
    router.replace('/sign-in')
  }, [])

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })

      setUserInfo(userInfo)
      setLoadingUserInfo(false)
      router.push('/home')
    }

    if (!isLoading && session) {
      getUserInfo(session)
    } else if (!isLoading && !session) {
      setLoadingUserInfo(false)
      router.replace('/sign-in')
    }
  }, [isLoading, session])

  const memoizedValue = useMemo(
    () => ({
      signIn,
      signOut,
      session,
      isLoading,
      userInfo,
      loadingUserInfo,
      signInLoading,
    }),
    [
      signIn,
      signOut,
      session,
      isLoading,
      userInfo,
      loadingUserInfo,
      signInLoading,
    ],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {props.children}
    </AuthContext.Provider>
  )
}
