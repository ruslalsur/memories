const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const UserController = require('../controllers/UserController')
const rolesOnly = require('../middleware/roleMiddleware')

router.get('/', UserController.getUsers)
// router.get('/', rolesOnly(['USER']), UserController.getUsers)

router.post(
  '/signup',
  [
    check('username', 'Имя не может быть пустым').trim().notEmpty(),
    check('password', 'Пароль не может быть пустым').exists(),
    check('password', 'Минимальная длина пароля 3 символа').isLength({
      min: 3,
    }),
  ],
  UserController.signUp
)

router.post(
  '/signin',
  [
    check('username', 'Имя не может быть пустым').trim().notEmpty(),
    check('password', 'Пароль не может быть пустым').exists(),
    check('password', 'Минимальная длина пароля 3 символа').isLength({
      min: 3,
    }),
  ],
  UserController.signIn
)

module.exports = router
