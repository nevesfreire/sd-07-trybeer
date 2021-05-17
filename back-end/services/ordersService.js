const ordersModel = require('../models/ordersModel');

const getOrdersByUser = async (userId) => {
  const orders = await ordersModel.getOrdersByUser(userId);
  return orders;
};

const getOrderById = async (id) => {
  const order = await ordersModel.getOrderById(id);
  return order;
};
module.exports = {
  getOrdersByUser,
  getOrderById,
};
