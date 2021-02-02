const { Router } = require('express')
const router = Router()
const { check, } = require('express-validator')
const authController = require('../controllers/AuthController')

router.post(
  '/register',
  [
    check('username', 'Имя не может быть пустым').trim().notEmpty(),
    check('password', 'Минимальная длина пароля 3 символа').isLength({
      min: 3,
    }),
  ],
  authController.register
)

router.post(
  '/login',
  [
    check('username', 'Имя не может быть пустым').trim().notEmpty(),
    check('password', 'Пароль не может быть пустым').exists(),
  ],
  authController.login
)

module.exports = router
