'use strict';

let multer = require('multer');
let fs = require('fs-extra');

let storage = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let slug = req.params.slug;
      let path = `src/public/uploads/${slug}`;
      fs.mkdirsSync(path);
      callback(null, path);
    },
    filename: (req, file, callback) => {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
  })
});


module.exports = store = multer({ 
    storage: storage,
    limits: { fieldSize: 10 * 1024 * 1024 }
  })  
  