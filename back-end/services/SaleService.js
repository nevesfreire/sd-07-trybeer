const { saleModel, productModel } = require('../models');
const { validateData } = require('./validations/SaleValidations');

const createSale = async (data) => {
  const { error } = validateData(data);
  if (error) throw error.message;
  const product = await productModel.getProductByName(data.productName);
  return product;
};

module.exports = {
  createSale,
};

// createSale, getProductByName