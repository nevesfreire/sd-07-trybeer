const { Router } = require('express');

const { checkoutCtrl } = require('../controllers');

const CheckoutRoute = Router();

CheckoutRoute.post('/', checkoutCtrl);

module.exports = CheckoutRoute;