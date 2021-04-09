const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { jvtSecret } = require('config')
const Role = require('../models/Role')
const User = require('../models/User')
const { Error } = require('mongoose')
const path = require('path')
const { stat, unlink } = require('fs').promises
const { storage_dir } = require('config')

class UserController {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('roles')
      return res.status(200).json(users)
    } catch (e) {
      console.log(e)
    }
  }

  async signUp(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          validationErrors,
          message: 'Ошибки валидации при создании нового пользователя',
        })
      }

      const { username, password } = req.body
      const candidate = await User.findOne({ username })

      if (candidate) {
        return res
          .status(409)
          .json({ message: `Пользователь ${username} уже существует` })
      }

      const hashPassword = bcrypt.hashSync(password, 5)
      const userRole = await Role.findOne({ role: 'USER' })

      const user = new User({
        username,
        password: hashPassword,
      })
      user.roles.push(userRole)

      await user.save()

      return res
        .status(201)
        .json({ message: `Был создан новый пользователь ${username}` })
    } catch (err) {
      console.log(Error)
      res.status(500).json({
        message: `Ошибка в процессе создания нового пользователя ${username}`,
      })
    }
  }

  async signIn(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Незарегистрированый пользователь' })
      }

      const paswordIsValid = bcrypt.compareSync(password, user.password)

      if (!paswordIsValid) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      const token = jwt.sign({ user }, jvtSecret, {
        expiresIn: '1h',
      })

      const authorizedUser = JSON.parse(JSON.stringify(user))
      delete authorizedUser.password

      return res.json({ token, authorizedUser })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: 'Возникли проблемы в процессе авторизации пользователя',
      })
    }
  }

  async updateAvatar(req, res) {
    const { id } = req.params
    const { avatarSrc } = req.body

    let user = {}
    let avatar = ''

    try {
      user = await User.findById(id)
      avatar = user.avatar

      await unlink(path.join(storage_dir, avatar))
    } catch (err) {
      if (err.code !== 'ENOENT') {
        res.status(500).json({
          message:
            err.message || `Ошибка в процессе изменения изображения аватара`,
        })
      }
    } finally {
      user.avatar = avatarSrc
      user.save()

      return res.status(200).json({ user })
    }
  }
}

module.exports = new UserController()
