const multer = require('multer')
const path = require('path')
const createError = require('http-errors')

const ALLOWED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FORMATS.includes(file.mimetype)) {
    return cb(createError.BadRequest('wrong file format'), false)
  }

  cb(null, true)
}

module.exports = multer({ storage, fileFilter })
