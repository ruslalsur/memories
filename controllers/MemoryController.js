const { validationResult } = require('express-validator')
const Memory = require('../models/Memory')

class MemoryController {
  async getMemories(req, res) {
    try {
      const memories = await Memory.find({ shared: true })
      return res.status(200).json(memories)
    } catch (e) {
      console.log(e)
    }
  }

  async setMemory(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          validationErrors,
          message: 'Ошибки валидации при создании нового воспоминания',
        })
      }

      const { title, description, image, shared, user } = req.body

      const memory = new Memory({
        title,
        description,
        image,
        shared,
        user,
      })
      await memory.save()

      return res
        .status(201)
        .json({ message: `Было добавлено новое воспоминание: ${title}` })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: `Ошибка в процессе создания нового воспоминания`,
      })
    }
  }
}

module.exports = new MemoryController()
