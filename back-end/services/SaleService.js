const { saleModel, productModel } = require('../models');
const { validateData } = require('./validations/SaleValidations');

const errorProduct = { err: { message: 'Produto inexistente' } };
const createSale = async (data, token) => {
  const { error } = validateData(data);
  if (error) throw error.message;
  const [product] = await productModel.getProductByName(data.productName);
  if (product.length === 0) throw errorProduct;
  const totalPrice = (product.price * data.quantity);
  const sale = saleModel.createSale()
  return product[0];
};

module.exports = {
  createSale,
};

// createSale, getProductByName