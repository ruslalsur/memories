const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config.js')
const Role = require('../models/Role')
const User = require('../models/User')

class AuthController {
  async register(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          validationErrors,
          message: 'Ошибки валидации при регистрации',
        })
      }

      const { username, password } = req.body
      const candidate = await User.findOne({ username })

      if (candidate) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} уже существует` })
      }

      const hashPassword = bcrypt.hashSync(password, 5)
      const userRole = await Role.findOne({ role: 'USER' })
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.role],
      })
      await user.save()

      return res.status(201).json({ message: `Пользователь ${username} зарегистрирован` })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Ошибка в процессе регистрации' })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })

      if (!user) {
        return res.status(400).json({ message: 'Несуществующий пользователь' })
      }

      const paswordIsValid = bcrypt.compareSync(password, user.password)

      if (!paswordIsValid) {
        return res.status(400).json({ message: 'Несуществующий пароль' })
      }
      console.log(`login: `, user)

      const token = jwt.sign({user}, jwtSecret, {expiresIn: '1h'})

      return res.json({token})
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Ошибка в процессе авторизации' })
    }
  }
}

module.exports = new AuthController()
