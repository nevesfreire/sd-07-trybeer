const express = require('express');

const route = express.Router();
const { getSale, saleById, createSale } = require('../controllers/saleController');
const getEmailByToken = require('../middlewares/getEmailByToken');

route.get('/', getEmailByToken, getSale);
route.get('/:id', saleById);
route.post('/', getEmailByToken, createSale);

module.exports = route;