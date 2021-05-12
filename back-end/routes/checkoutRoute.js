const express = require('express');

const router = express.Router();

const checkoutController = require('../controllers/checkoutController');

router.get('/', checkoutController.getAllSales);
router.get('/:id', checkoutController.getSaleById);
router.post('/', checkoutController.createSale);

module.exports = router;
