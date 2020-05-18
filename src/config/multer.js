const multer = require('multer')
const path = require("path");
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString().concat('_').concat(file.originalname))
  }
})

const fileFilter = (request, file, cb, error) => {
  const imageFilter = file.mimetype.toLowerCase()
  if (imageFilter === 'image/jpg' || imageFilter === 'image/jpeg' || imageFilter === 'image/png') {
    cb(null, true)
  } else {
    cb('extension image only jpeg jpg and png', false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2024 * 2024
  }
})

module.exports = upload 