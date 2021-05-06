const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.post('/checkout', saleController.createSale);

module.exports = router;