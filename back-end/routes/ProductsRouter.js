const express = require('express');
const { getAllProducts, createSalesProducts } = require('../products/controllers');

const ProductsRouter = express.Router();

ProductsRouter.get('/products', getAllProducts);

ProductsRouter.post('/products/sale', createSalesProducts);

module.exports = ProductsRouter;
