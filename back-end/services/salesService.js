const salesModel = require('../models/salesModel');
const createSale = async (user_id, total_price, delivery_address, delivery_number, sale_date, status) => {
  await salesModel.createSale(user_id, total_price, delivery_address, delivery_number, sale_date, status);
};

module.exports = {
  createSale,
};
