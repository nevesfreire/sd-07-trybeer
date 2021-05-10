const salesModel = require('../model/salesModel');

const createSale = async (userId, totalPrice, deliveryAddress, deliveryNumber) =>
  salesModel.createSale(userId, totalPrice, deliveryAddress, deliveryNumber);

const salesProducts = async (saleId, arrayProducts) =>
  salesModel.salesProducts(saleId, arrayProducts);

module.exports = {
  createSale,
  salesProducts,
};
