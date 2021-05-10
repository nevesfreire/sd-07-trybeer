const { StatusCodes: { INTERNAL_SERVER_ERROR, OK } } = require('http-status-codes');
const productService = require('../services/productService');

const getAll = async (req, res) => {
  try {
    const products = await productService.getAll();
    console.log(products);
    return res.status(OK).json(products);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const getImageProduct = async (req, res) => {
  try {
    const imageProduct = await productService.getImageProduct(req.params.name);
    const { http, message } = imageProduct;
    return res.status(http).sendFile(message, { root: process.cwd() });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  getAll,
  getImageProduct,
};