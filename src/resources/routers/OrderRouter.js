const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')

router.post('/add', OrderController.addOrder)
router.get('/all', (req, res) => {
    res.render('Pages/Order/orderList', { layout: 'admin' })
})
module.exports = router