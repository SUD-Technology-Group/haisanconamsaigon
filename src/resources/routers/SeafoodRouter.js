const express = require('express')
const router = express.Router()
const SeafoodController = require('../controllers/SeafoodController')
const { store } = require('../middlewares/multer')


router.post('/add', store.array('product-image'), SeafoodController.postAddSeafood)

module.exports = router