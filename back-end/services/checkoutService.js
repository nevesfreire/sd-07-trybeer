const checkoutModel = require('../models/checkoutModel');

const createSale = async (data) => {
  await checkoutModel.createSale(data);
};

module.exports = {
  createSale,
};
