const jwt = require('jsonwebtoken')
const { jvtSecret } = require('config')

module.exports = (allowedRole) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

      if (!token) {
        return res.status(401).json({ message: 'Токена в заголовке нету' })
      }

      jwt.verify(token, jvtSecret, (err, decoded) => {
        if (err) throw new Error('Токен не действителен')

        const { user } = decoded
        req.authorizedUser = user

        const { roles } = user
        const allow = roles.some((item) => item.role === allowedRole)

        if (!allow) {
          throw new Error(
            `Пользователю ${user.username} нужны привилегии: ${allowedRole}`
          )
        }
      })

      next()
    } catch (err) {
      res
        .status(403)
        .json({ message: err.message || 'Неудачная попытка авторизации' })
    }
  }
}
