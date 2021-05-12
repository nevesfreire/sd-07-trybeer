const express = require('express');
const { validateToken } = require('../middlewares/tokenMiddleware');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.get('/orders', validateToken, ordersController.allOrders);

module.exports = router;
