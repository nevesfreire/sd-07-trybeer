const express = require('express');
const loginController = require('../controllers/loginController');
const { checkUserToLogin, checkUser } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/login', checkUserToLogin, checkUser, loginController.onLogin);

module.exports = router;
