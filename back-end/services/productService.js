const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const allProducts = await productModel.getAllProducts();
  return allProducts;
};
const getProductById = async (id) => {
  const allProduct = await productModel.getProductById(id);
  return allProduct;
};

module.exports = { getAllProducts, getProductById };
