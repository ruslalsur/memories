const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const userController = require('../controllers/UserController')
const rolesOnly = require('../middleware/roleMiddleware')

router.get('/users', rolesOnly(['USER']), userController.getUsers)

router.post(
  '/create',
  [
    check('username', 'Имя не может быть пустым').trim().notEmpty(),
    check('password', 'Минимальная длина пароля 3 символа').isLength({
      min: 3,
    }),
  ],
  userController.create
)

router.post(
  '/auth',
  [
    check('username', 'Имя не может быть пустым').trim().notEmpty(),
    check('password', 'Пароль не может быть пустым').exists(),
  ],
  userController.auth
)

module.exports = router
