const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAllProducts();
  if (!products) {
    return [];
  }
  return products;
};

module.exports = {
  getAll,
};
