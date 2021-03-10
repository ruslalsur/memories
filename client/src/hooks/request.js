import { useState, useCallback } from 'react'
import axios from 'axios'

export const useRequest = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = async (
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' },
    responseType = 'json'
  ) => {
    setLoading(true)

    try {
      const res = await axios({
        url,
        method,
        data: body,
        headers,
        responseType,
        validateStatus: function (status) {
          return status < 500 // Resolve only if the status code is less than 500
        },
      })
      if (res.statusText !== 'OK') {
        throw new Error(res.data.message || 'Что-то пошло не так')
      }

      setLoading(false)

      return res.data
    } catch (err) {
      setLoading(false)
      setError(err.message)
      console.log(`LOG: errorREQ`, error)
      throw err
    }
  }

  const resetError = useCallback(() => setError(null), [])

  return { request, loading, error, resetError }
}
