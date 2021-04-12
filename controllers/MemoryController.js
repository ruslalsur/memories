const Memory = require('../models/Memory')
const path = require('path')
const { unlink } = require('fs').promises
const { storage_dir } = require('config')

class MemoryController {
  async getMemories(req, res) {
    const { id, search, share, page, perPage } = req.params

    let key = { $in: [true, false] }
    switch (share) {
      case 'private':
        key = false
        break
      case 'public':
        key = true
        break

      default:
        break
    }

    try {
      const memories = await Memory.find({
        user: { _id: id },
        shared: key,
        $or: [
          {
            title: {
              $regex: search === 'none' ? `\w*` : `${search}`,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: search === 'none' ? `\w*` : `${search}`,
              $options: 'i',
            },
          },
        ],
      })
        .limit(+perPage)
        .skip((+page !== 0 ? +page - 1 : 1) * +perPage)

      const allMemoriesCount = await Memory.countDocuments({
        user: { _id: id },
        shared: key,
        $or: [
          {
            title: {
              $regex: search === 'none' ? `\w*` : `${search}`,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: search === 'none' ? `\w*` : `${search}`,
              $options: 'i',
            },
          },
        ],
      })

      return res.status(200).json({
        memories,
        allMemoriesCount,
      })
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
      console.log('Ошибка: ', err)
      return res.status(400).json({
        message: err.message || 'Ошибка!',
      })
    }
  }

  async getStat(req, res) {
    const { id } = req.params

    try {
      const memoriesCount = await Memory.countDocuments({
        user: { _id: id },
      })
      const publicMemoriesCount = await Memory.countDocuments({
        user: { _id: id },
        shared: true,
      })
      const privateMemoriesCount = memoriesCount - publicMemoriesCount

      return res.status(200).json({
        memoriesCount,
        publicMemoriesCount,
        privateMemoriesCount,
      })
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
      const candidate = await Memory.findOne({
        title: req.body.title,
      })
      if (candidate) {
        if (imgName) {
          await unlink(path.join(storage_dir, imgName), (err) => {
            if (err) console.log(`Ошибка при удалении ${imgName}: `, err)
          })
        }

        return res.status(409).json({
          message: `Воспоминание с названием ${req.body.title} уже существует у ${candidate.user.username}`,
        })
      }

      const newMemory = new Memory({
        ...req.body,
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
        await unlink(path.join(storage_dir, imgName), (err) => {
          if (err) console.log(`Ошибка при удалении ${imgName}: `, err)
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
        await unlink(path.join(storage_dir, imgName), (err) => {
          if (err) console.log(`Ошибка при удалении ${imgName}: `, err)
        })
      }

      return res.status(200).json(deleted)
    } catch (err) {
      console.log(err)
    }
  }

  async upload(req, res) {
    return res.status(201).end(req.file.filename)
  }
}

module.exports = new MemoryController()
