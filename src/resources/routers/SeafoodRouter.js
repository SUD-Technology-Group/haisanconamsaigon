const express = require('express')
const router = express.Router()
const SeafoodController = require('../controllers/SeafoodController')
const { store } = require('../middlewares/multer')

router.get('/', (req, res) => {
    res.render('seafood');
})

router.post('/add', store.array('product-image'), SeafoodController.postAddSeafood)
router.get('/all', SeafoodController.getAllSeafood)
module.exports = router