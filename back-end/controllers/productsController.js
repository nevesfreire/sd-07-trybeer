const { Router } = require('express');
const { StatusCodes } = require('http-status-codes')
const productsServices = require('../services');

const productRoute = Router();

productRoute.get('/', (req, res) => {
  try {
    const result = productsServices.getProducts();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = productRoute;