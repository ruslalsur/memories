import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../context'

export const useStorage = () => {
  const { token, setInfo, authorizedUser } = useContext(Context)
  const uploadImage = async (file) => {
    const fd = new FormData()
    fd.append('file', file)

    try {
      const response = await axios({
        url: '/api/memory/upload',
        method: 'POST',
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        responseType: 'text',
      })

      return response.data
    } catch (err) {
      throw Error('Попытка загрузки файла не удалась (проверте размер)')
    }
  }

  return { uploadImage }
}
