const CollectionController = require('../controllers/CollectionController');
const express = require('express');
const router = express.Router();

router.get('/seafood', CollectionController.getSeafoods);

module.exports = router;