const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
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

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/public/uploads/banner/video`)
  }, // Destination to store video 
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + '_' + Date.now()
      + ext)
  }
});

const storageMenu = multer.diskStorage({
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


const storageNews = multer.diskStorage({
  destination: function (req, file, cb) {
    let name = req.body.title
    let dir = `./src/public/uploads/news/${name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, `src/public/uploads/news/${name}`)
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})
const storageDiscount = multer.diskStorage({
  destination: function (req, file, cb) {
    let name = req.body.title
    let dir = `./src/public/uploads/discount/${name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, `src/public/uploads/discount/${name}`)
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

const storageFood = multer.diskStorage({
  destination: function (req, file, cb) {
    let name = req.body.name
    let dir = `./src/public/uploads/food/${name}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, `src/public/uploads/food/${name}`)
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
const storeNews = multer({
  storage: storageNews,
  limits: { fieldSize: 1024 * 1024 * 1024 }
})
const storeDiscount = multer({
  storage: storageDiscount,
  limits: { fieldSize: 1024 * 1024 * 1024 }
})

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 40000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
  }
})

const storeFood = multer({
  storage: storageFood,
  limits: { fieldSize: 1024 * 1024 * 1024 }
})

module.exports = { store, storeMenu, storeNews, storeDiscount, videoUpload, storeFood }

