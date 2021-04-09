import axios from 'axios'

export const useStorage = () => {
  const uploadImage = async (file) => {
    const fd = new FormData()
    fd.append('file', file)

    try {
      const response = await axios({
        url: '/api/memory/upload',
        method: 'POST',
        data: fd,
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'text',
      })

      return response.data
    } catch (err) {
      console.log(
        `Попытка загрузки файла не удалась: `,
        err.response.data.message
      )
    }
  }

  return { uploadImage }
}
