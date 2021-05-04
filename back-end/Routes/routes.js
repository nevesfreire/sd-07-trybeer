const express = require('express');
const userController = require('../controllers/usersControllers');
const { loginValidationMiddleware } = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/login', loginValidationMiddleware, userController.loginUser);

module.exports = router;