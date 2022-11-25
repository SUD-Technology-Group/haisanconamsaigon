const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers');

router.get('/login', UserController.getLogin);
router.post('/login', UserController.postLogin);
router.get('/logout', UserController.getLogout);

router.get('/register', UserController.getRegisterPages);
router.get('/forgot-password', UserController.getForgotPasswordPage);
router.get('/new-password', UserController.getNewPasswordPage);
router.get('/QRcode', UserController.getQRCodePage);
router.get('/OTP', UserController.getOTPPage);

module.exports = router;
