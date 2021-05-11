const { getAllProducts } = require('../models/products');

const getAllProductsService = async () => {
  const products = await getAllProducts();

  if (!products) {
    throw new Error('Não há produtos');
  }

  return products;
};

module.exports = {
  getAllProductsService,
};