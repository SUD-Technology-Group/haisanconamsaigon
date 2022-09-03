const express = require('express');
const router = express.Router();
const DiscountController = require('../controllers/DiscountController');
const { storeDiscount } = require('../middlewares/multer')
router.get('/add', (req, res) => {
    const success = req.flash('success') || '';
    const error = req.flash('error') || '';
    res.render('Pages/Discount/addDiscount', { layout: 'admin', success, error });
});
router.post('/add', storeDiscount.single('discount-image'), DiscountController.addDiscount);
router.get('/delete/:id', DiscountController.deleteDiscount);
router.post('/edit/:id', storeDiscount.single('image'), DiscountController.updateDiscount);
router.get('/all', DiscountController.getDiscount)
router.get('/content/:id', DiscountController.getDiscountContent)
module.exports = router;