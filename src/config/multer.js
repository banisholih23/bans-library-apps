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

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (request, file, callback) => {
//       callback(null, path.join(__dirname, "....../uploads"));
//     },
//     filename: (request, file, callback) => {
//       callback(null, `${new Date().getDate() + file.originalname}`);
//     },
//   }),
//   fileFilter: function (request, file, callback) {
//     const filetypes = /jpg|jpeg|png/; //regex
//     const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//     ); //jpeg
//     const mimetype = filetypes.test(file.mimetype); //image

//     //console.log("1", path.extname(file.originalname).toLowerCase());
//     //console.log("2", file.mimetype);

//     if (mimetype && extname) {
//       return callback(null, true);
//     } else {
//       return callback("Only images are allowed!", false);
//     }
//   },
//   limits: {
//     fileSize: 4 * 1024 * 1024,
//   },
// });

module.exports = upload 