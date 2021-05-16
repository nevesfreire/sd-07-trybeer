const salesProductModel = require('../models/SalesProduct');

const getOrderByUserService = async (id) => salesProductModel.getSalesProductByUserId(id);

module.exports = {
  getOrderByUserService,
};