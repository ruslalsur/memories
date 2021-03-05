const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const MemoryController = require('../controllers/MemoryController')
const validate = require('../middleware/validateMiddleware')
const multer = require('multer')
const upload = multer({ dest: 'client/public/images/memories/' })

router.get(
  '/user/:id',
  [
    check('id')
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
      .matches(/^[random]{1}|[0-9a-fA-F]{24}$/)
      .trim(),
  ],
  validate(),
  MemoryController.getMemory
)

router.post(
  '/',
  [check('title', 'Название не может быть пустым').trim().notEmpty()],
  validate(),
  MemoryController.createMemory
)

router.post('/upload', upload.single('file'), MemoryController.uploadImage)

router.patch(
  '/:id',
  [
    check('title', 'Название не может быть пустым').trim().notEmpty(),
    check('id', 'Неправильный формат идентификатора документа')
      .matches(/^[0-9a-fA-F]{24}$/)
      .trim(),
  ],
  validate(),
  MemoryController.updateMemory
)

router.delete(
  '/:id',
  [
    check('id', 'Неправильный формат идентификатора документа')
      .matches(/^[0-9a-fA-F]{24}$/)
      .trim(),
  ],
  validate(),
  MemoryController.deleteMemory
)

module.exports = router
