const express = require('express');

const route = express.Router();
const { getSale, createSale } = require('../controllers/saleController');
const getEmailByToken = require('../middlewares/getEmailByToken');

route.get('/', getSale);
route.post('/', getEmailByToken, createSale);

module.exports = route;