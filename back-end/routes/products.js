const express = require('express');
const { createProduct, getProduct } = require('../controllers/productController');

const route = express.Router();

route.get('/', getProduct);
route.post('/', createProduct);

module.exports = route;