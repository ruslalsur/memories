const multer = require('multer')
const path = require('path')
const { storage_dir, upload_file_size } = require('config')

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storage_dir)
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

  limits: { fileSize: +upload_file_size },
}

module.exports = multer(multerConfig)
