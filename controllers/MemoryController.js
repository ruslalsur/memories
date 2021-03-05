const Memory = require('../models/Memory')

class MemoryController {
  async getMemories(req, res) {
    const { id } = req.params

    try {
      const memories = await Memory.find({
        user: { _id: id },
        shared: true,
      })

      if (!memories.length) throw new Error(`Нет пользователя с id=${id}`)

      return res.status(200).json(memories)
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: e.message || 'Ошибка',
      })
    }
  }

  async getMemory(req, res) {
    const { id } = req.params

    try {
      let memory = {}

      if (id === 'random') {
        const count = await Memory.countDocuments({ shared: true })
        const rand = Math.floor(Math.random() * count)
        memory = await Memory.findOne({ shared: true }).skip(rand)
      } else {
        memory = await Memory.findOne({ _id: id })
      }

      if (memory === null) {
        throw new Error(`Нет воспоминания с идентификатором ${id}`)
      }

      return res.status(200).json(memory)
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: e.message || 'Ошибка',
      })
    }
  }

  async createMemory(req, res) {
    try {
      const candidate = await Memory.findOne({ title: req.body.title })
      if (candidate) {
        return res.status(400).json({
          message: `Воспоминание с нзванием ${req.body.title} уже существует`,
        })
      }

      const newMemory = new Memory({
        ...req.body,
        user: '60330e0de96e077b16b6690e',
      })
      const result = await newMemory.save()

      return res.status(201).json(result)
    } catch (e) {
      console.log(e)

      res.status(500).json({
        message: `Ошибка в процессе создания нового воспоминания`,
      })
    }
  }

  async updateMemory(req, res) {
    const { id } = req.params

    try {
      const updated = await Memory.updateOne({ _id: id }, { ...req.body })

      if (!updated) {
        return res.status(400).json({
          message: `Не удалось изменить воспоминание с идентификатором ${id}`,
        })
      }

      return res.status(201).json(updated)
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: `Ошибка в процессе изменения старого воспоминания`,
      })
    }
  }

  async uploadImage(req, res) {
    console.log(`LOG response of upload: `, req.file)
  }

  async deleteMemory(req, res) {
    const { id } = req.params

    try {
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
