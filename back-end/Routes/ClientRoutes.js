const express = require('express');
const ClienteController = require('../Controllers/ClienteControlles');
const myMiddleware = require('../middleware');

const router = express.Router();

router.post('/login', ClienteController.login);
router.post('/register', ClienteController.addUser);
router.put('/profile', ClienteController.updateUserName);
router.get('/products', ClienteController.getAllProducts);
router.post('/savedSale', ClienteController.saleSave);
router.get('/sales', myMiddleware, ClienteController.sales);
router.get('/detailSales/:id', ClienteController.detailSale);
router.get('/salesAdm', ClienteController.salesAdm);

module.exports = router;