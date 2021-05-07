const express = require('express');
const userController = require('../controllers/usersControllers');
const productController = require('../controllers/productController');
const { loginValidationMiddleware } = require('../middlewares/loginValidation');
const { registerNameEmailValidation } = require('../middlewares/registerNameEmailValidation');
const { NameValidation } = require('../middlewares/profileValidations');

const router = express.Router();

router.post('/login', loginValidationMiddleware, userController.loginUser);

router.put('/profile', NameValidation, userController.profileNameUpdate);
router.post(
  '/register', loginValidationMiddleware, registerNameEmailValidation, userController.registerUser,
);
router.get('/products', productController.getAll);

module.exports = router;