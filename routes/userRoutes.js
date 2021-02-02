const { Router } = require('express')
const router = Router()
const userController = require('../controllers/UserController')
const authorizedOnly = require('../middleware/authMiddleware')
const rolesOnly = require('../middleware/roleMiddleware')

router.get('/users', rolesOnly(['USER']), userController.getUsers)

module.exports = router
