import axios from 'axios'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
})

api.interceptors.response.use(
  async function (response) {
    console.log('[AXIOS] Response', response.data)
    return response.data
  },
  async function (error) {
    const isForbidden = error.response?.status === 403
    const token = await SecureStore.getItemAsync('session')

    if (isForbidden && token) {
      await SecureStore.deleteItemAsync('session')
      router.replace('/sign-in')
    }

    console.log('[AXIOS] Error', error)

    return Promise.reject(error)
  },
)
