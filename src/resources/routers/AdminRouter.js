const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('Admin/adminHome', { layout: 'admin' })
})

router.get('/add-product', (req, res) => {
    res.render('Admin/addProduct', { layout: 'admin' })
})
module.exports = router