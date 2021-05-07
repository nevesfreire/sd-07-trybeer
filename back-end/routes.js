const express = require('express');
const checkToken = require('./middleware/checkToken');

const router = express.Router();

const userController = require('./controller/UserController');
const productsControler = require('./controller/ProductController');
const saleControler = require('./controller/SaleController');

router.post('/user', userController.create);
// Recebe "name" no body e atualiza o nome do usuário. (Requer Token)
router.post('/updateUserName', checkToken, userController.updateUserName);

// Recebe "email" e "passowrd" através do body e recebe o token.
router.post('/login', userController.login);

router.get('/products', productsControler.getAllProducts);

router.post('/products', saleControler.create);

module.exports = router;
