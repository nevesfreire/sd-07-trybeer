const express = require('express');
const userController = require('../controllers/usersControllers');
const { loginValidationMiddlewares } = require('../middlewares/loginValidation.js');

const router = express.Router();

router.use(loginValidationMiddlewares);

router.post('/login', userController.loginUser)

module.exports = router;