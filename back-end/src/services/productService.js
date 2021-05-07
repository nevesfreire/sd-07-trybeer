const modelProduct = require('../models/Product');

const productService = async () => {
  const data = await modelProduct.modelProduct();
  return data;
};

module.exports = {
  productService,
};
