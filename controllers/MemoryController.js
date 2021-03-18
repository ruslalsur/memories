const Memory = require('../models/Memory')
const path = require('path')
const { unlink, rename } = require('fs').promises
const { static_dir } = require('config')

class MemoryController {
  async getMemories(req, res) {
    const { id } = req.params

    try {
      const memories = await Memory.find({
        user: { _id: id },
        shared: true,
      })

      if (!memories.length) throw new Error(`Нет воспоминаний!`)

      return res.status(200).json(memories)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: err.message || 'Ошибка',
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
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: err.message || 'Ошибка',
      })
    }
  }

  async createMemory(req, res) {
    const { imgName } = req.body

    try {
      const candidate = await Memory.findOne({ title: req.body.title })
      if (candidate) {
        if (imgName) {
          await unlink(path.join(static_dir, 'img', imgName), (err) => {
            if (err) {
              console.log(`Ошибка при удалении ${imgName}: `, err)
            }
          })
        }

        return res.status(409).json({
          message: `Воспоминание с названием ${req.body.title} уже существует`,
        })
      }

      const newMemory = new Memory({
        ...req.body,
        user: '60330e0de96e077b16b6690e', //TODO: заменить на текущего пользователя
      })

      const result = await newMemory.save()

      return res.status(201).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: `Ошибка в процессе создания нового воспоминания`,
      })
    }
  }

  async updateMemory(req, res) {
    const { id } = req.params

    try {
      const willUpdate = await Memory.findById(id)

      const { imgName } = willUpdate
      if (imgName) {
        await unlink(path.join(static_dir, 'img', imgName), (err) => {
          if (err) {
            console.log(`Ошибка при удалении ${imgName}: `, err)
          }
        })
      }

      const updated = await Memory.updateOne({ _id: id }, { ...req.body })

      if (!updated) {
        return res.status(400).json({
          message: `Не удалось изменить воспоминание с идентификатором ${id}`,
        })
      }

      return res.status(200).json(updated)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: `Ошибка в процессе изменения старого воспоминания`,
      })
    }
  }

  async deleteMemory(req, res) {
    const { id } = req.params

    try {
      const deleted = await Memory.findByIdAndDelete(id)

      if (deleted === null) {
        return res.status(400).json({
          message: `Не удалось удалить воспоминание с идентификатором ${id}`,
        })
      }

      const { imgName } = deleted
      if (imgName) {
        await unlink(path.join(static_dir, 'img', imgName), (err) => {
          if (err) {
            console.log(`Ошибка при удалении ${imgName}: `, err)
          }
        })
      }

      return res.status(200).json(deleted)
    } catch (err) {
      console.log(err)
    }
  }

  async upload(req, res) {
    const { filename, path } = req.file

    try {
      await rename(path, `${static_dir}/img/${filename}`, (err) => {
        if (err) throw err
      })

      return res.status(201).end(filename)
    } catch (err) {
      console.log(`Ошибка при премешении ${filename} в ${part}: `, err)
    }
  }
}

module.exports = new MemoryController()
