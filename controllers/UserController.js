const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { jvtSecret } = require('config')
const Role = require('../models/Role')
const User = require('../models/User')
const path = require('path')
const { unlink } = require('fs').promises
const { storage_dir } = require('config')
const mailSender = require('../helpers/mailSender')

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
    const { username, password } = req.body
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          validationErrors,
          message: 'Ошибки валидации при создании нового пользователя',
        })
      }

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
      console.log(`LOG username: `, username)

      await user.save()

      return res
        .status(201)
        .json({ message: `Был создан новый пользователь ${username}` })
    } catch (err) {
      console.log(err)
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

  async updateUser(req, res) {
    const { id } = req.params
    const { avatarSrc, email } = req.body
    let msg = ''

    try {
      const user = await User.findById(id)

      if (avatarSrc) {
        if (user.avatar) await unlink(path.join(storage_dir, user.avatar))
        user.avatar = avatarSrc
        msg = 'Аватар был изменен'
      }
      if (email !== undefined) {
        user.email = email

        if (email) {
          mailSender(user)
          msg = `На адрес ${email} отправлено письмо`
        } else {
          msg = `Благодарим за попытку добавить информацию`
        }
      }

      await user.save()
      return res.status(200).json({ message: msg, user })
    } catch (err) {
      console.log(`LOG err: `, err)
      return res.status(500).json({
        message: err.message,
      })
    }
  }
}

module.exports = new UserController()
