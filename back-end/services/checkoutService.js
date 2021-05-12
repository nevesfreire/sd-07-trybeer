const checkoutModel = require('../models/checkoutModel');
const createSale = async (user_id, total_price, delivery_address, delivery_number, sale_date, status) => {
  await checkoutModel.createSale(user_id, total_price, delivery_address, delivery_number, sale_date, status);
};

module.exports = {
  createSale,
};
