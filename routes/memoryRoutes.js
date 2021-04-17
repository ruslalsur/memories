const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const MemoryController = require('../controllers/MemoryController')
const validate = require('../middleware/validateMiddleware')
const upload = require('../middleware/uploadMiddleware')
const roleOnly = require('../middleware/authMiddleware')

router.get(
  '/user/:id/search/:search/share/:share/page/:page/perPage/:perPage',
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

router.get(
  '/stat/:id',
  [
    check('id', 'Неправильный формат идентификатора документа')
      .matches(/^[0-9a-fA-F]{24}$/)
      .trim(),
  ],
  roleOnly('USER'),
  validate(),
  MemoryController.getStat
)

router.get(
  '/chartdata/user/:id/year/:year',
  [
    check('id', 'Неправильный формат идентификатора документа')
      .matches(/^[0-9a-fA-F]{24}$/)
      .trim(),
    check('year', 'Неправильный формат года')
      .matches(/^[0-9]{4}$/)
      .trim(),
  ],
  validate(),
  MemoryController.getChartData
)

router.post(
  '/',
  [check('title', 'Название не может быть пустым').trim().notEmpty()],
  roleOnly('USER'),
  validate(),
  MemoryController.createMemory
)

router.post(
  '/upload',
  roleOnly('USER'),
  upload.single('file'),
  MemoryController.upload
)

router.patch(
  '/:id',
  [
    check('title', 'Название не может быть пустым').trim().notEmpty(),
    check('id', 'Неправильный формат идентификатора документа')
      .matches(/^[0-9a-fA-F]{24}$/)
      .trim(),
  ],
  validate(),
  roleOnly('USER'),
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
  roleOnly('USER'),
  MemoryController.deleteMemory
)

module.exports = router
