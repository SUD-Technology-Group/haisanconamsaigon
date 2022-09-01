const express = require('express')
const router = express.Router()
const SeafoodController = require('../controllers/SeafoodController')
const { store } = require('../middlewares/multer')


router.post('/add', store.array('product-image'), SeafoodController.postAddSeafood)
router.post('/edit/:id', store.array('product-image'), SeafoodController.updateSeafood)
router.get('/all', SeafoodController.getAllSeafood)
router.get('/delete/:id', SeafoodController.getDeleteSeafood)
module.exports = router