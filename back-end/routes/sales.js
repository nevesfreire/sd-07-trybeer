const express = require('express');

const route = express.Router();
const { getSale, createSale } = require('../controllers/saleController');

route.get('/', getSale);
route.post('/', createSale);

module.exports = route;