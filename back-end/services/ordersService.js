const ordersModel = require('../models/ordersModel');

const getOrdersByUser = async (userId) => {
  const orders = await ordersModel.getOrdersByUser(userId);
  return orders;
};

const getOrderById = async (id) => {
  console.log(`service ID: ${id}`);
  const order = await ordersModel.getOrderById(id);
  console.log(`service order: ${order}`);
  return order;
};
module.exports = {
  getOrdersByUser,
  getOrderById,
};
