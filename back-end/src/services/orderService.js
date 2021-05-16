const salesProductModel = require('../models/SalesProduct');

const getOrderByUserService = async (id) => {
  const result = salesProductModel.getSalesProductByUserId(id);
  console.log(`Order service: ${result}`);
  return result;
};

module.exports = {
  getOrderByUserService,
};