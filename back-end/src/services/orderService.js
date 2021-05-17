const salesProductModel = require('../models/SalesProduct');

const getOrderByUserService = async (id) => salesProductModel.getSalesProductByUserId(id);

const getOrderBySaleId = async (id) => salesProductModel.getSalesProductBySaleId(id);

const getAllOrders = async () => salesProductModel.getAllOrders();

module.exports = {
  getOrderByUserService,
  getOrderBySaleId,
  getAllOrders,
};