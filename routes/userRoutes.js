const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const UserController = require('../controllers/UserController')
const rolesOnly = require('../middleware/roleMiddleware')

router.get('/users', rolesOnly(['USER']), UserController.getUsers)

router.post(
  '/register',
  [
    check('username', 'Имя не может быть пустым').trim().notEmpty(),
    check('password', 'Минимальная длина пароля 3 символа').isLength({
      min: 3,
    }),
  ],
  UserController.register
)

router.post(
  '/login',
  [
    check('username', 'Имя не может быть пустым').trim().notEmpty(),
    check('password', 'Пароль не может быть пустым').exists(),
  ],
  UserController.login
)

module.exports = router
