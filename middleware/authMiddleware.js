const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' })
    }

    const {
      user: { roles, _id, username },
    } = jwt.verify(token, jwtSecret)
    req.user = { roles, _id, username }

    next()
  } catch (e) {
    res.status(401).json({ message: 'Пользователь не авторизован' })
  }
}
