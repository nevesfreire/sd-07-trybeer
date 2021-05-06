const express = require('express');
const loginController = require('../controllers/loginController');
const { validadeLogin } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/login', validadeLogin, loginController.onLogin);

module.exports = router;
