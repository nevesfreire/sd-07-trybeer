const express = require('express');
const { saleController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/checkout', authMiddleware.checkIfUserIsAuthenticated, saleController.createSale);

module.exports = router;