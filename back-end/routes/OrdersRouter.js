const express = require('express');
const { getAllOrders, getAllSalesProducts, getOrder } = require('../orders/controller');

const OrdersRouter = express.Router();

OrdersRouter.get('/orders', getAllOrders);
OrdersRouter.get('/orders/products', getAllSalesProducts);
OrdersRouter.get('/orders/:id', getOrder);

module.exports = OrdersRouter;