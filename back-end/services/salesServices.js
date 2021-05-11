const salesModel = require('../models/salesModel');

const saleRegister = async (orderData) => {
  const saleRegistered = await salesModel.saleRegister(orderData);
  
  return saleRegistered;
};

module.exports = {
  saleRegister,
};
