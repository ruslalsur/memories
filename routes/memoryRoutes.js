const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const MemoryController = require('../controllers/MemoryController')

router.get('/memories', MemoryController.getMemories)

router.post(
  '/memories',
  [check('title', 'Название не может быть пустым').trim().notEmpty()],
  MemoryController.setMemory
)

module.exports = router
