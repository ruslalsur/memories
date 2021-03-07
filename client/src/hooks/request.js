import { useState, useCallback } from 'react'
import axios from 'axios'

export const useRequest = () => {
  const [loading, setLoading] = useState(false)

  const request = useCallback(
    async (
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

        setLoading(false)

        return response.data
      } catch (e) {
        setLoading(false)
        throw e
      }
    },
    []
  )

  return { loading, request }
}
