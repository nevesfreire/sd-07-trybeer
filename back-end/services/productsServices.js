const productsModel = require('../models/index');

const getProducts = async () => {
  const result = await productsModel.getAllProducts();
  return result;
};

module.exports = {
  getProducts,
};