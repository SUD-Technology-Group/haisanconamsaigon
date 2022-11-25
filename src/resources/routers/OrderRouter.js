const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')

router.post('/add', OrderController.addOrder);
router.get('/all', OrderController.getAllOrder);
router.get('/delete/:id', OrderController.deleteOrder);
router.post('/update/:id', OrderController.editStatus);
router.get('/history', OrderController.getHistory);
module.exports = router