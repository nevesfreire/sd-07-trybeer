const express = require('express');
const { validadeToken } = require('../middlewares/productsMiddleware');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.get('/orders', validadeToken, ordersController.allOrders);

module.exports = router;
