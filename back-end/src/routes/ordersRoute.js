const express = require('express');
const { tokenValidation } = require('../middlewares/tokenMiddleware');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.get('/orders', tokenValidation, ordersController.allOrders);

module.exports = router;
