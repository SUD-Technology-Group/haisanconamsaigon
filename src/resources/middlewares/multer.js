const multer = require('multer')
const fs = require('fs')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let name = req.body.name
    let dir = `./src/public/uploads/seafood/${name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, `src/public/uploads/seafood/${name}`)
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

let storageMenu = multer.diskStorage({
  destination: function (req, file, cb) {
    let name = req.body.menu_name
    let dir = `./src/public/uploads/menu/${name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, `src/public/uploads/menu/${name}`)
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

const store = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 1024 }
})

const storeMenu = multer({
  storage: storageMenu,
  limits: { fieldSize: 1024 * 1024 * 1024 }
})

module.exports = { store, storeMenu }

