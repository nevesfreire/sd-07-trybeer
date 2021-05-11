const salesModel = require('../models/salesModel');

const saleRegister = async () => {
  const saleRegistered = await salesModel.saleRegister();
  
  return saleRegistered;
};

module.exports = {
  saleRegister,
};
