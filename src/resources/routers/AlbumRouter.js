const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/AlbumController');
const {storeAlbum} = require('../middlewares/multer');

// add image
router.get('/add', AlbumController.getAddAlbum);
router.post('/add', storeAlbum.single('image'), AlbumController.postAddAlbum);
// delete image
router.get('/delete/:id', AlbumController.deleteAlbum);
// Get list
router.get('/list', AlbumController.getList);
// Render list
router.get('/all', AlbumController.getAll)
module.exports = router;