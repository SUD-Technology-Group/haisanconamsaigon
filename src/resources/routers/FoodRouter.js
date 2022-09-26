const express = require('express');
const router = express.Router();
const FoodController = require('../controllers/FoodController');
const { storeFood } = require('../middlewares/multer')
// Add Food
router.get('/add-food', FoodController.getAddFood);
router.post('/add-food', storeFood.single('food-image'), FoodController.postAddFood);
// Get Food
router.get('/desc/:id', FoodController.getFoodDescription);
// Get All Foods
router.get('/all', FoodController.getAllFoods);
router.get('/list-food', FoodController.getListFoods);
// Update Food
router.post('/update/:id', storeFood.single('food-image'), FoodController.updateFood);
// Delete Food
router.get('/delete/:id', FoodController.deleteFood);
module.exports = router;