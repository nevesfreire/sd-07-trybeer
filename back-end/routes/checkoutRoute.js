const express = require('express');

const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

router.post('/checkout',
checkoutController.createSale);

module.exports = router;
