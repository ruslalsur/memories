const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const MemoryController = require('../controllers/MemoryController')
const validate = require('../middleware/validateMiddleware')

router.get(
  '/user/:userId',
  [
    check('userId')
      .isMongoId()
      .withMessage('Неправильный формат идентификатора документа')
      .trim(),
  ],
  validate(),
  MemoryController.getMemories
)

router.get(
  '/:id',
  [
    check('id', 'Неправильный формат идентификатора документа')
      .matches(/^[0-9a-fA-F]{24}$/)
      .matches(/^random$/)
      .trim(),
  ],
  MemoryController.getMemory
)

router.post(
  '/',
  [check('title', 'Название не может быть пустым').trim().notEmpty()],
  MemoryController.addMemory
)

router.patch(
  '/:id',
  [
    check('title', 'Название не может быть пустым').trim().notEmpty(),
    check('id', 'Неправильный формат идентификатора документа')
      .matches(/^[0-9a-fA-F]{24}$/)
      .trim(),
  ],
  MemoryController.updateMemory
)

router.delete(
  '/:id',
  [
    check('id', 'Неправильный формат идентификатора документа')
      .matches(/^[0-9a-fA-F]{24}$/)
      .trim(),
  ],
  MemoryController.deleteMemory
)

module.exports = router
