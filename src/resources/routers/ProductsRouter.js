const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductsController')

// Add product : add one
router.post('/add', ProductController.postAddProduct)

// get product detail: get one
router.get('/:slug', ProductController.getProductDetail)

// update product: update one
router.post('/update/:slug', ProductController.updateProduct)

module.exports = router