const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
// Não esquecer de colocar o Middleware: authMiddleware.checkIfUserIsAuthenticated
router.get('/products', productController.getProductsList);

module.exports = router;