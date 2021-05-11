const salesModel = require('../model/salesModel');

const createSale = async (userId, totalPrice, deliveryAddress, deliveryNumber) =>
  salesModel.createSale(userId, totalPrice, deliveryAddress, deliveryNumber);

const salesProducts = async (saleId, arrayProducts) =>
  salesModel.salesProducts(saleId, arrayProducts);

const getSalesByIdService = async (userId) => salesModel.getSalesById(userId);

const getProductsBySaleIdService = async (saleId) => salesModel.getProductsBySaleId(saleId);

const updateStatusBySaleIdService = async (saleId) => salesModel.updateStatusBySaleId(saleId);

module.exports = {
  createSale,
  salesProducts,
  getSalesByIdService,
  getProductsBySaleIdService,
  updateStatusBySaleIdService,
};
