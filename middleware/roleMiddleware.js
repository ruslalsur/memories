const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

module.exports = (allowedRoles = ['USER']) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(401).json({ message: 'Пользователь не авторизован' })
      }

      const {
        user: { userRoles: roles },
      } = jwt.verify(token, jwtSecret)

      let allowedRole = false

      userRoles.forEach((userRole) => {
        if (allowedRoles.includes(userRole)) {
          allowedRole = true
        }
      })

      if (!allowedRole) {
        return res
          .status(403)
          .json({ message: 'У пользователя недостаточно привилегий' })
      }

      next()
    } catch (e) {
      res.status(401).json({ message: 'Пользователь не авторизован' })
    }
  }
}
