const express = require('express');
const userController = require('../controllers/usersControllers');
const productController = require('../controllers/productController');
const salesController = require('../controllers/salesController');
const { loginValidationMiddleware } = require('../middlewares/loginValidation');
const {
  registerNameEmailValidation,
} = require('../middlewares/registerNameEmailValidation');
const {
  emailValidationMiddleware,
  priceValidationMiddleware,
  addressValidationMiddleware,
  deliveryNumberValidationMiddleware,
  saleDateValidationMiddleware,
  salesStatusValidationMiddleware,
  productsValidationMiddleware,
  productsCampsValidationMiddleware,
} = require('../middlewares/salesValidation');
const { NameValidation } = require('../middlewares/profileValidations');

const router = express.Router();

router.post('/login', loginValidationMiddleware, userController.loginUser);

router.put('/profile', NameValidation, userController.profileNameUpdate);
router.post(
  '/register',
  loginValidationMiddleware,
  registerNameEmailValidation,
  userController.registerUser,
);
router.get('/products', productController.getAll);
router.get('/images/:name', productController.getImageProduct);

router.post(
  '/checkout',
  emailValidationMiddleware,
  priceValidationMiddleware,
  addressValidationMiddleware,
  deliveryNumberValidationMiddleware,
  saleDateValidationMiddleware,
  salesStatusValidationMiddleware,
  productsValidationMiddleware,
  productsCampsValidationMiddleware,
  salesController.saleRegister,
);

router.get('/orders', salesController.getAllSalesData);
router.get('/orders/:id', salesController.getSalesDataById);

module.exports = router;
