const express = require('express')
const router = express.Router()
const MenuController = require('../controllers/MenuController')
const { storeMenu } = require('../middlewares/multer')

router.get('/', (req, res) => {
    res.render('menu');
})
router.get('/all', MenuController.getAllMenu)
router.post('/add', storeMenu.single('menu-image'), MenuController.postAddMenu)

module.exports = router