const saleModel = require('../models/saleModel');

const createSale = async (userId, totalPrice, products, address) => {
  const { street, number } = address;
  const newSale = await saleModel.createSale(userId, totalPrice, street, number);

  return newSale;
}

module.exports = { 
  createSale
};