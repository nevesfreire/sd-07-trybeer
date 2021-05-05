const { Router } = require('express');
const { productsController } = require('../controllers');
const middlewares = require('../middlewares');

const productRoute = Router();

productRoute.get('/', middlewares.authMiddleware, productsController.getProductListController);

module.exports = productRoute;