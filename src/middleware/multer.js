const multer = require('multer')
const path = require('path')
const helper = require('../helper')

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './uploads')
  },
  filename: (request, file, callback) => {
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const fileFilter = (request, file, callback) => {
  const ext = path.extname(file.originalname)
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return callback(new Error('Only images (PNG/JPG/JPEG) are allowed'), false)
  } else {
    callback(null, true)
  }
}
const maxSize = 2097152
const upload = multer({ storage, fileFilter, limits: { fileSize: maxSize } }).array('portfolio_img', 12)
const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(response, 400, err.message)
    } else if (err) {
      return helper.response(response, 400, err.message)
    }
    next()
  })
}

module.exports = uploadFilter
