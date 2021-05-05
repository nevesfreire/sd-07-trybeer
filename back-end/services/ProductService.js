const { productModel } = require('../models');

const getAllProducts = async () => {
  const [products] = await productModel.getAllProducts();
  return products;
};

module.exports = {
  getAllProducts,
};