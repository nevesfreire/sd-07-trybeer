const express = require('express');
const { getAllOrders, getAllSalesProducts, getOrder, updateStatus } = require('../orders/controller');

const OrdersRouter = express.Router();

OrdersRouter.get('/orders', getAllOrders);
OrdersRouter.get('/orders/products', getAllSalesProducts);
OrdersRouter.get('/orders/:id', getOrder);
OrdersRouter.put('/orders/:id', updateStatus);

module.exports = OrdersRouter;