const ordersModel = require('../models/ordersModel');

const getOrdersByUser = async (userId) => {
  const orders = await ordersModel.getOrdersByUser(userId);
  return orders;
};

module.exports = {
  getOrdersByUser,
};
