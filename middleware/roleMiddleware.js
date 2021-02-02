const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

module.exports = (allowedRoles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(401).json({ message: 'Отсутствует токен доступа' })
      }

      const {
        user: { roles, _id, username },
      } = jwt.verify(token, jwtSecret)
      req.user = { roles, _id, username }
      
      let isAllowed = false

      roles.forEach((role) => {
        if (allowedRoles.includes(role)) {
          isAllowed = true
        }
      })

      if (!isAllowed) {
        return res
          .status(403)
          .json({ message: `Пользователю ${req.user.username} нужны привилегии: ${allowedRoles + ''}` })
      }

      next()
    } catch (e) {
      res.status(401).json({ message: 'Пользователь ${req.user.username} не авторизован' })
    }
  }
}
