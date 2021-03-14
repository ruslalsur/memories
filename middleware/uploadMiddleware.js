const multer = require('multer')
const path = require('path')

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `upload/`)
    },
    filename: (req, file, cb) => {
      const newName =
        file.originalname.split('.')[0] +
        '_' +
        Date.now() +
        path.extname(file.originalname)

      req.uploadedFileName = newName
      cb(null, newName)
    },
  }),

  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb('Только jpeg и png файлы разрешены ...', false)
    }
  },

  limits: 1024 * 1024 * 3,
}

module.exports = multer(multerConfig)
