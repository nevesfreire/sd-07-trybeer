const orderModel = require('../models/orderModel');

const getAllOrders = async () => {
  const allOrders = await orderModel.getAllOrders();
  return allOrders;
};
const getOrderById = async (id) => {
  const allOrder = await orderModel.getOrderById(id);
  return allOrder;
};

module.exports = { getAllOrders, getOrderById};
