const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductsController')

// Add product : add one
router.post('/add', ProductController.postAddProduct)

// get product detail: get one
router.get('/:slug', ProductController.getProductDetail)
module.exports = router