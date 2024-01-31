import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

api.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    console.log('error', error)
    return Promise.reject(error)
  },
)
