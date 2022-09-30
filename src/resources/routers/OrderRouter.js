const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')

router.post('/add', OrderController.addOrder);
router.get('/all', OrderController.getAllOrder);
module.exports = router