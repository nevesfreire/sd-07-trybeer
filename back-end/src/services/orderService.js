const salesProductModel = require('../models/SalesProduct');

const getOrderByUserService = async (id) => {
  const result = salesProductModel.getSalesProductByUserId(id);
  console.log(`Order service: ${result}`);
  return result;
};

const getOrderBySaleId = async (id) => {
  const result = salesProductModel.getSalesProductBySaleId(id);
  console.log(`Order service: ${result}`);
  return result;
};

module.exports = {
  getOrderByUserService,
  getOrderBySaleId,
};