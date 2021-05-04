const { StatusCodes } = require('http-status-codes');
const { productsServices } = require('../services');

const getProductListController = async (_req, res, next) => {
  console.log(productsServices);
  try {
    const result = await productsServices.getProductsList();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  try {
    const result = await productsServices.getProductsById();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductListController,
  getProductsById,
};
