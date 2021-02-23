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

  async getMemory(req, res) {
    try {
      const { id } = req.params
      // const memory = await Memory.findOne({ _id: id }).populate({
      //   path: 'user',
      //   select: 'username',
      //   populate: {
      //     path: 'roles',
      //   },
      // })

      const memory = await Memory.findOne({ _id: id })

      if (memory === null) {
        throw new Error('Нет воспоминания с идентификатором ${id}`')
      }

      return res.status(200).json(memory)
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: e.message || 'Ошибка',
      })
    }
  }

  async addMemory(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          validationErrors,
          message: 'Ошибки валидации при создании нового воспоминания',
        })
      }

      const candidate = await Memory.findOne({ title: req.body.title })
      if (candidate) {
        return res.status(400).json({
          message: `Воспоминание с нзванием ${req.body.title} уже существует`,
        })
      }

      const memory = new Memory({ ...req.body })
      await memory.save()

      return res.status(201).json({
        message: `Было добавлено новое воспоминание: ${req.body.title}`,
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: `Ошибка в процессе создания нового воспоминания`,
      })
    }
  }

  async updateMemory(req, res) {
    try {
      const { id } = req.params

      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          validationErrors,
          message: 'Ошибки валидации при изменении старого воспоминания',
        })
      }

      const beforUpdateMemory = await Memory.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      )

      if (beforUpdateMemory === null) {
        return res.status(400).json({
          message: `Не удалось изменить воспоминание с идентификатором ${id}`,
        })
      }

      return res.status(201).json(beforUpdateMemory)
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: `Ошибка в процессе изменения старого воспоминания`,
      })
    }
  }

  async deleteMemory(req, res) {
    try {
      const { id } = req.params
      const result = await Memory.findByIdAndDelete(id)

      if (result === null) {
        return res.status(400).json({
          message: `Не удалось удалить воспоминание с идентификатором ${id}`,
        })
      }

      return res.status(200).json(result)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new MemoryController()
