const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserControllers')

router.get('/login', UserController.getLogin)
router.post('/login', UserController.postLogin)
router.get('/logout', UserController.getLogout)

module.exports = router