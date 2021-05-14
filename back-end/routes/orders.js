const express = require('express');
const ordersController = require('../controllers/ordersController');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/orders',
middlewares.validateToken,
ordersController.getOrdersByUser);

module.exports = router;