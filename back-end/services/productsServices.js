const { productsModel } = require('../models/index');

const getProductsList = async () => {
  const result = await productsModel.getProducts();
  return result;
};

const getProductsById = async (id) => {
  const result = await productsModel.getProductsById(id);
  return result;
};

module.exports = {
  getProductsList,
  getProductsById,
};
