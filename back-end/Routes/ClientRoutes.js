const express = require('express');
const ClienteController = require('../Controllers/ClienteControlles');

const router = express.Router();

router.post('/login', ClienteController.login);
router.post('/register', ClienteController.addUser);
router.put('/profile', ClienteController.updateUserName);
router.get('/products', ClienteController.getAllProducts);
router.post('/savedSale', ClienteController.saleSave);

module.exports = router;