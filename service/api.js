import axios from 'axios'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
})

api.interceptors.request.use(async function (request) {
  const token = await SecureStore.getItemAsync('session')

  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

api.interceptors.response.use(
  async function (response) {
    return response.data
  },
  async function (error) {
    const isForbidden = error.response?.status === 403
    const token = await SecureStore.getItemAsync('session')
    const url = error.config.url

    if (isForbidden && token && String(url).endsWith('/me')) {
      await SecureStore.deleteItemAsync('session')
      router.replace('/sign-in')
    }

    console.log('[AXIOS] Error', error)

    return Promise.reject(error)
  },
)
