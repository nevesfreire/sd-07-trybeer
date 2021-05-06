const express = require('express');
const productController = require('../controllers/productController');
// const validateJWT = require('../auth/validateJWT');
// const validateAdmin = require('../auth/validateAdmin');

const router = express.Router();

router
  .route('/products')
  .get(productController.getAllProducts);

// router.post('/login', userController.login);
// router.post('/users/admin', validateJWT, validateAdmin, usersController.createAdmin); 

module.exports = router;