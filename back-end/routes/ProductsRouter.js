const express = require('express');
const { getAllProducts } = require('../products/controllers');
const { AuthMiddleware } = require('../middlewares');

const { validateToken } = AuthMiddleware;

const ProductsRouter = express.Router();

ProductsRouter.use(validateToken);

ProductsRouter.get('/products', getAllProducts);

module.exports = ProductsRouter;
