const express = require('express');
const checkToken = require('./middleware/checkToken');

const router = express.Router();
const UserController = require('./controller/UserController');
const ProductsControler = require('./controller/ProductController');

router.post('/user', UserController.create);
router.post('/updateUserEmail', checkToken, UserController.updateUserEmail);
router.post('/login', UserController.login);
router.get('/token', checkToken, (req, res) => { res.send({ message: 'funcionando 100%' }); });
router.get('/products', ProductsControler.getAllProducts);

module.exports = router;
