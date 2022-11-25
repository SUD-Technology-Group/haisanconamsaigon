const express = require('express');
const router = express.Router();
const BannerController = require('../controllers/BannerController');
const { videoUpload } = require('../middlewares/multer');

router.get('/', BannerController.getBanner)
router.post('/update', videoUpload.single('banner-video'), BannerController.updateBanner)

module.exports = router