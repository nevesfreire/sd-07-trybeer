const {
  StatusCodes: { OK, UNAUTHORIZED, NOT_FOUND },
} = require('http-status-codes');
const productModel = require('../models/productModel');
const { notFoundMessage } = require('../messages');

const customAnswer = (message, http = UNAUTHORIZED) => ({
  http,
  message,
});

const getAll = async () => {
  const products = await productModel.getAllProducts();
  if (!products) {
    return [];
  }
  return products;
};

const getImageProduct = async (name) => {
  const productImage = await productModel.getImageProduct(name);
  if (!productImage) {
    return customAnswer(notFoundMessage, NOT_FOUND);
  }
  return customAnswer(productImage, OK);
};

module.exports = {
  getAll,
  getImageProduct,
};
