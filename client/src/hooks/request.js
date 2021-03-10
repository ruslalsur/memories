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
      const response = await axios({
        url,
        method,
        data: body,
        headers,
        responseType,
      })

      if (response.status === 251) {
        throw new Error(response.data.message || 'Что-то пошло не так')
      }

      setLoading(false)
      return response.data
    } catch (err) {
      setLoading(false)
      setError(err.message)
      throw err
    }
  }

  const resetError = useCallback(() => setError(null), [])

  return { request, loading, error, resetError }
}
