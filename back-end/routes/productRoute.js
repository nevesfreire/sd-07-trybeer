const { Router } = require('express');
const { productsController } = require('../controllers');

const productRoute = Router();

productRoute.get('/', productsController.getProductListController);

module.exports = productRoute;