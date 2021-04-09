const jwt = require('jsonwebtoken')
const { jvtSecret } = require('config')

module.exports = (allowedRoles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

      if (!token) {
        return res.status(401).json({ message: 'Токена в заголовке нету' })
      }

      const { authorizedUser } = jwt.verify(token, jvtSecret)

      req.authorizedUser = authorizedUser

      let isAllowed = false

      roles.forEach((role) => {
        if (allowedRoles.includes(role)) {
          isAllowed = true
        }
      })

      if (!isAllowed) {
        return res.status(403).json({
          message: `Пользователю ${
            req.authorizedUser.username
          } нужны привилегии: ${allowedRoles + ''}`,
        })
      }

      next()
    } catch (e) {
      res.status(401).json({ message: 'Неудачная попытка авторизации' })
    }
  }
}
