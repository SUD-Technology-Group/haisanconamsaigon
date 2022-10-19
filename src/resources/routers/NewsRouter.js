const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/NewsController');
const { storeNews } = require('../middlewares/multer')
router.get('/add', (req, res) => {
    const success = req.flash('success') || '';
    const error = req.flash('error') || '';
    res.render('Pages/News/addNews', { layout: 'admin', success, error });
});
router.get('/:slug', NewsController.getDetail);
router.get('/list', NewsController.getList);
router.post('/add', storeNews.single('news-image'), NewsController.addNews);
router.get('/delete/:id', NewsController.deleteNews);
router.post('/edit/:id', storeNews.single('image'), NewsController.updateNews);
router.get('/all', NewsController.getNews)
router.get('/content/:id', NewsController.getNewsContent)
module.exports = router;