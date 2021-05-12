const express = require('express');
const { getAllProducts, createSalesProducts } = require('../products/controllers');
const { AuthMiddleware } = require('../middlewares');

const { validateToken } = AuthMiddleware;

const ProductsRouter = express.Router();

ProductsRouter.use(validateToken);

ProductsRouter.get('/products', getAllProducts);

ProductsRouter.post('/products/sale', createSalesProducts);

module.exports = ProductsRouter;
