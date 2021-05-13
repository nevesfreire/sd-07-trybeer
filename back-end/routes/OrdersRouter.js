const express = require('express');
const { getAllOrders, getAllSalesProducts } = require('../orders/controller');

const OrdersRouter = express.Router();

OrdersRouter.get('/orders', getAllOrders);
OrdersRouter.get('/orders/products', getAllSalesProducts);

module.exports = OrdersRouter;